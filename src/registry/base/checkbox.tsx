"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const checkboxRootStyles = tv({
  base: [
    `group size-7 relative inline-flex items-center justify-center shrink-0 overflow-hidden outline-hidden focus:outline-hidden focus-visible:outline-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background`,
    `data-disabled:cursor-not-allowed data-disabled:grayscale data-disabled:scale-100 data-disabled:opacity-50`,
    `before:content-[''] before:absolute before:border-2 before:inset-0 before:border-border not-data-disabled:hover:before:bg-secondary/60`,
  ],
  variants: {
    size: {
      sm: "size-4.5",
      default: "size-5",
      lg: "size-6",
    },
    radius: {
      none: "rounded-none before:rounded-none",
      sm: "rounded-[6px] before:rounded-[6px]",
      default: "rounded-[7.2px] before:rounded-[7.2px]",
      lg: "rounded-[8.4px] before:rounded-[8.4px]",
      full: "rounded-full before:rounded-full",
    },
    reduceMotion: {
      true: "transition-none before:transition-none",
      false: "before:transition-colors transition-transform",
    },
  },
  defaultVariants: {
    size: "default",
    radius: "default",
    reduceMotion: false,
  },
});

const checkboxSelectedSurfaceStyles = tv({
  base: [
    "pointer-events-none absolute inset-0 z-0 origin-center rounded-[inherit] bg-linear-to-b from-primary to-[color-mix(in_oklch,var(--primary),black_10%)] dark:from-[color-mix(in_oklch,var(--primary),white_35%)] dark:to-[color-mix(in_oklch,var(--primary),white_5%)]",
    "shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),black_16%),inset_0_2px_0_0_rgb(255_255_255_/_0.25)] dark:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),white_12%),inset_0_2px_0_0_rgb(255_255_255_/_0.55)]",
    "data-checked:scale-100 data-checked:opacity-100 data-unchecked:scale-50 data-unchecked:opacity-0",
  ],
  variants: {
    reduceMotion: {
      true: "transition-none",
      false:
        "duration-100 ease-linear [transition-property:opacity,scale,transform]",
    },
  },
  defaultVariants: {
    reduceMotion: false,
  },
});

const checkboxIndicatorStyles = tv({
  base: [
    `relative z-10 flex items-center justify-center data-unchecked:opacity-0 data-checked:opacity-100 text-primary-foreground transition-opacity pointer-events-none`,
  ],
  variants: {
    size: {
      sm: "w-2.5 h-2.5",
      default: "w-3 h-3",
      lg: "w-4 h-4",
    },
    reduceMotion: {
      true: "transition-none",
      false: "transition-opacity",
    },
  },
  defaultVariants: {
    size: "default",
    reduceMotion: false,
  },
});

interface CheckboxRootProps
  extends
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxRootStyles> {
  reduceMotion?: boolean;
}

interface CheckboxContextType {
  checked: boolean;
  onCheckedChange: CheckboxRootProps["onCheckedChange"];
  indeterminate: boolean | undefined;
  size: VariantProps<typeof checkboxRootStyles>["size"];
  reduceMotion?: boolean; // Add this
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(
  undefined
);

const useCheckbox = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error("useCheckbox must be used within a CheckboxProvider");
  }
  return context;
};

function CheckboxRoot({
  checked,
  children,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  className,
  reduceMotion = false,
  size = "default",
  radius = "default",
  ...rest
}: CheckboxRootProps) {
  const [isChecked, setIsChecked] = useState(
    checked ?? defaultChecked ?? false
  );

  useEffect(() => {
    if (checked !== undefined) setIsChecked(checked);
  }, [checked]);

  const handleCheckedChange: CheckboxRootProps["onCheckedChange"] = (
    checked,
    eventDetails
  ) => {
    if (indeterminate && !onCheckedChange) {
      return;
    }

    setIsChecked(checked);
    onCheckedChange?.(checked, eventDetails);
  };

  return (
    <CheckboxContext.Provider
      value={{
        checked: isChecked,
        onCheckedChange: handleCheckedChange,
        indeterminate: indeterminate,
        size: size,
        reduceMotion: reduceMotion,
      }}
    >
      <CheckboxPrimitive.Root
        checked={isChecked}
        className={cn(
          checkboxRootStyles({ size, radius, reduceMotion }),
          className
        )}
        indeterminate={indeterminate}
        onCheckedChange={handleCheckedChange}
        {...rest}
      >
        <CheckboxPrimitive.Indicator
          aria-hidden
          className={checkboxSelectedSurfaceStyles({ reduceMotion })}
          data-slot="checkbox-selected-surface"
          keepMounted
        />
        {children}
      </CheckboxPrimitive.Root>
    </CheckboxContext.Provider>
  );
}

interface CheckboxIconProps extends React.ComponentProps<"svg"> {
  checked: boolean;
  indeterminate: boolean | undefined;
  reduceMotion?: boolean;
}

function CheckboxIcon(props: CheckboxIconProps) {
  const { checked, indeterminate, reduceMotion, ...rest } = props;

  if (indeterminate) {
    return (
      <svg stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" {...rest}>
        <line x1="21" x2="3" y1="12" y2="12" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      role="presentation"
      stroke="currentColor"
      strokeDasharray={22}
      strokeDashoffset={checked ? 44 : 66}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{
        transition: reduceMotion ? "none" : `stroke-dashoffset 100ms linear`,
        transitionDelay: reduceMotion ? "0ms" : `50ms`,
      }}
      viewBox="0 0 17 18"
      {...rest}
    >
      <polyline points="1 9 7 14 15 4" />
    </svg>
  );
}

interface CheckboxIndicatorProps extends React.ComponentProps<
  typeof CheckboxPrimitive.Indicator
> {
  icon?: React.ReactNode | ((props: CheckboxIconProps) => React.ReactNode);
}

function CheckboxIndicator({
  className,
  icon = CheckboxIcon,
  children,
  ...rest
}: CheckboxIndicatorProps) {
  const { checked, indeterminate, size, reduceMotion = false } = useCheckbox();

  return (
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={cn(checkboxIndicatorStyles({ size, reduceMotion }), className)}
      {...rest}
      keepMounted
    >
      {children ?? (
        <CheckboxIcon
          checked={checked}
          indeterminate={indeterminate}
          reduceMotion={reduceMotion}
        />
      )}
    </CheckboxPrimitive.Indicator>
  );
}

interface CheckboxProps
  extends
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxRootStyles> {
  reduceMotion?: boolean;
}

function Checkbox({
  className,
  reduceMotion,
  children,
  ...rest
}: CheckboxProps) {
  return (
    <CheckboxRoot
      className={cn(className)}
      reduceMotion={reduceMotion}
      {...rest}
    >
      <CheckboxIndicator>{children}</CheckboxIndicator>
    </CheckboxRoot>
  );
}

export { Checkbox, CheckboxRoot, CheckboxIndicator };
