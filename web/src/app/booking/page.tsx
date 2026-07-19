import type { Metadata } from "next";
import { CalendarCheck, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/forms/BookingForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Check availability and request your photography or film booking with Tamil Digital Studio.",
};

const perks = [
  { icon: CalendarCheck, title: "Flexible dates", text: "We work around your event, weekdays or weekends." },
  { icon: Clock, title: "Fast reply", text: "We confirm availability within one business day." },
  { icon: ShieldCheck, title: "No hidden fees", text: "Transparent pricing agreed before we begin." },
  { icon: MessageCircle, title: "WhatsApp support", text: "Prefer to chat? Message us any time." },
];

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book now"
        title="Reserve your date"
        description="Tell us about your event and we'll craft the perfect coverage for it."
        image="/media/images/banner4.jpg"
      />

      <section className="container-px mx-auto grid max-w-7xl gap-12 py-24 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div>
            <h2 className="font-display text-2xl">Why book with us</h2>
            <ul className="mt-8 space-y-6">
              {perks.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <p.icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium text-fg">{p.title}</h3>
                    <p className="text-sm text-fg-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6">
              <p className="text-sm text-fg-muted">
                Prefer to talk first? Reach us on WhatsApp at{" "}
                <a href={`https://wa.me/${site.whatsapp}`} className="text-accent hover:underline">
                  {site.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm />
        </Reveal>
      </section>
    </>
  );
}
