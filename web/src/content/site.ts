import type { SiteConfig } from "@/types";

export const site: SiteConfig = {
  name: "Tamil Digital Studio",
  legalName: "Tamil Digital Studio",
  tagline: "Capture Your Beautiful Moments",
  lockupSmall: "Stories by",
  lockupBig: "Tamil Digital",
  description:
    "Tamil Digital Studio is a premium photography & cinematography studio crafting timeless wedding films, fashion portraits, and cinematic stories across Tamil Nadu.",
  // No public website domain supplied yet — update once the live domain is known
  // (drives metadataBase, canonical URLs and absolute OG/schema image paths).
  url: "https://tamildigitalstudio.example",
  phone: "+91 9952806857",
  whatsapp: "919952806857",
  email: "thamothamotharan35@gmail.com",
  address: {
    street: "Mahalaskmi Complex, Nearby Ramaiya Restaurants",
    city: "Karambakkudi",
    region: "Tamil Nadu",
    postalCode: "622302",
    country: "India",
  },
  // Approximate coordinates for Karambakkudi — the official pin lives at `maps`.
  geo: { lat: 10.4592, lng: 79.0736 },
  maps: "https://goo.gl/maps/crbseEsWo5h74Q9f8",
  hours: "Mon–Sat · 9:00 AM – 8:00 PM",
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/tamil_digital_studio_kbk?igsh=a2RldGljdTlob3Az",
      icon: "Instagram",
    },
    { label: "Facebook", href: "https://www.facebook.com/share/17qUNWAWpB/", icon: "Facebook" },
  ],
  logo: "/media/images/tamil_logo.jpg",
};
