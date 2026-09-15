"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config/site";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp button (desktop) + sticky booking bar (mobile).
 * Hidden inside the /book flow, which carries its own navigation.
 */
export function FloatingContact() {
  const pathname = usePathname();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/book")) return null;

  return (
    <>
      {/* Desktop: discreet WhatsApp pill */}
      <a
        href={whatsappHref(generalEnquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-xs border border-ink bg-bone/95 px-4 py-3 font-sans text-[0.8125rem] font-medium text-ink shadow-float backdrop-blur transition-all duration-300 ease-out-expo hover:bg-white lg:inline-flex",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <MessageCircle className="size-4" aria-hidden />
        Message on WhatsApp
      </a>

      {/* Mobile: sticky dual CTA — Book + WhatsApp */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-bone/95 px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur transition-transform duration-300 ease-out-expo lg:hidden",
          show ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="grid grid-cols-[1.55fr_1fr] gap-2.5">
          <ButtonLink
            href="/book"
            variant="primary"
            size="md"
            arrow
            className="w-full px-4 text-[0.875rem]"
          >
            {siteConfig.cta.primary}
          </ButtonLink>
          <a
            href={whatsappHref(generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xs border border-ink px-3 font-sans text-[0.875rem] font-medium text-ink"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
