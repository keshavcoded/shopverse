import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./configs/db.js";
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./configs/envVars.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import voucherRoutes from "./routes/voucher.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import path from "path";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

dotenv.config();
const PORT = ENV_VARS.PORT || 3000;

const __dirname = path.resolve();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/vouchers", voucherRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
