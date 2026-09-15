import * as React from "react";
import { cn } from "@/lib/utils";

/** Page gutter container. */
export function Container({
  className,
  as: Tag = "div",
  children,
}: {
  className?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}) {
  return <Tag className={cn("u-container", className)}>{children}</Tag>;
}

type Ground =
  | "bone"
  | "porcelain"
  | "mist"
  | "espresso"
  | "rose"
  | "coral"
  | "mint"
  | "lavender"
  | "gold";
type Space = "sm" | "md" | "lg" | "none";

const groundClass: Record<Ground, string> = {
  bone: "bg-bone text-ink",
  porcelain: "bg-porcelain text-ink",
  mist: "bg-mist text-ink",
  espresso: "bg-espresso text-bone [&_h1]:text-bone [&_h2]:text-bone [&_h3]:text-bone",
  // Signature tinted grounds — soft washes of the polish-rack accents.
  rose: "bg-lacquer-tint text-ink",
  coral: "bg-coral-tint text-ink",
  mint: "bg-teal-tint text-ink",
  lavender: "bg-plum-tint text-ink",
  gold: "bg-champagne-tint text-ink",
};

const spaceClass: Record<Space, string> = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
};

/** A full-width band with a ground colour and vertical rhythm. */
export function Section({
  id,
  ground = "bone",
  space = "md",
  className,
  containerClassName,
  bleed = false,
  children,
  "aria-label": ariaLabel,
}: {
  id?: string;
  ground?: Ground;
  space?: Space;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative scroll-mt-[var(--nav-h)]",
        groundClass[ground],
        spaceClass[space],
        className,
      )}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

/** Kicker / eyebrow label with a hairline rule. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <Tag className={cn("u-eyebrow", className)}>{children}</Tag>;
}

/** Section heading block: eyebrow + display heading + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as = "h2",
  className,
  headingClassName,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  headingClassName?: string;
}) {
  const Heading = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          "text-d-md text-balance max-w-[24ch]",
          align === "center" && "max-w-[26ch]",
          headingClassName,
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p
          className={cn(
            "text-lead text-char/85 text-pretty max-w-measure",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** A thin full-width rule. */
export function Hairline({
  className,
  tone = "sand",
}: {
  className?: string;
  tone?: "sand" | "champagne" | "ink";
}) {
  const toneClass =
    tone === "champagne"
      ? "bg-champagne"
      : tone === "ink"
        ? "bg-ink/15"
        : "bg-sand";
  return <div className={cn("h-px w-full", toneClass, className)} aria-hidden />;
}
