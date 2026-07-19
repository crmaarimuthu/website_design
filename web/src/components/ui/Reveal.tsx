"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "section" | "li" | "article";

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
} as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
}

/**
 * Scroll-in reveal. Honors prefers-reduced-motion (renders static, no transform)
 * and only animates once when the element enters the viewport.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Cast to a concrete motion component so JSX doesn't see a union type.
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
