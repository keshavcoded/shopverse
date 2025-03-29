import Stripe from "stripe";
import { ENV_VARS } from "./envVars.js";

export const stripeSession = new Stripe(ENV_VARS.STRIPE_SECRET_KEY);
