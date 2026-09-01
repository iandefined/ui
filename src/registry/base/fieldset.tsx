import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Fieldset({ className, ...props }: ComponentProps<"fieldset">) {
  return (
    <fieldset
      className={cn("m-0 grid min-w-0 space-y-4 border-0 p-0", className)}
      data-slot="fieldset"
      {...props}
    />
  );
}

function FieldsetLegend({ className, ...props }: ComponentProps<"legend">) {
  return (
    <legend
      className={cn(
        "text-base/6 font-semibold mb-4 text-foreground",
        className
      )}
      data-slot="fieldset-legend"
      {...props}
    />
  );
}

export { Fieldset, FieldsetLegend };
