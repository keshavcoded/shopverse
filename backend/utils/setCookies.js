import { ENV_VARS } from "../configs/envVars.js";

export const setCookies = async (res, accessToken, refreshToken) => {
    res.cookie("acess-token", accessToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
  
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      samSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  };