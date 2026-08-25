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
            "field-sizing-content relative min-h-17.5 w-full rounded-lg border border-input/70 bg-background px-3 py-2 text-base/5 shadow-xs outline-none placeholder:text-muted-foreground/80 [transition:box-shadow_150ms_ease-out] focus-visible:border-ring focus-visible:ring-[1px] disabled:opacity-64 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 [disabled,focus-visible,aria-invalid]:shadow-none dark:bg-input/32 dark:aria-invalid:ring-destructive/24 max-sm:min-h-20.5 sm:text-sm",
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
