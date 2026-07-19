// Shared domain types. Content today is local (see src/content/*), but these
// types are the contract a future CMS/DB layer will satisfy unchanged.

export interface GalleryImage {
  src: string;
  alt: string;
  /** Optional "before" source to enable the before/after comparison slider. */
  before?: string;
}

export interface Gallery {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  category: "portrait" | "wedding" | "fashion" | "product" | "drone";
  images: GalleryImage[];
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  image: string;
  features: string[];
}

export interface PricingPackage {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number; // 1..5
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string; // ISO
  author: string;
  readingMinutes: number;
  /** Simple paragraph list — a Markdown/CMS body slots in here later. */
  body: string[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  lockupSmall: string;
  lockupBig: string;
  description: string;
  url: string;
  phone: string;
  whatsapp: string; // digits only for wa.me
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  /** Public Google Maps link used by "Get Directions" / "Open in Maps". */
  maps: string;
  hours: string;
  socials: { label: string; href: string; icon: string }[];
  logo: string;
}
