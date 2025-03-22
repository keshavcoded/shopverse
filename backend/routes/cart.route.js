import express from "express";
import {
  addToCart,
  getCart,
  removeAllCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", checkAuth, addToCart);
router.delete("/", checkAuth, removeAllCart);
router.put("/:id", checkAuth, updateQuantity);
router.get("/", checkAuth, getCart);

export default router;
