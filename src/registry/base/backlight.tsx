"use client";

import { useId } from "react";
import { Children, cloneElement, isValidElement } from "react";
import type React from "react";

type BacklightProps = React.ComponentProps<"div"> & {
  /**
   * Blur intensity used by the SVG filter.
   * @default 10
   */
  blur?: number;
};

function Backlight({ blur = 10, children, ...props }: BacklightProps) {
  const filterId = `backlight-${useId().replaceAll(":", "")}`;
  const filterStyle = { filter: `url(#${filterId})` };
  const child = Children.toArray(children);
  const content =
    child.length === 1 &&
    isValidElement<{ style?: React.CSSProperties }>(child[0]) &&
    typeof child[0].type === "string" ? (
      cloneElement(child[0], {
        style: { ...child[0].props.style, ...filterStyle },
      })
    ) : (
      <div style={filterStyle}>{children}</div>
    );

  return (
    <div {...props} data-slot="backlight">
      <svg
        aria-hidden="true"
        focusable="false"
        height="0"
        width="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter height="200%" id={filterId} width="200%" x="-50%" y="-50%">
          <feGaussianBlur
            in="SourceGraphic"
            result="blurred"
            stdDeviation={blur}
          />
          <feColorMatrix in="blurred" type="saturate" values="4" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>
      {content}
    </div>
  );
}

export { Backlight };
export type { BacklightProps };
