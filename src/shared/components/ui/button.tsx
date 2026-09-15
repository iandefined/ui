"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import { cn } from "cn";
import type { CSSProperties, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonMix =
  "[--button-fg:currentColor] [--button-mix-amount:0%] [background-color:color-mix(in_oklch,var(--button-bg),var(--button-fg)_var(--button-mix-amount))] hover:[--button-mix-amount:10%] active:[--button-mix-amount:20%] data-pressed:[--button-mix-amount:20%]";

const buttonVariants = tv({
  base: [
    "group relative isolate inline-flex w-fit shrink-0 touch-manipulation cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-sm outline-hidden transform-gpu motion-reduce:transform-none",
    "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-secondary-foreground",
    "disabled:pointer-events-none disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60",
    "[transition:scale_100ms,box-shadow_200ms,background-color_200ms,opacity_200ms,--button-mix-amount_200ms,width_200ms] [transition-timing-function:cubic-bezier(.6,.04,.98,.335)] will-change-transform motion-reduce:transition-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-98",
    "[&_[data-slot=button-section]]:flex [&_[data-slot=button-section]]:shrink-0 [&_[data-slot=button-section]]:items-center [&_[data-slot=button-section]]:justify-center",
  ],
  variants: {
    variant: {
      default:
        "[--button-bg:var(--primary)] font-medium text-primary-foreground",
      secondary:
        "[--button-bg:var(--secondary)] border-secondary text-secondary-foreground",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      ghost:
        "text-primary hover:bg-primary/10 focus-vislbe:bg-primary/10 focus-visible:border-primary/25",
      link: "text-primary hover:underline hover:underline-offset-4 hover:decoration-1 focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-1",
      destructive:
        "[--button-bg:var(--destructive)] text-destructive-foreground focus-visible:border-destructive focus-visible:ring-destructive",
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
    { variant: "default", class: buttonMix },
    { variant: "secondary", class: buttonMix },
    { variant: "destructive", class: buttonMix },
    {
      variant: "default",
      customColor: false,
      class: [
        "ring-1 ring-[oklch(0.15_0_0)]",
        "shadow-[inset_0_1px_1px_oklch(1_0_0_/_0.22),0_1px_2px_oklch(0.1_0_0_/_0.1),inset_0_-1px_1px_oklch(0_0_0_/_0.16)]",
      ],
    },
    {
      variant: "default",
      customColor: true,
      class: [
        "ring-1 ring-[var(--button-ring)]",
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
  "--button-bg"?: string;
  "--button-fg"?: string;
  "--button-mix-amount"?: string;
  "--button-ring"?: string;
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
        /** CSS color used as the default variant's background color. */
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
        "--button-bg": color,
        "--button-ring": `color-mix(in oklch, ${color}, black 18%)`,
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
