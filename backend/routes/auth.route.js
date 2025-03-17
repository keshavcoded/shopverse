import express from "express";
import { signout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signout", signout);

export default router;
