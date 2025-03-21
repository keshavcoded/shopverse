import { redis } from "../configs/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../configs/cloudinary.js";

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

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    return res
      .status(201)
      .json({ success: true, message: "Product created", product: product });
  } catch (error) {
    console.log("Error in create product controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: " Product not found" });
    }

    if (product.image) {
      const publicID = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicID}`);
        console.log("Product deleted from Cloudinary ID: ", publicID);
      } catch (error) {
        console("Error in deleting image from cluodinary", error.message);
      }
    }

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted succesfully" });
  } catch (error) {
    console.log("Error in delete product controller : ", error.message);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    } else {
      featuredProducts = await Product.find({ isFeatured: true }).lean();
      if (!featuredProducts) {
        return res
          .status(404)
          .json({ success: false, message: "No featured products found" });
      } else {
        await redis.set("featured_products", JSON.stringify(featuredProducts));
        return res.json({ success: true, featuredProducts: featuredProducts });
      }
    }
  } catch (error) {
    console.log("Error in featured products controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
