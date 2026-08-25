import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

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
  "inline-flex items-center gap-1.5 rounded-md font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        solid: "text-foreground",
        dot: "border border-border bg-background text-foreground",
      },
      size: {
        default: "h-6 px-2.5 text-xs",
        compact: "h-5 gap-1 px-2 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

type BadgeColor = keyof typeof badgeColors;

interface BadgeProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  color?: BadgeColor;
}

function Badge({
  className,
  variant = "solid",
  size = "default",
  color = "gray",
  style,
  children,
  ...props
}: BadgeProps) {
  const isSolid = variant === "solid";
  const badgeStyle = isSolid
    ? color === "gray"
      ? { backgroundColor: "var(--muted)" }
      : {
          backgroundColor: `color-mix(in srgb, ${badgeColors[color]} 15%, var(--background))`,
        }
    : undefined;

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      data-slot="badge"
      style={{ ...badgeStyle, ...style }}
      {...props}
    >
      {!isSolid && (
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 rounded-full",
            size === "compact" ? "size-1" : "size-1.5"
          )}
          style={{ backgroundColor: badgeColors[color] }}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeColors, badgeVariants };
export type { BadgeColor, BadgeProps };
