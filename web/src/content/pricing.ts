import type { PricingPackage } from "@/types";

export const pricing: PricingPackage[] = [
  {
    name: "Essential",
    price: "₹24,999",
    cadence: "per event",
    description: "Perfect for intimate shoots and single-day events.",
    features: [
      "Up to 4 hours coverage",
      "One photographer",
      "150+ edited photos",
      "Online gallery",
      "Delivery in 10 days",
    ],
  },
  {
    name: "Signature",
    price: "₹59,999",
    cadence: "per event",
    description: "Our most-loved package for weddings and celebrations.",
    featured: true,
    features: [
      "Full-day coverage",
      "Two photographers + film",
      "400+ edited photos",
      "Cinematic highlight film",
      "Premium printed album",
      "Delivery in 21 days",
    ],
  },
  {
    name: "Cinematic",
    price: "₹1,19,999",
    cadence: "per event",
    description: "The complete story — photography, film and aerial.",
    features: [
      "Multi-day coverage",
      "Full crew + drone",
      "800+ edited photos",
      "Feature film + teaser",
      "Luxury album + prints",
      "Priority delivery",
    ],
  },
];
