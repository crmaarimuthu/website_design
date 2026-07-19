"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroFallback } from "./HeroFallback";

// ssr:false is only allowed inside a Client Component (Next 16). The heavy
// three.js chunk is code-split and never enters the initial payload.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/**
 * Decides at runtime whether to render the interactive 3D scene.
 * Mobile, coarse pointers and reduced-motion users get the lightweight poster.
 */
export function Hero3D() {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.innerWidth >= 768;
    setEnable3D(!reduce && finePointer && wideEnough);
  }, []);

  return enable3D ? <Scene /> : <HeroFallback />;
}
