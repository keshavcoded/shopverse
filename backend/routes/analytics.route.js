import express from "express";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";
import { getAnalyticsData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAnalyticsData);

export default router;
