import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./configs/db.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
