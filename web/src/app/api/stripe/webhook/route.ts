import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// Stripe needs the raw, unparsed body to verify the signature.
export async function POST(request: Request) {
  if (!stripe) return new Response("Payments not configured", { status: 503 });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  const raw = await request.text();

  let event: Stripe.Event;
  try {
    if (secret && signature) {
      event = stripe.webhooks.constructEvent(raw, signature, secret);
    } else {
      // No signing secret configured (e.g. local) — trust the parsed payload.
      event = JSON.parse(raw) as Stripe.Event;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid payload";
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;
    if (prisma && bookingId) {
      try {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { paymentStatus: "DEPOSIT_PAID", status: "CONFIRMED" },
        });
      } catch (err) {
        console.error("[webhook:db-error]", err);
      }
    }
  }

  return Response.json({ received: true });
}
