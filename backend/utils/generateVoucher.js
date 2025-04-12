import Voucher from "../models/voucher.model.js";

export const createStripeVoucher = async (discountPercent) => {
  const voucher = await stripeSession.coupons.create({
    percent_off: discountPercent,
    duration: "once",
  });
  return voucher.id;
};

export const createVoucher = async (userId) => {
  const newVoucher = new Voucher({
    code: "BIGDEAL" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercent: 10,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userID: userId,
  });

  await newVoucher.save();

  return newVoucher;
};
