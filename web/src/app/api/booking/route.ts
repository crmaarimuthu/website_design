import { bookingSchema } from "@/lib/schemas";

// Stub endpoint. A future phase swaps the console.log for DB persistence
// (Prisma), email/SMS notifications and availability checks.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  console.log("[booking] new request:", parsed.data);
  return Response.json({ ok: true, message: "Booking request received." });
}
