import jwt from "jsonwebtoken";
import { ENV_VARS } from "../configs/envVars.js";
import User from "../models/user.model.js";

export const checkAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies["acess-token"];
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authorization failed - No token provided",
      });
    }
    try {
      const decoded = jwt.verify(accessToken, ENV_VARS.ACCESS_TOKEN_SECRET);

      if (!decoded) {
        return res.status(401).json({
          sucess: false,
          message: "Authorization failed - Invalid token",
        });
      }

      const user = await User.findById(decoded.userID).select("-password");

      if (!user) {
        return res
          .status(400)
          .json({ sucess: false, message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Unauthorized - Access Token expired");
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Access Token expired",
        });
      }
      console.log("JWT verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Authorization failed - Token error",
      });
    }
  } catch (error) {
    console.log("Error in auth middleware : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
