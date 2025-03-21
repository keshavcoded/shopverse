import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllProducts);
router.post("/", checkAuth, checkAdmin, createProduct);
router.delete("/", checkAuth, checkAdmin, deleteProduct);
router.get("/featured", getFeaturedProducts);

export default router;
