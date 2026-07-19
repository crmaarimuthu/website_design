import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clapperboard, Heart, Sparkles, Camera, Package, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { VideoSlider } from "@/components/VideoSlider";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import { galleries } from "@/content/galleries";
import { testimonials } from "@/content/testimonials";
import { blog } from "@/content/blog";

const icons: Record<string, LucideIcon> = {
  Clapperboard,
  Heart,
  Sparkles,
  Camera,
  Package,
  Plane,
};

const stats = [
  { value: "12+", label: "Years behind the lens" },
  { value: "800+", label: "Stories told" },
  { value: "50+", label: "Destination weddings" },
  { value: "4.9★", label: "Average client rating" },
];

export default function HomePage() {
  const featured = galleries.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Stats strip */}
      <section className="border-y border-border bg-bg-elevated">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="text-center">
              <p className="font-display text-4xl text-accent">{s.value}</p>
              <p className="mt-1 text-sm text-fg-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Wedding films */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionHeading
          align="center"
          eyebrow="Our Wedding Films"
          title="Stories that move"
          description="Cinematic films crafted from the real emotion of your day — press play."
        />
        <Reveal className="mt-12">
          <VideoSlider />
        </Reveal>
      </section>

      {/* Featured galleries */}
      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Photo Albums"
            title="Beautiful moments, captured forever"
            description="A glimpse into the sessions we love shooting most."
          />
          <ButtonLink href="/portfolio" variant="outline" className="mb-2">
            View all <ArrowRight size={16} />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((g, i) => (
            <Reveal as="article" key={g.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/gallery/${g.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={g.cover}
                  alt={g.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white">{g.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{g.tagline}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent-soft opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionHeading
          align="center"
          eyebrow="What we do"
          title="Exceptional service, tailored to you"
          description="From intimate portraits to full cinematic productions, every experience is built around your story."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Camera;
            return (
              <Reveal as="article" key={s.slug} delay={(i % 3) * 0.05}>
                <div className="glass h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/services">
            All services <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-bg-elevated">
        <div className="container-px mx-auto max-w-7xl py-24">
          <SectionHeading align="center" eyebrow="Kind words" title="Loved by our clients" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal as="article" key={t.name} delay={(i % 2) * 0.05}>
                <figure className="glass h-full rounded-2xl p-8">
                  <div className="mb-4 flex gap-1 text-accent">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed text-fg">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold text-fg">{t.name}</span>
                    <span className="text-fg-subtle"> · {t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Journal" title="Latest blog & articles" />
          <ButtonLink href="/blog" variant="outline" className="mb-2">
            Read the journal <ArrowRight size={16} />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blog.map((post, i) => (
            <Reveal as="article" key={post.slug} delay={(i % 3) * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="container-px mx-auto max-w-7xl pb-24">
        <Reveal className="glass flex flex-col items-center gap-6 rounded-2xl p-10 text-center shadow-premium sm:p-16">
          <h2 className="font-display text-3xl sm:text-4xl">Get every new photo &amp; story first</h2>
          <p className="max-w-lg text-fg-muted">
            Subscribe for fresh work, behind-the-scenes films and seasonal offers — no spam, ever.
          </p>
          <div className="flex justify-center">
            <SubscribeForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
