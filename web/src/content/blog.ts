import type { BlogPost } from "@/types";

export const blog: BlogPost[] = [
  {
    slug: "pudukkottai-documentary",
    title: "A Pudukkottai Wedding Documentary",
    excerpt:
      "How we approached a three-day temple-town wedding as a single flowing story rather than a checklist of moments.",
    cover: "/media/images/banner7.jpg",
    date: "2026-05-18",
    author: "Tamil Digital Studio",
    readingMinutes: 5,
    body: [
      "Every wedding has a rhythm. In Pudukkottai, that rhythm is set by the temple bells, the aromas from the kitchen, and the slow gathering of family from across Tamil Nadu.",
      "We photograph documentary-first: no stiff line-ups, no endless posing. We watch for the glance between a mother and daughter, the nervous laugh before the muhurtham, the quiet exhaustion at midnight.",
      "The result is a film and a gallery that feel less like a record and more like a memory — the way the day actually felt to live through.",
    ],
  },
  {
    slug: "thanjavur-documentary",
    title: "Light & Tradition in Thanjavur",
    excerpt:
      "Balancing golden-hour portraits with the deep colours of a traditional ceremony.",
    cover: "/media/images/banner8.jpg",
    date: "2026-04-02",
    author: "Tamil Digital Studio",
    readingMinutes: 4,
    body: [
      "Thanjavur is a gift for a photographer — rich temple architecture, saturated silks, and a quality of light that changes by the hour.",
      "Our approach is to shoot with, not against, that light: soft window light for portraits, and careful exposure to keep the jewellery and silks glowing without blowing out.",
      "Tradition and cinema aren't opposites. The most modern-looking frames here are the ones that respect the ritual most.",
    ],
  },
  {
    slug: "tamil-nadu-culture",
    title: "Photographing Tamil Nadu Culture",
    excerpt:
      "Notes on colour, ritual and storytelling from a decade behind the lens.",
    cover: "/media/images/banner9.jpg",
    date: "2026-02-20",
    author: "Tamil Digital Studio",
    readingMinutes: 6,
    body: [
      "Culture isn't a backdrop — it's the subject. Over the years we've learned to slow down and let a ceremony teach us where to stand.",
      "We plan the non-negotiable moments in advance with the family, then leave room for the unplanned ones, which are almost always the best.",
      "If there's one lesson: photograph people first and spectacle second. The spectacle is stunning, but it's the faces you'll want to look at in twenty years.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blog.find((p) => p.slug === slug);
}
