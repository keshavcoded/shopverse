import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import {
  createTransactionSession,
  transactionSessionComplete,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
  "/initiate-session-transaction",
  checkAuth,
  createTransactionSession
);
router.post(
  "/session-transaction-success",
  checkAuth,
  transactionSessionComplete
);

export default router;
