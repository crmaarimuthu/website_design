import { subscribeSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { email } = parsed.data;

  if (prisma) {
    try {
      // Idempotent — re-subscribing is a no-op, not an error.
      await prisma.subscriber.upsert({
        where: { email },
        update: {},
        create: { email },
      });
    } catch (err) {
      console.error("[subscribe:db-error]", err);
    }
  } else {
    console.log("[subscribe] (no DB) new email:", email);
  }

  return Response.json({ ok: true, message: "Subscribed." });
}
