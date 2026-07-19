import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { blog } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, notes and behind-the-scenes from the Tamil Digital Studio journal.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes from behind the lens"
        description="Field notes, wedding stories and thoughts on photographing Tamil Nadu."
        image="/media/images/banner9.jpg"
      />

      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blog.map((post, i) => (
            <Reveal as="article" key={post.slug} delay={(i % 3) * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-fg-subtle">
                  <span>{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} /> {post.readingMinutes} min read
                  </span>
                </div>
                <h2 className="mt-2 font-display text-xl transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">
                  Read more <ArrowRight size={15} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
