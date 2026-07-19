import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "wedding-films",
    title: "Wedding Films",
    description:
      "Cinematic wedding films that turn a single day into a story you relive for a lifetime.",
    icon: "Clapperboard",
    image: "/media/images/banner4.jpg",
    features: ["Full-day coverage", "Cinematic edit", "4K delivery", "Highlight reel"],
  },
  {
    slug: "wedding-photography",
    title: "Wedding Photography",
    description:
      "Documentary and portrait wedding photography — candid emotion and timeless framing.",
    icon: "Heart",
    image: "/media/images/banner6.jpg",
    features: ["Candid + traditional", "Two photographers", "Premium album", "Online gallery"],
  },
  {
    slug: "fashion",
    title: "Fashion & Editorial",
    description:
      "Studio and location fashion shoots with directed lighting and a bold editorial edge.",
    icon: "Sparkles",
    image: "/media/images/banner5.jpg",
    features: ["Studio lighting", "Art direction", "Retouching", "Lookbook layout"],
  },
  {
    slug: "portraits",
    title: "Portrait Sessions",
    description:
      "Individual, couple, children and family portraits crafted to feel effortless and natural.",
    icon: "Camera",
    image: "/media/images/banner1.jpg",
    features: ["Guided posing", "Wardrobe advice", "Hand-finished edits", "Print-ready files"],
  },
  {
    slug: "product",
    title: "Product Photography",
    description:
      "Clean, conversion-ready product imagery for brands, catalogs and e-commerce.",
    icon: "Package",
    image: "/media/images/image7.jpg",
    features: ["Studio setup", "Colour accuracy", "Ghost mannequin", "Bulk delivery"],
  },
  {
    slug: "drone",
    title: "Drone & Aerial",
    description:
      "Sweeping aerial coverage for weddings, venues and real estate captured in stunning 4K.",
    icon: "Plane",
    image: "/media/images/banner9.jpg",
    features: ["Licensed pilots", "4K aerial", "Venue reveals", "Cinematic moves"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
