"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "@/lib/utils";

const badgeColors = {
  gray: "var(--muted-foreground)",
  red: "var(--color-red-500)",
  orange: "var(--color-orange-500)",
  amber: "var(--color-amber-500)",
  yellow: "var(--color-yellow-500)",
  lime: "var(--color-lime-500)",
  green: "var(--color-green-500)",
  emerald: "var(--color-emerald-500)",
  teal: "var(--color-teal-500)",
  cyan: "var(--color-cyan-500)",
  blue: "var(--color-blue-500)",
  indigo: "var(--color-indigo-500)",
  violet: "var(--color-violet-500)",
  purple: "var(--color-purple-500)",
  fuchsia: "var(--color-fuchsia-500)",
  pink: "var(--color-pink-500)",
  rose: "var(--color-rose-500)",
} as const;

const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent font-medium outline-none transition-[background-color,box-shadow,color] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3 [a&,button&]:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&,button&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&,button&]:hover:bg-secondary/90",
        outline:
          "border-border bg-background text-foreground [a&,button&]:hover:bg-accent [a&,button&]:hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground [a&,button&]:hover:bg-destructive/90",
        error: "bg-error/8 text-error-foreground dark:bg-error/16",
        info: "bg-info/8 text-info-foreground dark:bg-info/16",
        success: "bg-success/8 text-success-foreground dark:bg-success/16",
        warning: "bg-warning/8 text-warning-foreground dark:bg-warning/16",
        translucent: "text-foreground",
        dot: "border-border bg-background text-foreground",
      },
      size: {
        default: "h-6 min-w-6 text-xs",
        compact: "h-5 min-w-5 gap-1 text-[11px]",
      },
    },
    compoundVariants: [
      {
        variant: [
          "default",
          "secondary",
          "outline",
          "destructive",
          "error",
          "info",
          "success",
          "warning",
          "translucent",
        ],
        className: "px-2",
      },
      {
        variant: "dot",
        className: "px-1.5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type BadgeColor = keyof typeof badgeColors;
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
type BadgeSize = VariantProps<typeof badgeVariants>["size"];
type BadgeBaseProps = Omit<useRender.ComponentProps<"span">, "color"> & {
  size?: BadgeSize;
};

type SemanticBadgeProps = BadgeBaseProps & {
  variant?: Exclude<BadgeVariant, "translucent" | "dot">;
  color?: never;
};

type PaletteBadgeProps = BadgeBaseProps & {
  variant: Extract<BadgeVariant, "translucent" | "dot">;
  color?: BadgeColor;
};

type BadgeProps = SemanticBadgeProps | PaletteBadgeProps;

function Badge({
  className,
  variant = "default",
  size = "default",
  color,
  render,
  style,
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const isPaletteVariant = variant === "translucent" || variant === "dot";
  const resolvedColor = color ?? "gray";
  const badgeStyle =
    variant === "translucent"
      ? resolvedColor === "gray"
        ? { backgroundColor: "var(--muted)" }
        : {
            backgroundColor: `color-mix(in srgb, ${badgeColors[resolvedColor]} 15%, var(--background))`,
          }
      : undefined;

  const defaultProps = {
    className: cn(badgeVariants({ variant, size }), className),
    "data-color": isPaletteVariant ? resolvedColor : undefined,
    "data-slot": "badge",
    "data-variant": variant,
    style: { ...badgeStyle, ...style },
    children: (
      <>
        {variant === "dot" && (
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 rounded-full",
              size === "compact" ? "size-1" : "size-1.5"
            )}
            style={{ backgroundColor: badgeColors[resolvedColor] }}
          />
        )}
        {children}
      </>
    ),
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

export { Badge, badgeColors, badgeVariants };
export type { BadgeColor, BadgeProps, BadgeVariant };
