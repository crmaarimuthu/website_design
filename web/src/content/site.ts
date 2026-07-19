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
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@tamildigitalstudio.example",
  address: {
    street: "12 Raja Street",
    city: "Pudukkottai",
    region: "Tamil Nadu",
    postalCode: "622001",
    country: "India",
  },
  geo: { lat: 10.3813, lng: 78.8214 },
  hours: "Mon–Sat · 9:00 AM – 8:00 PM",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  ],
  logo: "/media/images/tamil_logo.jpg",
};
