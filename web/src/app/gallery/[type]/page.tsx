import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { getGallery, galleries } from "@/content/galleries";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return galleries.map((g) => ({ type: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const gallery = getGallery(type);
  if (!gallery) return { title: "Gallery" };
  return {
    title: `${gallery.title} Gallery`,
    description: gallery.tagline,
    openGraph: { images: [gallery.cover] },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const gallery = getGallery(type);
  if (!gallery) notFound();

  const comparison = gallery.images.find((img) => img.before);

  return (
    <>
      <PageHeader eyebrow="Gallery" title={gallery.title} description={gallery.tagline} image={gallery.cover} />

      {/* Category quick-nav */}
      <section className="container-px mx-auto max-w-7xl pt-12">
        <div className="flex flex-wrap gap-2">
          {galleries.map((g) => (
            <Link
              key={g.slug}
              href={`/gallery/${g.slug}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                g.slug === gallery.slug
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-border text-fg-muted hover:border-accent hover:text-fg",
              )}
            >
              {g.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <GalleryGrid images={gallery.images} />
      </section>

      {comparison?.before && (
        <section className="border-t border-border bg-bg-elevated">
          <div className="container-px mx-auto max-w-4xl py-24">
            <SectionHeading
              align="center"
              eyebrow="Before / After"
              title="The retouching difference"
              description="Drag the handle to compare our straight-out-of-camera frame with the final edit."
              className="mb-12"
            />
            <BeforeAfter before={comparison.before} after={comparison.src} />
          </div>
        </section>
      )}
    </>
  );
}
