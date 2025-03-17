import { redis } from "../configs/redis.js";

export const storeRefreshToken = async (userID, refreshToken) => {
    await redis.set(
      `refresh_token:${userID}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );
  };