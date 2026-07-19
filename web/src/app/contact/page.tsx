import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — call, email, WhatsApp or visit our studio.`,
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region}, ${site.address.country}`,
  );
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Questions, custom requests or just want to say hello — we'd love to hear from you."
        image="/media/images/banner3.jpg"
      />

      <section className="container-px mx-auto grid max-w-7xl gap-12 py-24 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div>
            <h2 className="font-display text-2xl">Studio details</h2>
            <ul className="mt-8 space-y-6 text-sm">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 shrink-0 text-accent" size={20} />
                <span className="text-fg-muted">
                  {site.name}, {site.address.street}, {site.address.city}, {site.address.region}{" "}
                  {site.address.postalCode}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="shrink-0 text-accent" size={20} />
                <a href={`tel:${site.phone}`} className="text-fg-muted hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="shrink-0 text-accent" size={20} />
                <a href={`mailto:${site.email}`} className="text-fg-muted hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="shrink-0 text-accent" size={20} />
                <a href={`https://wa.me/${site.whatsapp}`} className="text-fg-muted hover:text-accent">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="shrink-0 text-accent" size={20} />
                <span className="text-fg-muted">{site.hours}</span>
              </li>
            </ul>

            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
              <iframe
                title={`${site.name} location map`}
                src={mapSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={site.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/60 px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:bg-accent/10"
            >
              <Navigation size={16} className="text-accent" /> Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
