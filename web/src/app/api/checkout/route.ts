import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { site } from "@/content/site";

const checkoutSchema = z.object({
  bookingId: z.string().optional(),
  packageName: z.string().min(1),
  amount: z.number().int().positive(), // deposit in the smallest unit (paise)
  email: z.string().email().optional(),
});

export async function POST(request: Request) {
  if (!stripe) {
    return Response.json(
      { ok: false, error: "Online payments are not enabled yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { bookingId, packageName, amount, email } = parsed.data;
  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            unit_amount: amount,
            product_data: { name: `${packageName} — booking deposit` },
          },
        },
      ],
      customer_email: email,
      metadata: { bookingId: bookingId ?? "" },
      success_url: `${origin}/booking?paid=1`,
      cancel_url: `${origin}/booking?canceled=1`,
    });

    if (prisma && bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { stripeSessionId: session.id, depositAmount: amount },
      });
    }

    return Response.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("[checkout:error]", err);
    return Response.json({ ok: false, error: "Could not start checkout." }, { status: 500 });
  }
}
