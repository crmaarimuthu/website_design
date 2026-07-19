import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost, blog } from "@/content/blog";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return blog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", images: [post.cover], publishedTime: post.date },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pb-24">
      <header className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image src={post.cover} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-black/40" />
        <div className="container-px relative mx-auto w-full max-w-3xl pb-14 pt-28">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
            <ArrowLeft size={16} /> Back to journal
          </Link>
          <div className="mb-4 flex items-center gap-3 text-xs text-fg-subtle">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> {post.readingMinutes} min read
            </span>
            <span>· {post.author}</span>
          </div>
          <h1 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">{post.title}</h1>
        </div>
      </header>

      <div className="container-px mx-auto max-w-3xl pt-14">
        <div className="space-y-6 text-lg leading-relaxed text-fg-muted">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-8 text-center">
          <h2 className="font-display text-2xl">Planning your own celebration?</h2>
          <p className="mt-2 text-fg-muted">We&apos;d love to tell your story.</p>
          <ButtonLink href="/booking" className="mt-6">Start a booking</ButtonLink>
        </div>
      </div>
    </article>
  );
}
