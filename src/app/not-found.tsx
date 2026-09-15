import Link from "next/link";
import { buildMetadata } from "@/lib/config/seo";
import { ButtonLink } from "@/components/ui/button";

export const metadata = buildMetadata({ title: "Page not found", noindex: true });

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-gutter py-section">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <p className="u-eyebrow u-eyebrow--center">Error 404</p>
        <h1 className="font-display text-d-lg text-ink">
          This page has slipped off the table
        </h1>
        <p className="text-[0.9375rem] leading-relaxed text-char/75">
          The link may be old, or the page moved. The portfolio and booking are
          both a tap away.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" variant="primary" size="md" arrow>
            Back to home
          </ButtonLink>
          <Link href="/gallery" className="font-sans text-[0.9375rem] text-ink u-underline">
            View the gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
