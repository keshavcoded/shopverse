import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { getVoucher, validateVoucher } from "../controllers/voucher.controller.js";

const router = express.Router();

router.get("/", checkAuth, getVoucher);
router.post("/validate", checkAuth, validateVoucher);

export default router;
