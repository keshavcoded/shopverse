import jwt from "jsonwebtoken";
import { ENV_VARS } from "../configs/envVars.js";

export const generateAccessToken = (userID) => {
  const accessToken = jwt.sign({ userID }, ENV_VARS.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  return accessToken;
};

export const generateRefreshToken = (userID) => {
  const refreshToken = jwt.sign({ userID }, ENV_VARS.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return refreshToken;
};
