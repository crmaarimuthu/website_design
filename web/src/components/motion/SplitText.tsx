"use client";

import { createElement, useEffect, useRef } from "react";
import type { ElementType } from "react";
import { gsap } from "@/lib/gsap";

// Non-breaking space keeps inter-word gaps from collapsing inside the
// overflow-hidden mask wrappers.
const NBSP = " ";

interface SplitTextProps {
  text: string;
  /** Heading level / tag to render. Defaults to h2. */
  as?: ElementType;
  className?: string;
  delay?: number;
}

/**
 * Word-by-word mask-wipe reveal, triggered when the heading scrolls into view.
 * Each word sits in an overflow-hidden wrapper and slides up from below, so the
 * clip creates the "line reveal" look without the paid GSAP SplitText plugin.
 * Reduced-motion users get the plain, fully-visible heading.
 */
export function SplitText({ text, as: Tag = "h2", className, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 115 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.055,
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  // createElement avoids the "children: never" inference TS applies to a
  // dynamic ElementType rendered as a JSX tag.
  return createElement(
    Tag,
    { ref, className },
    words.map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
        <span data-word className="inline-block will-change-transform">
          {i < words.length - 1 ? word + NBSP : word}
        </span>
      </span>
    )),
  );
}
