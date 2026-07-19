"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Hero3D } from "./Hero3D";
import { ButtonLink } from "../ui/Button";
import { Magnetic } from "../motion/Magnetic";
import { site } from "@/content/site";

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item: Variants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D / poster layer */}
      <div className="absolute inset-0 -z-10">
        <Hero3D />
      </div>
      {/* Legibility gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />

      <div className="container-px mx-auto w-full max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl pt-24"
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-accent"
          >
            {site.lockupSmall} {site.lockupBig}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Capture your <span className="text-gradient-gold">beautiful</span> moments
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
          >
            {site.name} crafts timeless wedding films, fashion portraits and cinematic stories
            across Tamil Nadu — designed to be relived for a lifetime.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <ButtonLink href="/booking" size="lg">
                Book a Session <ArrowRight size={18} />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/portfolio" size="lg" variant="outline">
                <Play size={16} /> View Portfolio
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
