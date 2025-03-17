import Redis from "ioredis";
import { ENV_VARS } from "./envVars.js";

export const redis = new Redis(ENV_VARS.REDIS_URL);
