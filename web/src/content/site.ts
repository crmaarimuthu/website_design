import type { SiteConfig } from "@/types";

export const site: SiteConfig = {
  name: "Tamil Digital Studio",
  legalName: "Tamil Digital Studio",
  tagline: "Capture Your Beautiful Moments",
  lockupSmall: "Stories by",
  lockupBig: "Tamil Digital",
  description:
    "Tamil Digital Studio is a premium photography & cinematography studio crafting timeless wedding films, fashion portraits, and cinematic stories across Tamil Nadu.",
  url: "https://tamildigitalstudio.example",
  phone: "+91 99528 06857",
  whatsapp: "919952806857",
  email: "hello@tamildigitalstudio.example",
  address: {
    // Mahalakshmi Complex, nearby Ramaiya Restaurant, Karambakkudi.
    street: "Mahalakshmi Complex, Nearby Ramaiya Restaurant",
    city: "Karambakkudi",
    region: "Tamil Nadu",
    postalCode: "622302",
    country: "India",
  },
  // Approximate coordinates for Karambakkudi — confirm exact pin before launch.
  geo: { lat: 10.4592, lng: 79.0736 },
  hours: "Mon–Sat · 9:00 AM – 8:00 PM",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  ],
  logo: "/media/images/tamil_logo.jpg",
};
