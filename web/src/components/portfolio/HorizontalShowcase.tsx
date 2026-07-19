"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { Gallery } from "@/types";

/**
 * A horizontally-scrolling showcase: on desktop the section pins and the track
 * translates sideways as you scroll vertically (GSAP ScrollTrigger, synced to
 * Lenis via the global provider). On touch / reduced-motion the same track is a
 * plain native horizontal scroll — no pinning, no JS transform.
 */
export function HorizontalShowcase({ galleries }: { galleries: Gallery[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) return;

    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const getDistance = () => trackEl.scrollWidth - window.innerWidth;
      gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      aria-label="Featured work"
      className="relative overflow-x-auto overflow-y-hidden md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        ref={track}
        className="flex w-max items-center gap-6 px-[clamp(1.25rem,5vw,5rem)] py-16 md:py-24"
      >
        <div className="w-[70vw] shrink-0 pr-4 sm:w-[46vw] md:w-[30vw]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Featured
          </p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            A cinematic walk through our work
          </h2>
          <p className="mt-4 text-fg-muted">
            Scroll to glide sideways through a selection of our favourite stories.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
            Scroll to explore <ArrowRight size={16} />
          </span>
        </div>

        {galleries.map((g) => (
          <Link
            key={g.slug}
            href={`/gallery/${g.slug}`}
            className="group relative block aspect-[3/4] w-[78vw] shrink-0 overflow-hidden rounded-3xl sm:w-[52vw] md:w-[32vw] lg:w-[26vw]"
          >
            <Image
              src={g.cover}
              alt={g.title}
              fill
              sizes="(max-width:640px) 78vw, (max-width:1024px) 52vw, 26vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="text-xs uppercase tracking-widest text-accent-soft">{g.category}</span>
              <h3 className="mt-1 font-display text-2xl text-white">{g.title}</h3>
              <p className="mt-1 text-sm text-white/70">{g.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
