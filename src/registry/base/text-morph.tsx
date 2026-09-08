"use client";

import { Calligraph, type CalligraphProps } from "calligraph";
import { MotionConfig } from "motion/react";
import { memo } from "react";

type TextMorphProps = CalligraphProps;

/**
 * The registry's standard animated-text primitive.
 *
 * Calligraph handles grapheme-aware text transitions and, by default, measures
 * the natural inner width while animating a separate outer wrapper to that
 * measured width.
 */
const TextMorph = memo(function TextMorph({
  children,
  autoSize = true,
  ...props
}: TextMorphProps) {
  const accessibleLabel = props["aria-label"] ?? String(children ?? "");

  return (
    <MotionConfig reducedMotion="user">
      <Calligraph
        {...props}
        aria-label={accessibleLabel}
        autoSize={autoSize}
        data-slot="text-morph"
      >
        {children}
      </Calligraph>
    </MotionConfig>
  );
});

TextMorph.displayName = "TextMorph";

export { TextMorph, type TextMorphProps };
