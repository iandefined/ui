"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";

import { cn } from "@/lib/utils";

const NumberField = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Root>) => (
  <NumberFieldPrimitive.Root
    data-slot="number-field"
    className={cn(
      "flex w-full max-w-[200px] flex-col items-start gap-2",
      className
    )}
    {...props}
  />
);

const NumberFieldGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Group>) => (
  <NumberFieldPrimitive.Group
    data-slot="number-field-group"
    className={cn(
      "relative flex w-full rounded-lg border border-input bg-background text-sm shadow-xs transition-colors focus-within:border-ring focus-within:ring-[1px] focus-within:ring-ring data-disabled:pointer-events-none data-disabled:opacity-64 dark:bg-input/32",
      className
    )}
    {...props}
  />
);

const NumberFieldInput = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Input>) => (
  <NumberFieldPrimitive.Input
    data-slot="number-field-input"
    className={cn(
      "flex-1 w-full min-w-0 bg-transparent px-3 py-1.5 text-center outline-none tabular-nums",
      className
    )}
    {...props}
  />
);

const NumberFieldDecrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Decrement>) => (
  <NumberFieldPrimitive.Decrement
    data-slot="number-field-decrement"
    className={cn(
      "flex shrink-0 cursor-pointer items-center justify-center rounded-s-lg px-3 transition-colors hover:bg-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-64",
      className
    )}
    {...props}
  >
    {children ?? (
      <svg
        aria-hidden="true"
        fill="none"
        height="10"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 10 10"
        width="10"
      >
        <path d="M0 5H10" />
      </svg>
    )}
  </NumberFieldPrimitive.Decrement>
);

const NumberFieldIncrement = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Increment>) => (
  <NumberFieldPrimitive.Increment
    data-slot="number-field-increment"
    className={cn(
      "flex shrink-0 cursor-pointer items-center justify-center rounded-e-lg px-3 transition-colors hover:bg-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-64",
      className
    )}
    {...props}
  >
    {children ?? (
      <svg
        aria-hidden="true"
        fill="none"
        height="10"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 10 10"
        width="10"
      >
        <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
      </svg>
    )}
  </NumberFieldPrimitive.Increment>
);

const NumberFieldScrubArea = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubArea>) => (
  <NumberFieldPrimitive.ScrubArea
    data-slot="number-field-scrub-area"
    className={cn("flex cursor-ew-resize", className)}
    {...props}
  />
);

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
};
