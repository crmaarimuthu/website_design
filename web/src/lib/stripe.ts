import Stripe from "stripe";

/** Stripe is optional — when the secret key is absent, payment routes 503 politely. */
export const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

export const stripe: Stripe | null = stripeEnabled
  ? new Stripe(process.env.STRIPE_SECRET_KEY as string)
  : null;
