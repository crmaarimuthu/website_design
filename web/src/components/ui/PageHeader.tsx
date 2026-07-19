import Image from "next/image";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
}

/** Consistent hero band for inner pages. */
export function PageHeader({ eyebrow, title, description, image = "/media/images/banner8.jpg" }: PageHeaderProps) {
  return (
    <header className="relative flex min-h-[52vh] items-end overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-black/40" />
      <div className="container-px relative mx-auto w-full max-w-7xl pb-14 pt-28">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-fg-muted">{description}</p>}
      </div>
    </header>
  );
}
