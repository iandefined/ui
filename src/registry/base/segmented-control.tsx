"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "cn";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type RefObject,
} from "react";

const invalidShakeStyles = `
  @keyframes iandefined-invalid-shake-replay {
    0% { transform: translateX(0); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
    28.57% { transform: translateX(6px); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
    57.14% { transform: translateX(-6px); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
    78.57% { transform: translateX(4px); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
    100% { transform: translateX(0); }
  }
  [data-invalid-shake="owner"] {
    animation-duration: 280ms;
    animation-timing-function: linear;
  }
  [data-invalid-shake="owner"].is-shaking[aria-invalid="true"],
  [data-invalid-shake="owner"].is-shaking[data-invalid],
  [data-invalid-shake="owner"].is-shaking:has([aria-invalid="true"]),
  [data-invalid-shake="owner"].is-shaking:has([data-invalid]) {
    animation-name: iandefined-invalid-shake-replay;
    will-change: transform;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-invalid-shake="owner"] {
      animation: none !important;
      transform: none !important;
    }
  }
`;

const segmentedControlItemSizeClasses = {
  sm: "h-[22px] px-3 text-sm",
  default: "h-[26px] px-3 text-sm",
  lg: "h-[30px] px-3 text-sm",
} as const;

const segmentedControlSizeClasses = {
  sm: "h-8",
  default: "h-9",
  lg: "h-10",
} as const;

export interface SegmentedControlProps<
  Value = string,
> extends RadioGroupPrimitive.Props<Value> {
  invalid?: boolean;
  size?: "sm" | "default" | "lg";
}

export interface SegmentedControlItemProps<
  Value = string,
> extends RadioPrimitive.Root.Props<Value> {
  size?: "sm" | "default" | "lg";
}

export type SegmentedControlSize = NonNullable<SegmentedControlProps["size"]>;

interface SegmentedControlContextValue {
  size: SegmentedControlSize;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue>({
  size: "default",
});

function useSegmentedControlIndicator(
  rootRef: RefObject<HTMLDivElement | null>
) {
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const indicator = indicatorRef.current;

    if (!root || !indicator) {
      return;
    }

    let frame: number | undefined;

    const updateIndicator = () => {
      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        frame = undefined;

        const selectedItem = root.querySelector<HTMLElement>(
          '[data-slot="segmented-control-item"][data-checked]'
        );

        if (!selectedItem) {
          indicator.removeAttribute("data-ready");
          return;
        }

        const rootRect = root.getBoundingClientRect();
        const selectedRect = selectedItem.getBoundingClientRect();

        indicator.style.setProperty(
          "--active-tab-left",
          `${selectedRect.left - rootRect.left}px`
        );
        indicator.style.setProperty(
          "--active-tab-width",
          `${selectedRect.width}px`
        );
        indicator.style.setProperty(
          "--active-tab-height",
          `${selectedRect.height}px`
        );
        indicator.style.setProperty(
          "--active-tab-bottom",
          `${rootRect.bottom - selectedRect.bottom}px`
        );
        indicator.setAttribute("data-ready", "");

        root
          .querySelectorAll<HTMLElement>('[data-slot="segmented-control-item"]')
          .forEach((item) => itemResizeObserver.observe(item));
      });
    };

    const itemResizeObserver = new ResizeObserver(updateIndicator);
    const mutationObserver = new MutationObserver(updateIndicator);

    mutationObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-checked"],
      childList: true,
      subtree: true,
    });
    itemResizeObserver.observe(root);
    updateIndicator();

    return () => {
      mutationObserver.disconnect();
      itemResizeObserver.disconnect();

      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [rootRef]);

  return indicatorRef;
}

function SegmentedControl<Value = string>({
  children,
  className,
  invalid,
  size = "default",
  ...props
}: SegmentedControlProps<Value>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useSegmentedControlIndicator(rootRef);

  return (
    <>
      <style>{invalidShakeStyles}</style>
      <SegmentedControlContext.Provider value={{ size }}>
        <RadioGroupPrimitive
          className={cn(
            "relative z-0 flex max-w-full w-fit items-center justify-start gap-x-0.5 rounded-[12px] border border-transparent bg-muted p-1 text-muted-foreground shadow-[inset_0_1px_4px_rgb(0_0_0_/_0.05)] outline-0 outline-offset-0 outline-transparent outline-solid [transition-property:border-color,outline-width,outline-offset,outline-color] duration-100 ease-out dark:bg-card dark:shadow-[inset_0_1px_4px_rgb(0_0_0_/_0.14)]",
            segmentedControlSizeClasses[size],
            "data-disabled:pointer-events-none data-disabled:opacity-50",
            "aria-invalid:border-destructive aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50 data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50",
            "focus-within:aria-invalid:border-destructive focus-within:aria-invalid:outline-destructive/50 focus-within:data-invalid:border-destructive focus-within:data-invalid:outline-destructive/50",
            "motion-reduce:transition-none",
            className
          )}
          aria-invalid={invalid || undefined}
          data-invalid={invalid ? "" : undefined}
          data-invalid-shake="owner"
          data-size={size}
          data-slot="segmented-control"
          ref={rootRef}
          {...props}
        >
          {children}
          <span
            aria-hidden="true"
            className="-translate-y-(--active-tab-bottom) pointer-events-none absolute bottom-0 left-0 z-[-1] h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) rounded-md border border-transparent bg-background opacity-0 shadow-xs transition-[translate,width] duration-200 ease-[cubic-bezier(.25,.46,.45,.94)] data-[ready]:opacity-100 dark:border-border/10 dark:bg-secondary motion-reduce:transition-none motion-reduce:transform-none"
            data-slot="segmented-control-indicator"
            ref={indicatorRef}
          />
        </RadioGroupPrimitive>
      </SegmentedControlContext.Provider>
    </>
  );
}

function SegmentedControlItem<Value = string>({
  className,
  size: sizeProp,
  ...props
}: SegmentedControlItemProps<Value>) {
  const { size: contextSize } = useContext(SegmentedControlContext);
  const size = sizeProp ?? contextSize;

  return (
    <RadioPrimitive.Root
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap break-keep text-foreground dark:text-secondary-foreground/66 leading-none outline-none [transition-property:color] duration-200 ease-[cubic-bezier(.25,.46,.45,.94)] hover:text-foreground data-checked:text-foreground dark:data-checked:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 forced-colors:focus-visible:outline-[Highlight] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        "data-checked:font-medium",
        segmentedControlItemSizeClasses[size],
        className
      )}
      data-slot="segmented-control-item"
      {...props}
    />
  );
}

export { SegmentedControl, SegmentedControlItem };
