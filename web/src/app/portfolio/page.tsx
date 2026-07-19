import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { HorizontalShowcase } from "@/components/portfolio/HorizontalShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleries } from "@/content/galleries";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse our full portfolio of weddings, portraits, fashion, product and aerial photography.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work"
        description="A curated look across every kind of story we tell."
        image="/media/images/banner2.jpg"
      />
      <HorizontalShowcase galleries={galleries} />

      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionHeading
          eyebrow="Browse all"
          title="Filter by category"
          description="Every gallery, filtered to what you came to see."
          className="mb-12"
        />
        <PortfolioGrid galleries={galleries} />
      </section>
    </>
  );
}
