import { bookingSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";
import { sendEmail, sendSms, buildGoogleCalendarLink } from "@/lib/notify";
import { site } from "@/content/site";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  const data = parsed.data;
  const eventDate = new Date(data.date);

  // Persist when a database is configured; otherwise log and carry on.
  let bookingId: string | null = null;
  if (prisma) {
    try {
      const created = await prisma.booking.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          eventType: data.eventType,
          date: eventDate,
          message: data.message || null,
        },
      });
      bookingId = created.id;
    } catch (err) {
      console.error("[booking:db-error]", err);
    }
  } else {
    console.log("[booking] (no DB) new request:", data);
  }

  const calendarLink = buildGoogleCalendarLink({
    title: `${data.eventType} — ${data.name}`,
    details: `Booking via ${site.name}. Phone: ${data.phone}. ${data.message ?? ""}`,
    start: eventDate,
  });

  // Notify the studio owner.
  await sendEmail({
    to: site.email,
    replyTo: data.email,
    subject: `New booking: ${data.eventType} on ${data.date}`,
    html: `
      <h2>New booking request</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}<br/>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br/>
      <strong>Phone:</strong> ${escapeHtml(data.phone)}<br/>
      <strong>Event:</strong> ${escapeHtml(data.eventType)}<br/>
      <strong>Date:</strong> ${escapeHtml(data.date)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(data.message || "—")}</p>
      <p><a href="${calendarLink}">Add to Google Calendar</a></p>
    `,
  });

  // Confirmation to the client.
  await sendEmail({
    to: data.email,
    subject: `We received your booking request — ${site.name}`,
    html: `
      <p>Hi ${escapeHtml(data.name)},</p>
      <p>Thank you for reaching out to ${site.name}. We've received your request for
      <strong>${escapeHtml(data.eventType)}</strong> on <strong>${escapeHtml(data.date)}</strong>
      and will confirm availability within one business day.</p>
      <p>Need to reach us sooner? Call ${site.phone} or message us on WhatsApp.</p>
      <p>— ${site.name}</p>
    `,
  });

  await sendSms(
    site.phone,
    `New ${data.eventType} booking from ${data.name} (${data.phone}) on ${data.date}.`,
  );

  return Response.json({ ok: true, message: "Booking request received.", bookingId });
}
