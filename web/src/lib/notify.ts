import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { site } from "@/content/site";

/* -------------------------------------------------------------------------- */
/*  Email (nodemailer over SMTP — e.g. the studio's Gmail app password)        */
/* -------------------------------------------------------------------------- */

const smtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!smtpConfigured) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

interface MailArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/** Sends an email if SMTP is configured; otherwise logs and no-ops (never throws). */
export async function sendEmail({ to, subject, html, replyTo }: MailArgs): Promise<{ sent: boolean }> {
  const t = getTransporter();
  if (!t) {
    console.log("[email:skipped] SMTP not configured →", { to, subject });
    return { sent: false };
  }
  const from = process.env.SMTP_FROM ?? `"${site.name}" <${process.env.SMTP_USER}>`;
  try {
    await t.sendMail({ from, to, subject, html, replyTo });
    return { sent: true };
  } catch (err) {
    console.error("[email:error]", err);
    return { sent: false };
  }
}

/* -------------------------------------------------------------------------- */
/*  SMS (optional Twilio — zero SDK, plain REST)                               */
/* -------------------------------------------------------------------------- */

export async function sendSms(to: string, body: string): Promise<{ sent: boolean }> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) {
    console.log("[sms:skipped] Twilio not configured");
    return { sent: false };
  }
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    });
    return { sent: res.ok };
  } catch (err) {
    console.error("[sms:error]", err);
    return { sent: false };
  }
}

/* -------------------------------------------------------------------------- */
/*  Zero-credential deep links (WhatsApp + Google Calendar)                     */
/* -------------------------------------------------------------------------- */

/** A wa.me link that pre-fills a message to the studio. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * An "Add to Google Calendar" template URL — needs no API or OAuth. For true
 * two-way sync, wire the Calendar API behind GOOGLE_* env vars later.
 */
export function buildGoogleCalendarLink(opts: {
  title: string;
  details: string;
  start: Date;
  durationHours?: number;
}): string {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(opts.start.getTime() + (opts.durationHours ?? 4) * 3_600_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    details: opts.details,
    location: `${site.address.street}, ${site.address.city}`,
    dates: `${fmt(opts.start)}/${fmt(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
