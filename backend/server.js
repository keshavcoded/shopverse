import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./configs/db.js";
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./configs/envVars.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();
const PORT = ENV_VARS.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
