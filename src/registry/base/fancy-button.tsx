"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import type { CSSProperties, ReactNode } from "react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

type FancyButtonSize =
  | "xs"
  | "sm"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

const fancyButtonVariants = tv({
  base: [
    "relative isolate inline-flex w-fit shrink-0 touch-none cursor-pointer items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium text-white outline-hidden transform-gpu",
    "[transition:scale_100ms,box-shadow_200ms,opacity_200ms,--tw-gradient-from_200ms,--tw-gradient-to_200ms] motion-reduce:transform-none active:scale-98",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-secondary-foreground",
    "disabled:pointer-events-none disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_[data-slot=fancy-button-section]]:flex [&_[data-slot=fancy-button-section]]:shrink-0 [&_[data-slot=fancy-button-section]]:items-center [&_[data-slot=fancy-button-section]]:justify-center",
  ],
  variants: {
    appearance: {
      default: [
        "bg-linear-to-b from-[oklch(0.36_0_0)] to-[oklch(0.27_0_0)] ring-1 ring-[oklch(0.15_0_0)]",
        "shadow-[inset_0_1px_1px_oklch(1_0_0_/_0.22),0_1px_2px_oklch(0.1_0_0_/_0.1),inset_0_-1px_1px_oklch(0_0_0_/_0.16)]",
        "hover:from-[oklch(0.4_0_0)] hover:to-[oklch(0.3_0_0)]",
        "dark:from-[oklch(0.25_0_0)] dark:to-[oklch(0.17_0_0)] dark:hover:from-[oklch(0.29_0_0)] dark:hover:to-[oklch(0.2_0_0)]",
      ],
      custom: [
        "bg-linear-to-b from-[var(--fancy-button-from)] to-[var(--fancy-button-to)] ring-1 ring-[var(--fancy-button-ring)] hover:opacity-90",
        "shadow-[inset_0_1px_1px_oklch(1_0_0_/_0.4),0_1px_2px_oklch(0.1_0_0_/_0.1),inset_0_-1px_1px_oklch(0_0_0_/_0.15)]",
      ],
    },
    size: {
      xs: "h-6 gap-1 px-2 text-xs has-[>[data-slot=fancy-button-section]]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 gap-1.5 px-3 has-[>[data-slot=fancy-button-section]]:px-2.5",
      default: "h-9 gap-1.5 px-4 has-[>[data-slot=fancy-button-section]]:px-3",
      lg: "h-10 gap-1.5 px-6 has-[>[data-slot=fancy-button-section]]:px-4",
      "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
      icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
      "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "default",
  },
});

type FancyButtonStyle = CSSProperties & {
  "--fancy-button-from"?: string;
  "--fancy-button-ring"?: string;
  "--fancy-button-to"?: string;
};

type FancyButtonProps = Omit<BaseButtonProps, "style"> & {
  /** CSS color used to generate the glossy gradient and ring. */
  color?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  size?: FancyButtonSize;
  style?: FancyButtonStyle;
};

function FancyButton({
  children,
  className,
  color,
  leftSection,
  rightSection,
  size = "default",
  style,
  ...props
}: FancyButtonProps) {
  const appearance = color ? "custom" : "default";
  const colorStyle: FancyButtonStyle | undefined = color
    ? {
        "--fancy-button-from": `color-mix(in oklch, ${color}, white 6%)`,
        "--fancy-button-ring": `color-mix(in oklch, ${color}, black 18%)`,
        "--fancy-button-to": `color-mix(in oklch, ${color}, black 12%)`,
      }
    : undefined;

  return (
    <BaseButton
      className={cn(fancyButtonVariants({ appearance, size }), className)}
      data-appearance={appearance}
      data-size={size}
      data-slot="fancy-button"
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {leftSection && (
        <span data-slot="fancy-button-section">{leftSection}</span>
      )}
      {children}
      {rightSection && (
        <span data-slot="fancy-button-section">{rightSection}</span>
      )}
    </BaseButton>
  );
}

export { FancyButton, fancyButtonVariants };
export type { FancyButtonProps, FancyButtonSize };
