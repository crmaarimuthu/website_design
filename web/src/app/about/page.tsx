import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, Camera, Clapperboard } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.name} — a premium photography & cinematography studio in Tamil Nadu.`,
};

const values = [
  { icon: Camera, title: "Documentary heart", text: "We photograph the real moments first — the spectacle second." },
  { icon: Clapperboard, title: "Cinematic craft", text: "Every film is graded, scored and edited to feel like a memory." },
  { icon: Award, title: "Award-winning", text: "Recognised across regional wedding and portrait competitions." },
  { icon: Users, title: "People first", text: "A calm, friendly crew that makes being photographed feel easy." },
];

const team = [
  { name: "Arun Kumar", role: "Founder & Lead Photographer", image: "/media/images/image1.jpg" },
  { name: "Divya Nair", role: "Cinematographer", image: "/media/images/image2.jpg" },
  { name: "Ravi Shankar", role: "Editor & Colourist", image: "/media/images/image3.jpg" },
  { name: "Lakshmi Priya", role: "Client Experience", image: "/media/images/image4.jpg" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Stories, told with soul"
        description={`${site.lockupSmall} ${site.lockupBig} — capturing Tamil Nadu's most beautiful moments for over a decade.`}
        image="/media/images/banner6.jpg"
      />

      <section className="container-px mx-auto grid max-w-7xl items-center gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-premium">
            <Image src="/media/images/banner1.jpg" alt="Studio at work" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Our story"
            title="A studio built on emotion"
            description="What began as a single photographer with a borrowed camera is now a full creative studio."
          />
          <div className="mt-6 space-y-4 text-fg-muted">
            <p>
              For more than twelve years, {site.name} has documented the weddings, families and brands of Tamil Nadu.
              We fell in love with photography not for the gear, but for the feeling — the quiet glance, the burst of
              laughter, the tears no one expected.
            </p>
            <p>
              Today our team blends documentary photography with cinematic film-making, delivering galleries and films
              our clients return to for a lifetime.
            </p>
          </div>
          <ButtonLink href="/booking" className="mt-8">Work with us</ButtonLink>
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="container-px mx-auto max-w-7xl py-24">
          <SectionHeading align="center" eyebrow="What we value" title="The way we work" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="article" key={v.title} delay={(i % 4) * 0.05}>
                <div className="glass h-full rounded-2xl p-7 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                    <v.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionHeading align="center" eyebrow="The team" title="Meet the crew" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal as="article" key={m.name} delay={(i % 4) * 0.05}>
              <div className="group overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={m.image} alt={m.name} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="pt-4">
                  <h3 className="font-display text-lg">{m.name}</h3>
                  <p className="text-sm text-accent">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
