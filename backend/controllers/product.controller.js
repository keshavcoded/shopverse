import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.log("Error in getAllProducts controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
