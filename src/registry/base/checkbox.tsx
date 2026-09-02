"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const checkboxRootStyles = tv({
  base: [
    `group size-7 relative inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid cursor-pointer transition-[outline-width,outline-offset,outline-color] duration-100 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50 data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50`,
    `data-disabled:cursor-not-allowed data-disabled:grayscale data-disabled:scale-100 data-disabled:opacity-50`,
    `before:content-[''] before:absolute before:border-1 before:inset-0 before:border-border aria-invalid:before:border-destructive data-invalid:before:border-destructive not-data-disabled:hover:before:bg-secondary/60`,
    `after:content-[''] after:pointer-events-none after:absolute after:inset-0 after:z-0 after:origin-center after:rounded-[inherit] after:bg-linear-to-b after:from-primary after:to-[color-mix(in_oklch,var(--primary),black_10%)] dark:after:from-[color-mix(in_oklch,var(--primary),white_35%)] dark:after:to-[color-mix(in_oklch,var(--primary),white_5%)] after:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),black_16%),inset_0_2px_0_0_rgb(255_255_255_/_0.25)] dark:after:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),white_12%),inset_0_2px_0_0_rgb(255_255_255_/_0.55)] data-unchecked:after:scale-50 data-unchecked:after:opacity-0 data-checked:after:scale-100 data-checked:after:opacity-100`,
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
      true: "transition-none before:transition-none after:transition-none",
      false:
        "before:transition-colors transition-transform after:duration-100 after:ease-linear after:[transition-property:opacity,scale,transform]",
    },
  },
  defaultVariants: {
    size: "default",
    radius: "default",
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
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false
  );

  const isChecked = checked ?? internalChecked;

  const handleCheckedChange: CheckboxRootProps["onCheckedChange"] = (
    checked,
    eventDetails
  ) => {
    if (indeterminate && !onCheckedChange) {
      return;
    }

    setInternalChecked(checked);
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
      <svg
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        className="block"
        {...rest}
      >
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
      width="100%"
      height="100%"
      className="block"
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
