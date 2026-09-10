"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import type React from "react";

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

const badgeColorForegrounds = {
  gray: { light: "var(--foreground)", dark: "var(--foreground)" },
  red: { light: "var(--color-red-700)", dark: "var(--color-red-400)" },
  orange: {
    light: "var(--color-orange-700)",
    dark: "var(--color-orange-400)",
  },
  amber: {
    light: "var(--color-amber-700)",
    dark: "var(--color-amber-400)",
  },
  yellow: {
    light: "var(--color-yellow-700)",
    dark: "var(--color-yellow-400)",
  },
  lime: { light: "var(--color-lime-700)", dark: "var(--color-lime-400)" },
  green: {
    light: "var(--color-green-700)",
    dark: "var(--color-green-400)",
  },
  emerald: {
    light: "var(--color-emerald-700)",
    dark: "var(--color-emerald-400)",
  },
  teal: { light: "var(--color-teal-700)", dark: "var(--color-teal-400)" },
  cyan: { light: "var(--color-cyan-700)", dark: "var(--color-cyan-400)" },
  blue: { light: "var(--color-blue-700)", dark: "var(--color-blue-400)" },
  indigo: {
    light: "var(--color-indigo-700)",
    dark: "var(--color-indigo-400)",
  },
  violet: {
    light: "var(--color-violet-700)",
    dark: "var(--color-violet-400)",
  },
  purple: {
    light: "var(--color-purple-700)",
    dark: "var(--color-purple-400)",
  },
  fuchsia: {
    light: "var(--color-fuchsia-700)",
    dark: "var(--color-fuchsia-400)",
  },
  pink: { light: "var(--color-pink-700)", dark: "var(--color-pink-400)" },
  rose: { light: "var(--color-rose-700)", dark: "var(--color-rose-400)" },
} as const satisfies Record<
  keyof typeof badgeColors,
  { light: string; dark: string }
>;

const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border font-medium outline-none transition-[background-color,box-shadow,color] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background forced-colors:focus-visible:outline-[Highlight] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3 [a&,button&]:cursor-pointer",
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
        translucent:
          "[color:var(--badge-color-foreground)] dark:[color:var(--badge-color-foreground-dark)]",
      },
      size: {
        default: "h-6 min-w-6 text-xs",
        compact: "h-5 min-w-5 gap-1 text-[11px]",
      },
      depth: {
        none: "",
        subtle:
          "shadow-[inset_0_1px_0_var(--badge-highlight)] dark:shadow-[inset_0_1px_0_var(--badge-highlight-dark)]",
      },
    },
    compoundVariants: [
      {
        depth: "none",
        variant: [
          "default",
          "secondary",
          "destructive",
          "error",
          "info",
          "success",
          "warning",
          "translucent",
        ],
        className: "border-transparent",
      },
      {
        depth: "subtle",
        variant: [
          "default",
          "secondary",
          "destructive",
          "error",
          "info",
          "success",
          "warning",
          "translucent",
        ],
        className:
          "[border-color:var(--badge-border)] dark:[border-color:var(--badge-border-dark)]",
      },
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
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      depth: "subtle",
    },
  }
);

type BadgeStyle = React.CSSProperties & {
  "--badge-border"?: string;
  "--badge-border-dark"?: string;
  "--badge-color"?: string;
  "--badge-color-foreground"?: string;
  "--badge-color-foreground-dark"?: string;
  "--badge-highlight"?: string;
  "--badge-highlight-dark"?: string;
};

type BadgeBaseProps = Omit<
  useRender.ComponentProps<"span">,
  "color" | "style"
> & {
  depth?: "none" | "subtle";
  size?: "default" | "compact";
  style?: BadgeStyle;
};

type SemanticBadgeProps = BadgeBaseProps & {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "error"
    | "info"
    | "success"
    | "warning";
  color?: never;
};

type PaletteBadgeProps = BadgeBaseProps & {
  variant: "translucent";
  color?: keyof typeof badgeColors;
};

type BadgeProps = SemanticBadgeProps | PaletteBadgeProps;
type BadgeColor = NonNullable<BadgeProps["color"]>;
type BadgeVariant = NonNullable<BadgeProps["variant"]>;
type BadgeSize = NonNullable<BadgeProps["size"]>;
type BadgeDepth = NonNullable<BadgeProps["depth"]>;

function Badge({
  className,
  depth = "subtle",
  variant = "default",
  size = "default",
  color,
  render,
  style,
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const isPaletteVariant = variant === "translucent";
  const resolvedColor = color ?? "gray";
  const badgeSurface =
    resolvedColor === "gray"
      ? "var(--muted)"
      : `color-mix(in srgb, ${badgeColors[resolvedColor]} 15%, var(--background))`;
  const badgeStyle: BadgeStyle = {
    "--badge-border":
      "color-mix(in oklab, var(--badge-color, var(--foreground)) 4%, transparent)",
    "--badge-border-dark":
      "color-mix(in oklab, var(--badge-color, var(--foreground)) 4%, transparent)",
    "--badge-highlight":
      "color-mix(in oklab, var(--background) 34%, transparent)",
    "--badge-highlight-dark":
      "color-mix(in oklab, var(--foreground) 22%, transparent)",
    ...(variant === "translucent"
      ? {
          "--badge-color": badgeColors[resolvedColor],
          "--badge-color-foreground":
            badgeColorForegrounds[resolvedColor].light,
          "--badge-color-foreground-dark":
            badgeColorForegrounds[resolvedColor].dark,
          backgroundColor: badgeSurface,
          ...(depth === "subtle"
            ? {
                borderColor: "transparent",
                background: `linear-gradient(${badgeSurface}, ${badgeSurface}) padding-box, linear-gradient(to top, color-mix(in oklab, ${badgeColors[resolvedColor]} 18%, ${badgeSurface}), color-mix(in oklab, ${badgeColors[resolvedColor]} 8%, ${badgeSurface})) border-box`,
              }
            : {}),
        }
      : {}),
  };

  const defaultProps = {
    className: cn(badgeVariants({ depth, variant, size }), className),
    "data-color": isPaletteVariant ? resolvedColor : undefined,
    "data-depth": depth,
    "data-size": size,
    "data-slot": "badge",
    "data-variant": variant,
    style: { ...badgeStyle, ...style },
    children,
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

export { Badge, badgeColors, badgeVariants };
export type { BadgeColor, BadgeDepth, BadgeProps, BadgeSize, BadgeVariant };
