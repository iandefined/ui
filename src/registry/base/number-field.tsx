"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import * as React from "react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

type NumberFieldSize = "sm" | "default" | "lg";

interface NumberFieldContextValue {
  size: NumberFieldSize;
}

const NumberFieldContext = React.createContext<NumberFieldContextValue>({
  size: "default",
});

const numberFieldGroupVariants = tv({
  base: "relative flex h-9 w-full rounded-lg border border-input bg-background text-sm shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid transition-[border-color,outline-width,outline-offset,outline-color] duration-100 ease-out focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring/50 data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 focus-within:data-invalid:outline-destructive/50 data-disabled:pointer-events-none data-disabled:opacity-64 dark:bg-input/32",
  variants: {
    size: {
      sm: "h-8",
      default: "",
      lg: "h-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const numberFieldInputVariants = tv({
  base: "h-full flex-1 w-full min-w-0 bg-transparent text-center outline-none tabular-nums",
  variants: {
    size: {
      sm: "px-2 py-1 text-xs sm:text-sm",
      default: "px-3 py-1.5 text-sm",
      lg: "px-3 py-2 text-base sm:text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const numberFieldButtonVariants = tv({
  base: "flex h-full shrink-0 cursor-pointer items-center justify-center transition-colors hover:bg-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-64",
  variants: {
    size: {
      sm: "px-2.5",
      default: "px-3",
      lg: "px-3.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface NumberFieldProps extends Omit<
  React.ComponentProps<typeof NumberFieldPrimitive.Root>,
  "size"
> {
  size?: NumberFieldSize | number;
}

const NumberField = ({
  className,
  size = "default",
  ...props
}: NumberFieldProps) => {
  const resolvedSize: NumberFieldSize =
    typeof size === "number" ? "default" : size;

  return (
    <NumberFieldContext.Provider value={{ size: resolvedSize }}>
      <NumberFieldPrimitive.Root
        data-slot="number-field"
        data-size={resolvedSize}
        className={cn(
          "flex w-full max-w-[200px] flex-col items-start gap-2",
          className
        )}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
};

export interface NumberFieldGroupProps extends Omit<
  React.ComponentProps<typeof NumberFieldPrimitive.Group>,
  "size"
> {
  size?: NumberFieldSize | number;
}

const NumberFieldGroup = ({
  className,
  size: sizeProp,
  ...props
}: NumberFieldGroupProps) => {
  const context = React.useContext(NumberFieldContext);
  const size: NumberFieldSize =
    sizeProp !== undefined
      ? typeof sizeProp === "number"
        ? "default"
        : sizeProp
      : context.size;

  return (
    <NumberFieldContext.Provider value={{ size }}>
      <NumberFieldPrimitive.Group
        data-slot="number-field-group"
        data-size={size}
        className={cn(numberFieldGroupVariants({ size }), className)}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
};

export interface NumberFieldInputProps extends Omit<
  React.ComponentProps<typeof NumberFieldPrimitive.Input>,
  "size"
> {
  size?: NumberFieldSize | number;
}

const NumberFieldInput = ({
  className,
  size: sizeProp,
  ...props
}: NumberFieldInputProps) => {
  const context = React.useContext(NumberFieldContext);
  const size: NumberFieldSize =
    sizeProp !== undefined
      ? typeof sizeProp === "number"
        ? "default"
        : sizeProp
      : context.size;

  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      data-size={size}
      className={cn(numberFieldInputVariants({ size }), className)}
      {...props}
    />
  );
};

export interface NumberFieldButtonProps extends Omit<
  React.ComponentProps<typeof NumberFieldPrimitive.Decrement>,
  "size"
> {
  size?: NumberFieldSize | number;
}

const NumberFieldDecrement = ({
  className,
  children,
  size: sizeProp,
  ...props
}: NumberFieldButtonProps) => {
  const context = React.useContext(NumberFieldContext);
  const size: NumberFieldSize =
    sizeProp !== undefined
      ? typeof sizeProp === "number"
        ? "default"
        : sizeProp
      : context.size;

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      data-size={size}
      className={cn(
        numberFieldButtonVariants({ size }),
        "rounded-s-lg",
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
};

const NumberFieldIncrement = ({
  className,
  children,
  size: sizeProp,
  ...props
}: NumberFieldButtonProps) => {
  const context = React.useContext(NumberFieldContext);
  const size: NumberFieldSize =
    sizeProp !== undefined
      ? typeof sizeProp === "number"
        ? "default"
        : sizeProp
      : context.size;

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      data-size={size}
      className={cn(
        numberFieldButtonVariants({ size }),
        "rounded-e-lg",
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
};

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
  numberFieldButtonVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
};
export type { NumberFieldSize };
