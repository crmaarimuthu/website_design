import { contactSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/notify";
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (prisma) {
    try {
      await prisma.contactMessage.create({ data });
    } catch (err) {
      console.error("[contact:db-error]", err);
    }
  } else {
    console.log("[contact] (no DB) new message:", data);
  }

  await sendEmail({
    to: site.email,
    replyTo: data.email,
    subject: `Contact form: ${data.subject}`,
    html: `
      <h2>New message via the website</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}<br/>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br/>
      <strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p>${escapeHtml(data.message)}</p>
    `,
  });

  return Response.json({ ok: true, message: "Message sent." });
}
