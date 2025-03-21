import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getRecommendedproducts,
} from "../controllers/product.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllProducts);
router.post("/", checkAuth, checkAdmin, createProduct);
router.delete("/:id", checkAuth, checkAdmin, deleteProduct);
router.get("/featured", getFeaturedProducts);
router.get("/picks-for-you", getRecommendedproducts);
router.get("/category/:category", )
 
export default router;
