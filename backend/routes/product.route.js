import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllProducts);

export default router;
