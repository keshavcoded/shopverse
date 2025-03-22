import express from "express";
import { checkAuth } from "../middleware/auth.middleware";
import { getVoucher, validateVoucher } from "../controllers/voucher.controller";

const router = express.Router();

router.get("/", checkAuth, getVoucher);
router.post("/validate", checkAuth, validateVoucher);

export default router;
