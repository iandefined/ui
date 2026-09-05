"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { createContext, useContext, type ComponentProps } from "react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

const radioGroupStyles = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal: "flex-row flex-wrap gap-4",
      vertical: "flex-col gap-4",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const radioRootStyles = tv({
  base: [
    "group relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid transition-[outline-width,outline-offset,outline-color] duration-100 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 forced-colors:focus-visible:outline-[Highlight] aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50 data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50",
    "data-disabled:cursor-not-allowed data-disabled:scale-100 data-disabled:opacity-50 data-disabled:grayscale",
    "before:absolute before:inset-0 before:rounded-full before:border-1 before:border-border before:content-[''] aria-invalid:before:border-destructive data-invalid:before:border-destructive not-data-disabled:hover:before:bg-secondary/60",
  ],
  variants: {
    size: {
      sm: "size-4.5",
      default: "size-5",
      lg: "size-6",
    },
    reduceMotion: {
      true: "transition-none before:transition-none",
      false:
        "transition-transform before:transition-colors motion-reduce:transition-none motion-reduce:transform-none motion-reduce:before:transition-none",
    },
  },
  defaultVariants: {
    size: "default",
    reduceMotion: false,
  },
});

const radioSelectedSurfaceStyles = tv({
  base: [
    "pointer-events-none absolute inset-0 z-0 origin-center rounded-full bg-linear-to-b from-primary to-[color-mix(in_oklch,var(--primary),black_10%)] dark:from-[color-mix(in_oklch,var(--primary),white_35%)] dark:to-[color-mix(in_oklch,var(--primary),white_5%)]",
    "shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),black_16%),inset_0_2px_0_0_rgb(255_255_255_/_0.25)] dark:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),white_12%),inset_0_2px_0_0_rgb(255_255_255_/_0.55)]",
    "data-checked:scale-100 data-checked:opacity-100 data-unchecked:scale-50 data-unchecked:opacity-0",
  ],
  variants: {
    reduceMotion: {
      true: "transition-none",
      false:
        "duration-100 ease-linear [transition-property:opacity,scale,transform] motion-reduce:transition-none motion-reduce:transform-none",
    },
  },
  defaultVariants: {
    reduceMotion: false,
  },
});

const radioIndicatorStyles = tv({
  base: [
    "relative z-10 flex items-center justify-center text-primary-foreground data-checked:scale-100 data-checked:opacity-100 data-unchecked:scale-60 data-unchecked:opacity-0 pointer-events-none will-change-[opacity,scale]",
  ],
  variants: {
    size: {
      sm: "size-1.5",
      default: "size-2",
      lg: "size-2.5",
    },
    reduceMotion: {
      true: "transition-none",
      false:
        "[transition-property:opacity,scale] duration-100 ease-linear motion-reduce:transition-none motion-reduce:transform-none",
    },
  },
  defaultVariants: {
    size: "default",
    reduceMotion: false,
  },
});

type RadioSize = NonNullable<RadioRootProps["size"]>;

interface RadioContextType {
  reduceMotion?: boolean;
  size: RadioSize;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

const useRadio = () => {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("useRadio must be used within a RadioProvider");
  }

  return context;
};

interface RadioGroupProps<
  Value = string,
> extends RadioGroupPrimitive.Props<Value> {
  orientation?: "horizontal" | "vertical";
}

function RadioGroup<Value = string>({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupProps<Value>) {
  return (
    <RadioGroupPrimitive
      className={cn(radioGroupStyles({ orientation }), className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

interface RadioRootProps<
  Value = string,
> extends RadioPrimitive.Root.Props<Value> {
  reduceMotion?: boolean;
  size?: "sm" | "default" | "lg";
}

function RadioRoot<Value = string>({
  children,
  className,
  reduceMotion = false,
  size = "default",
  ...props
}: RadioRootProps<Value>) {
  return (
    <RadioContext.Provider value={{ reduceMotion, size }}>
      <RadioPrimitive.Root
        className={cn(radioRootStyles({ size, reduceMotion }), className)}
        data-slot="radio"
        {...props}
      >
        <span
          className="absolute -inset-1 pointer-events-auto"
          aria-hidden="true"
        />
        <RadioPrimitive.Indicator
          aria-hidden
          className={radioSelectedSurfaceStyles({ reduceMotion })}
          data-slot="radio-selected-surface"
          keepMounted
        />
        {children}
      </RadioPrimitive.Root>
    </RadioContext.Provider>
  );
}

interface RadioIndicatorProps extends ComponentProps<
  typeof RadioPrimitive.Indicator
> {}

function RadioIndicator({
  children,
  className,
  ...props
}: RadioIndicatorProps) {
  const { reduceMotion = false, size } = useRadio();

  return (
    <RadioPrimitive.Indicator
      className={cn(radioIndicatorStyles({ size, reduceMotion }), className)}
      data-slot="radio-indicator"
      keepMounted
      {...props}
    >
      {children ?? <span className="size-full rounded-full bg-current" />}
    </RadioPrimitive.Indicator>
  );
}

interface RadioProps<Value = string> extends RadioRootProps<Value> {}

function Radio<Value = string>({
  children,
  className,
  reduceMotion,
  ...props
}: RadioProps<Value>) {
  return (
    <RadioRoot className={className} reduceMotion={reduceMotion} {...props}>
      <RadioIndicator>{children}</RadioIndicator>
    </RadioRoot>
  );
}

export { Radio, RadioGroup, RadioIndicator, RadioRoot };
