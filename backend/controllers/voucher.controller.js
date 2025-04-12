import Voucher from "../models/voucher.model.js";

export const getVoucher = async (req, res) => {
  try {
    const userID = req.user._id;
    const voucher = await Voucher.find({ userID: userID, isActive: true });
    if (!voucher || voucher.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No voucher found",
      });
    } else {
      return res.status(200).json({
        success: true,
        voucher: voucher,
      });
    }
  } catch (error) {
    console.log("Error in getVoucher controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const validateVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    const userID = req.user._id;
    const voucher = await Voucher.findOne({
      code: code,
      userID: userID,
      isActive: true,
    });

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: "Voucher not found",
      });
    }

    if (voucher.expiryDate < new Date()) {
      voucher.isActive = false;
      await voucher.save();
      return res.status(400).json({
        success: false,
        message: "Voucher has expired",
      });
    }

    res.status(200).json({
      success: true,
      message: "Voucher is valid",
      code: voucher.code,
      discountPercent: voucher.discountPercent,
    });
  } catch (error) {
    console.log("Error in validateVoucher controller : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
