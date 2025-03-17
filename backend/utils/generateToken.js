import jwt from "jsonwebtoken"
import { ENV_VARS } from "../configs/envVars.js";

export const generateToken = (userID) => {
    const accessToken = jwt.sign({ userID }, ENV_VARS.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  
    const refreshToken = jwt.sign({ userID }, ENV_VARS.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  
    return { accessToken, refreshToken };
  };