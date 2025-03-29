import { ENV_VARS } from "../configs/envVars.js";
import { stripeSession } from "../configs/stripe.js";
import Order from "../models/order.model.js";
import Voucher from "../models/voucher.model.js";
import {
  createStripeVoucher,
  createVoucher,
} from "../utils/generateVoucher.js";

export const createTransactionSession = async (req, res) => {
  try {
    const { products, voucherCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Invalid or null products array",
        })
      );
    }

    let checkoutAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      checkoutAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
      };
    });

    //check for vouchers and apply discount
    let voucher = null;

    if (voucherCode) {
      voucher = await Voucher.findOne({
        code: voucherCode,
        userID: req.user._id,
        isActive: true,
      });
      if (voucher) {
        checkoutAmount -= Math.round(
          (checkoutAmount * voucher.discountPercent) / 100
        );
      }
    }

    //create transaction session

    const transactionSession = await stripeSession.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${ENV_VARS.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ENV_VARS.CLIENT_URL}/purchase-cancel`,
      discounts: voucher
        ? [
            {
              voucher: await createStripeVoucher(voucher.discountPercent),
            },
          ]
        : [],
      metadata: {
        userID: req.user._id,
        voucherCode: voucherCode || "",
        products: JSON.stringify(
          products.map((product) => {
            return {
              id: product._id,
              quantity: product.quantity,
              price: product.price,
            };
          })
        ),
      },
    });

    if (checkoutAmount >= 30000) {
      await createVoucher(req.user._id);
    }

    res.status(200).json({
      success: true,
      id: transactionSession.id,
      checkoutAmount: checkoutAmount / 100,
    });
  } catch (error) {
    console.log(
      "Error in createTransationSession controller : ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const transactionSessionComplete = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripeSession.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.voucherCode) {
        await Voucher.findOneAndUpdate(
          {
            userID: session.metadata.userID,
            code: session.metadata.voucherCode,
          },
          {
            isActive: false,
          }
        );
      }

      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userID,
        products: products.map((product) => {
          return {
            product: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        }),
        checkoutAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();
      res.status(200).json({
        sucess: true,
        message: "Payment successful and order placed",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.log(
      "Error in transactionSessionComplete controller : ",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
