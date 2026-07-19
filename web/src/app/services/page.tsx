import type { Metadata } from "next";
import Image from "next/image";
import { Check, ArrowRight, Clapperboard, Heart, Sparkles, Camera, Package, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Wedding films, photography, fashion, portraits, product and drone — explore our full range of services.",
};

const icons: Record<string, LucideIcon> = { Clapperboard, Heart, Sparkles, Camera, Package, Plane };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Every kind of story"
        description="Full-service photography and cinematography, tailored to the moment you want to remember."
        image="/media/images/banner5.jpg"
      />

      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="space-y-16">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Camera;
            const flip = i % 2 === 1;
            return (
              <Reveal as="article" key={s.slug}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium">
                    <Image src={s.image} alt={s.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div>
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                      <Icon size={22} />
                    </span>
                    <h2 className="mt-5 font-display text-3xl">{s.title}</h2>
                    <p className="mt-3 text-fg-muted">{s.description}</p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-fg">
                          <Check size={16} className="text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink href="/booking" variant="outline" className="mt-7">
                      Enquire <ArrowRight size={16} />
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        <Reveal className="glass flex flex-col items-center gap-5 rounded-2xl p-10 text-center shadow-premium sm:p-16">
          <h2 className="font-display text-3xl sm:text-4xl">Not sure which fits your day?</h2>
          <p className="max-w-lg text-fg-muted">Tell us your vision and we&apos;ll craft a custom package around it.</p>
          <ButtonLink href="/booking">Start a booking</ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
