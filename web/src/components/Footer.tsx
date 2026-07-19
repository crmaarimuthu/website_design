import Link from "next/link";
import Image from "next/image";
import { Camera, Globe, Video, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { navLinks } from "@/content/nav";
import { services } from "@/content/services";
import type { LucideIcon } from "lucide-react";

// This lucide version ships no brand marks — map socials to expressive generics.
const socialIcons: Record<string, LucideIcon> = {
  Instagram: Camera,
  Facebook: Globe,
  Youtube: Video,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={site.logo}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-accent/40"
              />
              <span className="flex flex-col leading-none">
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-fg-subtle">
                  {site.lockupSmall}
                </span>
                <span className="font-display text-lg">{site.lockupBig}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">{site.description}</p>
            <div className="mt-6 flex gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.icon] ?? Globe;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fg-subtle">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-fg-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fg-subtle">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href="/services" className="text-fg-muted transition-colors hover:text-accent">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fg-subtle">
              Get in touch
            </h3>
            <ul className="space-y-4 text-sm text-fg-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.region}{" "}
                  {site.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-accent" />
                <a href={`tel:${site.phone}`} className="hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li className="text-fg-subtle">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-fg-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
