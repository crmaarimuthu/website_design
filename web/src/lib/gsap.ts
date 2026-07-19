import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once. gsap.registerPlugin is idempotent, but guarding on `window`
// keeps it a no-op during SSR where ScrollTrigger has no DOM to attach to.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
