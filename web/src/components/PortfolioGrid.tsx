"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Gallery } from "@/types";
import { cn } from "@/lib/cn";

const categories: { key: Gallery["category"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "portrait", label: "Portraits" },
  { key: "wedding", label: "Weddings" },
  { key: "fashion", label: "Fashion" },
  { key: "product", label: "Product" },
  { key: "drone", label: "Drone" },
];

export function PortfolioGrid({ galleries }: { galleries: Gallery[] }) {
  const [active, setActive] = useState<Gallery["category"] | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? galleries : galleries.filter((g) => g.category === active)),
    [active, galleries],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm transition-colors",
              active === c.key
                ? "border-accent bg-accent text-accent-contrast"
                : "border-border text-fg-muted hover:border-accent hover:text-fg",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <Link
            key={g.slug}
            href={`/gallery/${g.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={g.cover}
              alt={g.title}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-xs uppercase tracking-widest text-accent-soft">{g.category}</span>
              <h3 className="mt-1 font-display text-2xl text-white">{g.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                View gallery <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
