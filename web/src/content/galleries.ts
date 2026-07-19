import type { Gallery } from "@/types";

const img = (n: number) => `/media/images/image${n}.jpg`;
const banner = (n: number) => `/media/images/banner${n}.jpg`;

export const galleries: Gallery[] = [
  {
    slug: "woman",
    title: "Woman Portraits",
    tagline: "Grace, poise and personality in every frame.",
    cover: banner(1),
    category: "portrait",
    images: [
      { src: banner(1), alt: "Woman portrait in warm light" },
      { src: img(1), alt: "Studio woman portrait" },
      { src: img(2), alt: "Outdoor woman portrait" },
      { src: img(3), alt: "Editorial woman portrait", before: banner(1) },
      { src: img(4), alt: "Candid woman portrait" },
      { src: img(5), alt: "Golden hour woman portrait" },
    ],
  },
  {
    slug: "man",
    title: "Man Portraits",
    tagline: "Confident, characterful and timeless.",
    cover: banner(2),
    category: "portrait",
    images: [
      { src: banner(2), alt: "Man portrait in studio" },
      { src: img(6), alt: "Outdoor man portrait" },
      { src: img(7), alt: "Editorial man portrait" },
      { src: img(8), alt: "Candid man portrait" },
    ],
  },
  {
    slug: "children",
    title: "Children Portraits",
    tagline: "Playful moments frozen in time.",
    cover: banner(3),
    category: "portrait",
    images: [
      { src: banner(3), alt: "Child portrait smiling" },
      { src: img(9), alt: "Child playing portrait" },
      { src: img(10), alt: "Family child portrait" },
    ],
  },
  {
    slug: "prewedding",
    title: "Pre-Wedding",
    tagline: "Love stories told before the big day.",
    cover: banner(4),
    category: "wedding",
    images: [
      { src: banner(4), alt: "Pre-wedding couple in field" },
      { src: banner(6), alt: "Pre-wedding candid" },
      { src: banner(7), alt: "Pre-wedding sunset" },
      { src: banner(8), alt: "Pre-wedding city" },
    ],
  },
  {
    slug: "fashion",
    title: "Fashion",
    tagline: "Editorial energy with a cinematic finish.",
    cover: banner(5),
    category: "fashion",
    images: [
      { src: banner(5), alt: "Fashion editorial look" },
      { src: img(1), alt: "Fashion studio look", before: img(6) },
      { src: img(3), alt: "Fashion location look" },
      { src: banner(10), alt: "Fashion accessories" },
    ],
  },
  {
    slug: "couple",
    title: "Couple Moments",
    tagline: "Intimate, honest and full of feeling.",
    cover: banner(6),
    category: "wedding",
    images: [
      { src: banner(6), alt: "Couple embrace" },
      { src: banner(4), alt: "Couple laughing" },
      { src: banner(8), alt: "Couple walking" },
      { src: img(2), alt: "Couple portrait" },
    ],
  },
  {
    slug: "product",
    title: "Product",
    tagline: "Clean, crisp, conversion-ready imagery.",
    cover: img(7),
    category: "product",
    images: [
      { src: img(7), alt: "Product on seamless background" },
      { src: img(8), alt: "Product detail shot" },
      { src: img(9), alt: "Product lifestyle shot" },
    ],
  },
  {
    slug: "drone",
    title: "Drone & Aerial",
    tagline: "A sweeping view of the day.",
    cover: banner(9),
    category: "drone",
    images: [
      { src: banner(9), alt: "Aerial venue shot" },
      { src: banner(10), alt: "Aerial landscape" },
      { src: banner(7), alt: "Aerial celebration" },
    ],
  },
];

export function getGallery(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export const gallerySlugs = galleries.map((g) => g.slug);
