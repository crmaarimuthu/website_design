"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element chases the pointer (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps an interactive element so it drifts toward the cursor on hover and
 * springs back on leave. No-op on coarse pointers (touch) where there is no
 * hover to react to.
 */
export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}
