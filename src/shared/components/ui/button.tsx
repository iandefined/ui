"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import type { CSSProperties, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const buttonVariants = tv({
  base: [
    "group relative isolate inline-flex w-fit shrink-0 touch-none cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-sm outline-hidden transform-gpu motion-reduce:transform-none",
    "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-secondary-foreground",
    "disabled:pointer-events-none disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60",
    "[transition:scale_100ms,box-shadow_200ms,background_200ms,opacity_200ms,--tw-gradient-from_200ms,--tw-gradient-to_200ms,width_200ms] [transition-timing-function:cubic-bezier(.6,.04,.98,.335)] will-change-transform",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-98",
    "[&_[data-slot=button-section]]:flex [&_[data-slot=button-section]]:shrink-0 [&_[data-slot=button-section]]:items-center [&_[data-slot=button-section]]:justify-center",
  ],
  variants: {
    variant: {
      default: "bg-primary font-medium text-primary-foreground",
      secondary:
        "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 data-pressed:bg-secondary/90",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      ghost:
        "text-primary hover:bg-primary/10 focus-vislbe:bg-primary/10 focus-visible:border-primary/25",
      link: "text-primary hover:underline hover:underline-offset-4 hover:decoration-1 focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-1",
      destructive:
        "bg-destructive text-white hover:bg-destructive/90 focus-visible:border-destructive focus-visible:bg-destructive/90 focus-visible:ring-destructive bg-linear-to-t from-destructive/90 to-destructive",
    },
    size: {
      default:
        "h-9 px-4 py-2 has-[>svg]:px-3 has-[>[data-slot=button-section]]:px-3",
      xs: "h-6 gap-1 px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1)-1px)] text-xs has-[>[data-slot=button-section]]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 has-[>[data-slot=button-section]]:px-2.5",
      lg: "h-10 px-6 has-[>svg]:px-4 has-[>[data-slot=button-section]]:px-4",
      xl: "h-12 px-[calc(--spacing(4)-1px)] py-[calc(--spacing(2)-1px)] text-base has-[>[data-slot=button-section]]:px-3.5 [&_svg:not([class*='size-'])]:size-4.5",
      "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
      icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
      "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
      "icon-xl": "size-12 [&_svg:not([class*='size-'])]:size-4.5",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-lg",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    customColor: {
      false: "",
      true: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      customColor: false,
      class: [
        "bg-linear-to-b from-[color-mix(in_oklch,var(--primary),white_6%)] to-[color-mix(in_oklch,var(--primary),black_10%)] ring-1 ring-[oklch(0.15_0_0)]",
        "shadow-[inset_0_1px_1px_oklch(1_0_0_/_0.22),0_1px_2px_oklch(0.1_0_0_/_0.1),inset_0_-1px_1px_oklch(0_0_0_/_0.16)]",
        "hover:from-[color-mix(in_oklch,var(--primary),black_5%)] hover:to-[color-mix(in_oklch,var(--primary),black_16%)]",
      ],
    },
    {
      variant: "default",
      customColor: true,
      class: [
        "bg-linear-to-b from-[var(--button-from)] to-[var(--button-to)] ring-1 ring-[var(--button-ring)] hover:opacity-90",
        "shadow-[inset_0_1px_1px_oklch(1_0_0_/_0.4),0_1px_2px_oklch(0.1_0_0_/_0.1),inset_0_-1px_1px_oklch(0_0_0_/_0.15)]",
      ],
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    radius: "default",
    customColor: false,
  },
});

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;
type ButtonRadius = NonNullable<VariantProps<typeof buttonVariants>["radius"]>;

type ButtonStyle = CSSProperties & {
  "--button-from"?: string;
  "--button-ring"?: string;
  "--button-to"?: string;
};

type SharedButtonProps = Omit<BaseButtonProps, "color" | "style"> & {
  leftSection?: ReactNode;
  radius?: ButtonRadius;
  rightSection?: ReactNode;
  size?: ButtonSize;
  style?: ButtonStyle;
};

type ButtonProps = SharedButtonProps &
  (
    | {
        /** CSS color used to generate the default variant's glossy gradient. */
        color: string;
        variant?: "default";
      }
    | {
        color?: never;
        variant?: ButtonVariant;
      }
  );

function Button({
  children,
  className,
  color,
  leftSection,
  radius = "default",
  rightSection,
  size = "default",
  style,
  variant = "default",
  ...props
}: ButtonProps) {
  const hasCustomColor = variant === "default" && color !== undefined;
  const colorStyle: ButtonStyle | undefined = hasCustomColor
    ? {
        "--button-from": `color-mix(in oklch, ${color}, white 6%)`,
        "--button-ring": `color-mix(in oklch, ${color}, black 18%)`,
        "--button-to": `color-mix(in oklch, ${color}, black 12%)`,
      }
    : undefined;

  return (
    <BaseButton
      className={cn(
        buttonVariants({ customColor: hasCustomColor, radius, size, variant }),
        className
      )}
      data-color={hasCustomColor ? "custom" : undefined}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {leftSection != null && (
        <span data-slot="button-section">{leftSection}</span>
      )}
      {children}
      {rightSection != null && (
        <span data-slot="button-section">{rightSection}</span>
      )}
    </BaseButton>
  );
}

export { Button, buttonVariants };
export type { ButtonProps, ButtonRadius, ButtonSize, ButtonVariant };
