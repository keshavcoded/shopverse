import zod from "zod";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../configs/redis.js";
import { ENV_VARS } from "../configs/envVars.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { storeRefreshToken } from "../utils/redisStore.js";
import {
  setAccesstokenCookies,
  setRefreshTokenCookies,
} from "../utils/setCookies.js";

const signupBody = zod.object({
  email: zod.string().min(1, "Email is required").email("Invalid email"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be minimum 6 characters"),
  name: zod.string().min(1, "Name is required"),
});

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => {
        return { field: err.path.join("."), message: err.message };
      });
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({ email, password, name });

    //setting tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    await storeRefreshToken(user._id, refreshToken); //storing in redis cache

    //setCookie
    setAccesstokenCookies(res, accessToken);
    setRefreshTokenCookies(res, refreshToken);

    return res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const signinBody = zod.object({
  email: zod.string().min(1, "Email is required").email("Enter a valid email"),
  password: zod.string().min(1, "Password is required"),
});

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = signinBody.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => {
        return {
          field: err.path.join("."),
          message: err.message,
        };
      });
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await storeRefreshToken(user._id, refreshToken);
    setAccesstokenCookies(res, accessToken);
    setRefreshTokenCookies(res, refreshToken);

    return res.status(200).json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signin controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const signout = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, ENV_VARS.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.userID}`); //refresh_token:67d86bf99103e3e300ea5683
    }

    res.clearCookie("acess-token");
    res.clearCookie("refresh-token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in signout controller : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, ENV_VARS.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userID}`);

    //refresh_token:67d8608876d6cf6e517d3536

    if (storedToken !== refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(decoded.userID);
    setAccesstokenCookies(res, accessToken);
    return res
      .status(200)
      .json({ success: true, message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in the refresh token contoller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in getUserProfile controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
