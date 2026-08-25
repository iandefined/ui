"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/shared/lib/utils";

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive> & {
  decorative?: boolean;
}) => (
  <SeparatorPrimitive
    data-slot="separator"
    orientation={orientation}
    aria-hidden={decorative ? true : undefined}
    role={decorative ? "none" : undefined}
    className={cn(
      "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className
    )}
    {...props}
  />
);

export { Separator };
