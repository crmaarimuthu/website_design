import type { Metadata } from "next";
import { LogOut, CalendarCheck, Mail, Users, Inbox } from "lucide-react";
import { auth, signOut } from "@/auth";
import { prisma, dbEnabled } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Admin",
  description: "Studio admin dashboard.",
  robots: { index: false, follow: false },
};

// Always render fresh — this is live operational data.
export const dynamic = "force-dynamic";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Inbox;
  label: string;
  value: number | string;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon size={20} />
      </span>
      <p className="mt-4 font-display text-3xl">{value}</p>
      <p className="text-sm text-fg-muted">{label}</p>
    </div>
  );
}

export default async function AdminPage() {
  const session = await auth();

  const [bookings, messages, subscriberCount] = prisma
    ? await Promise.all([
        prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
        prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
        prisma.subscriber.count(),
      ])
    : [[], [], 0];

  const pending = bookings.filter((b) => b.status === "PENDING").length;

  return (
    <section className="container-px mx-auto max-w-7xl py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Studio dashboard</h1>
          <p className="mt-1 text-sm text-fg-muted">
            Signed in as {session?.user?.email ?? "admin"}
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <Button type="submit" variant="outline" size="sm">
            <LogOut size={16} /> Sign out
          </Button>
        </form>
      </div>

      {!dbEnabled && (
        <p className="mt-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
          No database is connected yet. Set <code>DATABASE_URL</code> and run{" "}
          <code>npm run db:push</code> to start capturing bookings and messages here. Until then,
          submissions are emailed to the studio inbox.
        </p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Total bookings" value={bookings.length} />
        <StatCard icon={Inbox} label="Pending bookings" value={pending} />
        <StatCard icon={Mail} label="Messages" value={messages.length} />
        <StatCard icon={Users} label="Subscribers" value={subscriberCount} />
      </div>

      {/* Bookings */}
      <h2 className="mt-16 font-display text-2xl">Recent bookings</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-surface/50 text-fg-subtle">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-fg-muted">
                  No bookings yet.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-border">
                <td className="px-4 py-3">{b.date.toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">{b.eventType}</td>
                <td className="px-4 py-3 text-fg-muted">
                  {b.phone}
                  <br />
                  {b.email}
                </td>
                <td className="px-4 py-3">{b.status}</td>
                <td className="px-4 py-3">{b.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Messages */}
      <h2 className="mt-16 font-display text-2xl">Recent messages</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {messages.length === 0 && <p className="text-sm text-fg-muted">No messages yet.</p>}
        {messages.map((m) => (
          <article key={m.id} className="rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium">{m.subject}</p>
              <span className="text-xs text-fg-subtle">
                {m.createdAt.toLocaleDateString("en-IN")}
              </span>
            </div>
            <p className="mt-1 text-xs text-fg-subtle">
              {m.name} · {m.email}
            </p>
            <p className="mt-3 text-sm text-fg-muted">{m.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
