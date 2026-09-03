"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  size?: "sm" | "default" | "lg" | number;
}

function Textarea({ className, size = "default", ...props }: TextareaProps) {
  return (
    <FieldPrimitive.Control
      render={(defaultProps) => (
        <textarea
          className={cn(
            "field-sizing-content relative block min-h-17.5 w-full rounded-lg border border-input/70 not-dark:border-input bg-background px-3 py-2 text-base/5 shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid placeholder:text-muted-foreground/80 [transition:border-color_150ms_ease-out,outline-width_100ms_ease-out,outline-offset_100ms_ease-out,outline-color_100ms_ease-out] focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 disabled:opacity-64 aria-invalid:border-destructive aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50 focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:outline-destructive/50 [disabled,focus-visible,aria-invalid]:shadow-none dark:bg-input/32 max-sm:min-h-20.5 sm:text-sm",
            size === "sm" &&
              "min-h-16.5 px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1)-1px)] max-sm:min-h-19.5",
            size === "lg" &&
              "min-h-18.5 py-[calc(--spacing(2)-1px)] max-sm:min-h-21.5",
            className
          )}
          data-slot="textarea"
          {...mergeProps(defaultProps, props)}
        />
      )}
    />
  );
}

export { Textarea };
