"use client";

import { Calligraph, type CalligraphProps } from "calligraph";

type TextMorphProps = CalligraphProps;

/**
 * The registry's standard animated-text primitive.
 *
 * Calligraph handles grapheme-aware text transitions and, by default, measures
 * the natural inner width while animating a separate outer wrapper to that
 * measured width.
 */
function TextMorph({ children, autoSize = true, ...props }: TextMorphProps) {
  const accessibleLabel = props["aria-label"] ?? String(children ?? "");

  return (
    <Calligraph
      {...props}
      aria-label={accessibleLabel}
      autoSize={autoSize}
      data-slot="text-morph"
    >
      {children}
    </Calligraph>
  );
}

export { TextMorph, type TextMorphProps };
