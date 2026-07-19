import type { Metadata } from "next";
import { Check, Star } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { pricing } from "@/content/pricing";
import { faq } from "@/content/faq";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent photography and film packages — Essential, Signature and Cinematic.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, honest packages"
        description="Every package is a starting point — we'll happily tailor one to your day."
        image="/media/images/banner10.jpg"
      />

      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.map((p, i) => (
            <Reveal as="article" key={p.name} delay={i * 0.05} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl p-8",
                  p.featured
                    ? "bg-accent text-accent-contrast shadow-premium ring-2 ring-accent"
                    : "glass",
                )}
              >
                {p.featured && (
                  <span className="mb-4 inline-flex w-fit items-center gap-1 rounded-full bg-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <Star size={13} fill="currentColor" /> Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className={cn("mt-2 text-sm", p.featured ? "text-accent-contrast/80" : "text-fg-muted")}>
                  {p.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl">{p.price}</span>
                  {p.cadence && (
                    <span className={cn("text-sm", p.featured ? "text-accent-contrast/70" : "text-fg-subtle")}>
                      {p.cadence}
                    </span>
                  )}
                </div>
                <ul className="mt-7 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={p.featured ? "text-accent-contrast" : "text-accent"} /> {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/booking"
                  variant={p.featured ? "outline" : "primary"}
                  className={cn("mt-8", p.featured && "border-accent-contrast/40 text-accent-contrast hover:bg-black/10")}
                >
                  Choose {p.name}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated">
        <div className="container-px mx-auto max-w-3xl py-24">
          <SectionHeading align="center" eyebrow="FAQ" title="Questions, answered" className="mb-12" />
          <FaqAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
