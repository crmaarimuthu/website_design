"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, X, Phone, MessageCircle } from "lucide-react";
import { navLinks } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { SearchOverlay } from "./SearchOverlay";
import { ButtonLink } from "./ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass py-2 shadow-premium" : "bg-transparent py-4",
        )}
      >
        <nav className="container-px mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo / lockup */}
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image
              src={site.logo}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-accent/40"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-[0.65rem] uppercase tracking-[0.28em] text-fg-subtle">
                {site.lockupSmall}
              </span>
              <span className="font-display text-lg text-fg">{site.lockupBig}</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  isActive(link.href) ? "text-accent" : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-fg"
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <ButtonLink href="/booking" size="sm" className="hidden sm:inline-flex">
              Book Now
            </ButtonLink>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-bg-elevated p-6 shadow-premium transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-xl">{site.lockupBig}</span>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-lg transition-colors",
                  isActive(link.href) ? "bg-surface text-accent" : "text-fg-muted hover:bg-surface",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ButtonLink href="/booking" className="mt-8" onClick={() => setMenuOpen(false)}>
            Book Your Session
          </ButtonLink>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/60 px-4 py-3 text-sm text-fg transition-colors hover:border-accent hover:bg-accent/10"
            >
              <Phone size={16} className="text-accent" /> Call Now
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/60 px-4 py-3 text-sm text-fg transition-colors hover:border-accent hover:bg-accent/10"
            >
              <MessageCircle size={16} className="text-accent" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
