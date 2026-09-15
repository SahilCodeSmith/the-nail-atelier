"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/config/site";
import { whatsappHref, telHref, generalEnquiryMessage } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/button";

const links = [
  ...primaryNav,
  { label: "Questions", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="grid size-11 place-items-center text-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-[60] flex flex-col bg-bone data-[state=open]:animate-fade-in"
          aria-label="Menu"
        >
          <div className="u-container flex h-[var(--nav-h)] items-center justify-between">
            <span className="font-display text-[0.95rem] uppercase tracking-[0.24em] text-ink">
              The&nbsp;Nail&nbsp;Atelier
            </span>
            <Dialog.Close
              className="grid size-11 place-items-center text-ink"
              aria-label="Close menu"
            >
              <X className="size-6" aria-hidden />
            </Dialog.Close>
          </div>

          <nav
            aria-label="Primary"
            className="u-container flex flex-1 flex-col justify-center gap-1"
          >
            {links.map((item, i) => (
              <div
                key={item.href}
                className="motion-safe:animate-fade-in"
                style={{ animationDelay: `${0.04 + i * 0.045}s` }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-display text-d-md text-ink"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="u-container flex flex-col gap-4 border-t border-sand py-6">
            <ButtonLink
              href="/book"
              variant="primary"
              size="md"
              arrow
              onClick={() => setOpen(false)}
              className="w-full"
            >
              {siteConfig.cta.primary}
            </ButtonLink>
            <div className="flex items-center gap-5 font-sans text-[0.8125rem] tracking-[0.02em] text-char">
              <a href={whatsappHref(generalEnquiryMessage())} className="u-underline">
                WhatsApp
              </a>
              <a href={telHref()} className="inline-flex items-center gap-1.5 u-underline">
                <Phone className="size-3.5" aria-hidden />
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
