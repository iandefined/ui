"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import type React from "react";

type ShimmerDirection = "normal" | "reverse";
type ShimmerRepeat = "infinite" | "once";

type ShimmerProps = useRender.ComponentProps<"span"> & {
  /**
   * Custom highlight color for the shimmer sweep.
   * Can be a hex color, CSS variable, or Tailwind color token (e.g. "sky-400", "blue-500/60").
   * Defaults to a semi-transparent tint derived from currentColor.
   */
  color?: string;
  /**
   * Base color of the text underneath the shimmer sweep.
   * Defaults to currentColor.
   */
  baseColor?: string;
  /**
   * Duration of one complete shimmer sweep.
   * Can be a number in milliseconds (e.g. 2000) or a CSS time string (e.g. "2s").
   * Defaults to "2s".
   */
  duration?: number | string;
  /**
   * Spread width of the shimmer highlight.
   * Can be a number (multiplied by 4px) or a CSS length (e.g. "5rem", "60px").
   * Defaults to "calc(3ch + 40px)".
   */
  spread?: number | string;
  /**
   * Angle of the shimmer gradient in degrees.
   * Can be a number (e.g. 20, 45) or a CSS angle string (e.g. "20deg").
   * Defaults to 20.
   */
  angle?: number | string;
  /**
   * Direction of the shimmer animation sweep.
   * Defaults to "normal".
   */
  direction?: ShimmerDirection;
  /**
   * Number of times the shimmer animation repeats.
   * Defaults to "infinite".
   */
  repeat?: ShimmerRepeat;
  /**
   * Shorthand to reverse the sweep direction.
   */
  reverse?: boolean;
  /**
   * Shorthand to run the animation only once.
   */
  once?: boolean;
  /**
   * Disables the shimmer animation and restores solid text color.
   */
  disabled?: boolean;
};

function resolveColor(value?: string): string | undefined {
  if (!value) return undefined;
  if (
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl") ||
    value.startsWith("oklch") ||
    value.startsWith("var(")
  ) {
    return value;
  }
  const opacityMatch = value.match(/^([a-z]+-\d+)\/(\d+)$/);
  if (opacityMatch) {
    return `color-mix(in srgb, var(--color-${opacityMatch[1]}) ${opacityMatch[2]}%, transparent)`;
  }
  if (/^[a-z]+-\d+$/.test(value)) {
    return `var(--color-${value})`;
  }
  return value;
}

function Shimmer({
  className,
  color,
  baseColor,
  duration,
  spread,
  angle,
  direction = "normal",
  repeat = "infinite",
  reverse,
  once,
  disabled = false,
  render,
  style,
  children,
  ...props
}: ShimmerProps): React.ReactElement {
  const isReverse = reverse || direction === "reverse";
  const isOnce = once || repeat === "once";
  const resolvedDuration =
    typeof duration === "number" ? `${duration}ms` : duration;
  const resolvedAngle = typeof angle === "number" ? `${angle}deg` : angle;
  const resolvedSpread =
    typeof spread === "number" ? `${spread * 4}px` : spread;
  const resolvedHighlight = resolveColor(color);
  const resolvedBase = resolveColor(baseColor);

  const shimmerStyle: Record<string, string | number | undefined> = {
    ...style,
    ...(resolvedHighlight
      ? { "--shimmer-color": resolvedHighlight }
      : undefined),
    ...(resolvedBase ? { "--shimmer-base": resolvedBase } : undefined),
    ...(resolvedDuration
      ? { "--shimmer-duration": resolvedDuration }
      : undefined),
    ...(resolvedAngle ? { "--shimmer-angle": resolvedAngle } : undefined),
    ...(resolvedSpread ? { "--shimmer-spread": resolvedSpread } : undefined),
    ...(isReverse ? { animationDirection: "reverse" } : undefined),
    ...(isOnce ? { animationIterationCount: 1 } : undefined),
    ...(disabled
      ? {
          "--shimmer-image": "none",
          "--shimmer-text-fill": "currentColor",
          animation: "none",
        }
      : undefined),
  };

  const defaultProps = {
    className: cn("relative inline-block", className),
    "data-disabled": disabled ? "" : undefined,
    "data-slot": "shimmer",
    style: shimmerStyle as React.CSSProperties,
    children: (
      <>
        {children}
        <style>{`
@keyframes tw-shimmer {
  0% { background-position: 100% 100%; }
  100% { background-position: 0 0; }
}
[data-slot="shimmer"] {
  --_spread: var(--shimmer-spread, calc(3ch + 40px));
  --_base: var(--shimmer-base, currentColor);
  --_highlight: var(--shimmer-color, color-mix(in oklab, currentColor 20%, transparent));
  background-image: var(
    --shimmer-image,
    linear-gradient(
      calc(90deg + var(--shimmer-angle, 20deg)),
      var(--_base) calc(50% - var(--_spread)),
      var(--_highlight) calc(50% - var(--_spread) * 0.5),
      var(--_highlight) 50%,
      var(--_highlight) calc(50% + var(--_spread) * 0.5),
      var(--_base) calc(50% + var(--_spread))
    )
  );
  background-repeat: no-repeat;
  /* Oversize both axes so angled gradients can sweep vertically as well. */
  background-size: calc(200% + var(--_spread) * 2) calc(200% + var(--_spread) * 2);
  -webkit-text-fill-color: var(--shimmer-text-fill, transparent);
  animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;
  background-position: 0 0;
  -webkit-background-clip: text;
  background-clip: text;
}
[dir="rtl"] [data-slot="shimmer"], [dir="rtl"] [data-slot="shimmer"] * {
  animation-direction: reverse;
}
@media (prefers-reduced-motion: reduce) {
  [data-slot="shimmer"] {
    -webkit-text-fill-color: currentColor !important;
    background-image: none !important;
    animation: none !important;
  }
}
`}</style>
      </>
    ),
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

export { Shimmer };
export type { ShimmerDirection, ShimmerProps, ShimmerRepeat };
