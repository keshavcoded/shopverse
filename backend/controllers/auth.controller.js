import zod from "zod";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../configs/redis.js";

const signupBody = zod.object({
  email: zod.string().min(1, "Email is required").email("Invalid email"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be minimum 6 characters"),
  name: zod.string().min(1, "Name is required"),
});

const generateToken = (userID) => {
  const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userID, refreshToken) => {
  await redis.set(
    `refresh_token:${userID}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = async (res, accessToken, refreshToken) => {
  res.cookie("acess-token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

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
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken); //storing in redis cache

    //setCookie
    setCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
