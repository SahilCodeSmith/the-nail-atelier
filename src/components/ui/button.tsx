import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-xs font-sans font-medium leading-none transition-[background-color,color,border-color,transform] duration-200 ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97] motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-bone hover:bg-[#241f1a] active:bg-[#120f0d] focus-visible:outline-ink",
        onDark:
          "bg-bone text-ink hover:bg-white active:bg-mist focus-visible:outline-champagne-light",
        secondary:
          "border border-ink text-ink hover:border-lacquer hover:text-lacquer hover:bg-lacquer-tint/40 focus-visible:outline-ink",
        secondaryOnDark:
          "border border-bone/70 text-bone hover:border-champagne-light hover:text-champagne-light focus-visible:outline-champagne-light",
        ghost:
          "text-ink hover:text-lacquer focus-visible:outline-ink",
        link:
          "h-auto px-0 py-0 text-ink underline decoration-sand underline-offset-[6px] transition-colors hover:decoration-lacquer hover:text-lacquer focus-visible:outline-ink",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-8 text-[0.9375rem]",
        lg: "h-14 px-10 text-base",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", class: "h-auto px-0" },
      { variant: "link", size: "md", class: "h-auto px-0" },
      { variant: "link", size: "lg", class: "h-auto px-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Show a trailing arrow that slides on hover. */
  arrow?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      arrow = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const content = (
      <>
        {loading && (
          <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
        )}
        <span>{children}</span>
        {arrow && !loading && (
          <ArrowRight
            className="size-4 transition-transform duration-200 ease-standard group-hover/btn:translate-x-1.5 motion-reduce:transition-none"
            aria-hidden
          />
        )}
      </>
    );
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (children as React.ReactElement) : content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

/* -------------------------------------------------------------------------- */

import Link from "next/link";

export interface ButtonLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
  arrow?: boolean;
}

/** A Next.js link styled as a button, with the hover-arrow affordance. */
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, arrow = false, children, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn("group/btn", buttonVariants({ variant, size }), className)}
      {...props}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform duration-200 ease-standard group-hover/btn:translate-x-1.5 motion-reduce:transition-none"
          aria-hidden
        />
      )}
    </Link>
  ),
);
ButtonLink.displayName = "ButtonLink";

export { buttonVariants };
