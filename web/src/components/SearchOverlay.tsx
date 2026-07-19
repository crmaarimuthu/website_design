"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { navLinks } from "@/content/nav";
import { services } from "@/content/services";
import { galleries } from "@/content/galleries";
import { blog } from "@/content/blog";

interface Result {
  label: string;
  href: string;
  kind: string;
}

const index: Result[] = [
  ...navLinks.map((l) => ({ label: l.label, href: l.href, kind: "Page" })),
  ...services.map((s) => ({ label: s.title, href: "/services", kind: "Service" })),
  ...galleries.map((g) => ({ label: g.title, href: `/gallery/${g.slug}`, kind: "Gallery" })),
  ...blog.map((b) => ({ label: b.title, href: `/blog/${b.slug}`, kind: "Article" })),
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-premium"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search size={20} className="text-accent" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, galleries, articles…"
            className="w-full bg-transparent text-fg placeholder:text-fg-subtle focus:outline-none"
          />
          <button aria-label="Close search" onClick={onClose} className="text-fg-subtle hover:text-fg">
            <X size={20} />
          </button>
        </div>
        {query && (
          <ul className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-fg-subtle">
                No results for “{query}”.
              </li>
            )}
            {results.map((r) => (
              <li key={`${r.kind}-${r.href}-${r.label}`}>
                <Link
                  href={r.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-surface"
                >
                  <span>{r.label}</span>
                  <span className="text-xs uppercase tracking-wider text-fg-subtle">{r.kind}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
