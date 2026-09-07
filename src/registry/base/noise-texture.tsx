"use client";

import { cn } from "cn";
import { useId } from "react";
import type React from "react";

type NoiseTextureProps = React.ComponentProps<"svg"> & {
  /**
   * Base frequency for `feTurbulence`. Higher values yield finer-grained noise.
   * @default 0.4
   */
  frequency?: number;
  /**
   * Number of octaves for `feTurbulence`. More octaves add detail at smaller scales.
   * @default 6
   */
  octaves?: number;
  /**
   * Linear slope on each RGB channel after desaturation; adjusts the contrast of the noise.
   * @default 0.15
   */
  slope?: number;
  /**
   * Opacity of the filled noise `rect` layer inside the SVG.
   * @default 0.6
   */
  noiseOpacity?: number;
};

function NoiseTexture({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps): React.ReactElement {
  const reactId = useId();
  const filterId = `noise-${reactId.replaceAll(":", "")}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 size-full select-none",
        className
      )}
      data-slot="noise-texture"
      tabIndex={-1}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <filter id={filterId}>
        <feTurbulence
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
          type="fractalNoise"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR slope={slope} type="linear" />
          <feFuncG slope={slope} type="linear" />
          <feFuncB slope={slope} type="linear" />
        </feComponentTransfer>
      </filter>
      <rect
        filter={`url(#${filterId})`}
        height="100%"
        opacity={noiseOpacity}
        width="100%"
      />
    </svg>
  );
}

export { NoiseTexture };
export type { NoiseTextureProps };
