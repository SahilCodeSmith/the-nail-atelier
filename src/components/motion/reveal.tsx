import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Layout wrappers. The site is deliberately restrained — content renders
 * immediately with no entrance animation. These remain as semantic grouping
 * hooks and to keep call sites stable.
 */

type Tag = "div" | "section" | "li" | "span" | "figure" | "ul" | "ol";

export function Reveal({
  children,
  className,
  as: Comp = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  style?: React.CSSProperties;
}) {
  return (
    <Comp className={className} style={style}>
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: Tag;
}) {
  return <Comp className={className}>{children}</Comp>;
}

export function RevealItem({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "figure";
  delay?: number;
}) {
  return <Comp className={cn(className)}>{children}</Comp>;
}
