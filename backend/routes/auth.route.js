import express from "express";
import {
  getUserProfile,
  refreshToken,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refresh-token", refreshToken);
router.get("/user-profile", checkAuth, getUserProfile);

export default router;
