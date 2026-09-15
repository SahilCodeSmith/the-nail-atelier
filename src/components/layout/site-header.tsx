"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { primaryNav, siteConfig } from "@/lib/config/site";
import { ButtonLink } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const onBookFlow = pathname.startsWith("/book");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The booking flow carries its own minimal chrome.
  if (onBookFlow) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-standard",
        scrolled
          ? "border-b border-sand bg-bone/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="u-container flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-[0.95rem] uppercase tracking-[0.24em] text-ink"
          aria-label={`${siteConfig.name} — home`}
        >
          The&nbsp;Nail&nbsp;Atelier
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="u-underline py-1 font-sans text-[0.9375rem] text-ink/85 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href="/book"
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {siteConfig.cta.primary}
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
