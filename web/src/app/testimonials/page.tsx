import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Kind words from the couples, families and brands we've had the joy of photographing.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Words from our clients"
        description="Nothing means more to us than the families who trust us with their memories."
        image="/media/images/banner7.jpg"
      />

      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.concat(testimonials).map((t, i) => (
            <Reveal as="article" key={`${t.name}-${i}`} delay={(i % 3) * 0.05}>
              <figure className="glass flex h-full flex-col rounded-2xl p-8">
                <Quote size={28} className="text-accent/60" />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-fg">“{t.quote}”</blockquote>
                <div className="mt-5 flex gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <figcaption className="mt-3 text-sm">
                  <span className="font-semibold text-fg">{t.name}</span>
                  <span className="text-fg-subtle"> · {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="glass mt-16 flex flex-col items-center gap-5 rounded-2xl p-10 text-center shadow-premium sm:p-16">
          <h2 className="font-display text-3xl sm:text-4xl">Ready to create your own story?</h2>
          <ButtonLink href="/booking">Book your session</ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
