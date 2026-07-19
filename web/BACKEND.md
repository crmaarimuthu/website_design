# Backend & platform (Phases 5–9)

The marketing site works with **zero configuration**. The features below activate
progressively as you add environment variables — nothing crashes when a service
is missing (forms fall back to email/logging, payments return a polite 503).

Copy `.env.example` → `.env` and fill in only what you need.

## Phase 5 — Accessibility & performance
- Skip-to-content link, `<main id="main">` landmark, `aria-current` on nav.
- All motion (Lenis, cursor, 3D, GSAP, transitions) is gated on
  `prefers-reduced-motion` and pointer type; heavy 3D/postFX is code-split.

## Phase 6 — Booking engine (database)
1. Create a Postgres DB (Neon or Vercel Postgres) and set `DATABASE_URL`.
2. Push the schema: `npm run db:push` (or `npm run db:migrate` for migrations).
3. Bookings, contact messages and newsletter subscribers now persist and appear
   in `/admin`. Models live in `prisma/schema.prisma`.

## Phase 7 — Stripe deposits
- Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- `POST /api/checkout` with `{ packageName, amount (in paise), bookingId?, email? }`
  returns a Checkout URL for the client to pay a deposit.
- Point a Stripe webhook at `/api/stripe/webhook` (event
  `checkout.session.completed`) — paid bookings flip to CONFIRMED / DEPOSIT_PAID.
- *Remaining UI wiring:* add a "Pay deposit" button that calls `/api/checkout`
  and redirects to the returned `url` (backend is ready).

## Phase 8 — Admin authentication & dashboard
- Set `AUTH_SECRET` (`openssl rand -base64 32`), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
- `/admin` is protected by middleware; sign in at `/admin/login`.
- Dashboard shows booking/message/subscriber stats and recent records.
- *Client dashboard* (private galleries/invoices) is the next build on this same
  Auth.js foundation.

## Phase 9 — Notifications & calendar
- **Email** (`SMTP_*`): owner + client emails on every booking; owner email on
  contact submissions. A Gmail App Password works out of the box.
- **WhatsApp**: `buildWhatsAppLink()` produces pre-filled wa.me links (no API).
- **Google Calendar**: booking emails include an "Add to Google Calendar" link
  (no OAuth). True two-way sync would sit behind `GOOGLE_*` vars later.
- **SMS** (optional, `TWILIO_*`): owner SMS alert on new bookings.

## Deploy notes (Vercel)
- `build` runs `prisma generate` automatically; `postinstall` also generates.
- Add every `.env` value to the Vercel project's Environment Variables.
- Set `NEXT_PUBLIC_SITE_URL` and the real domain in `src/content/site.ts` (`url`).
