import { ENV_VARS } from "../configs/envVars.js";

export const setAccesstokenCookies = async (res, accessToken) => {
    res.cookie("acess-token", accessToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
  };

export const setRefreshTokenCookies = async (res,refreshToken) => {
  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}