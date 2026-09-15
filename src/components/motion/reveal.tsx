"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance animation, built on `motion`. Runs once per
 * element (viewport once:true) and is fully disabled — content just appears —
 * when the visitor has prefers-reduced-motion set, via <MotionConfig> in the
 * root layout. `.reveal` is the hook the <noscript> fallback in layout.tsx
 * uses to force full visibility when JS is unavailable.
 */

type Tag = "div" | "section" | "li" | "span" | "figure" | "ul" | "ol";

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  figure: motion.figure,
  ul: motion.ul,
  ol: motion.ol,
} satisfies Record<Tag, unknown>;

const EASE = [0.16, 1, 0.3, 1] as const;

function itemVariants(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
  };
}

function groupVariants(stagger: number, delay: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

export function Reveal({
  children,
  className,
  as = "div",
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  style?: React.CSSProperties;
}) {
  const Comp = tags[as] as (typeof tags)["div"];
  return (
    <Comp
      className={cn("reveal", className)}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={itemVariants(delay)}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.06,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: Tag;
}) {
  const Comp = tags[as] as (typeof tags)["div"];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={groupVariants(stagger, delay)}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "figure";
  delay?: number;
}) {
  const Comp = tags[as] as (typeof tags)["div"];
  return (
    <Comp className={cn("reveal", className)} variants={itemVariants(delay)}>
      {children}
    </Comp>
  );
}
