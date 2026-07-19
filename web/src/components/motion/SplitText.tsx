"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Non-breaking space keeps inter-word gaps from collapsing inside the
// overflow-hidden mask wrappers.
const NBSP = " ";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Word-by-word mask-wipe reveal, triggered when the text scrolls into view.
 * Renders an inline span (wrap it in your own heading tag). Each word sits in an
 * overflow-hidden wrapper and slides up from below, creating the "line reveal"
 * look without the paid GSAP SplitText plugin. Reduced-motion users get the
 * plain, fully-visible text.
 */
export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
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

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <span data-word className="inline-block will-change-transform">
            {i < words.length - 1 ? word + NBSP : word}
          </span>
        </span>
      ))}
    </span>
  );
}
