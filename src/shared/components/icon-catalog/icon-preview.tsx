import { cn } from "cn";
import type { ComponentProps } from "react";

export interface IconPreviewProps extends ComponentProps<"span"> {
  svg: string;
}

export function IconPreview({ svg, className, ...props }: IconPreviewProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 [&>svg]:size-full [&>svg]:block pointer-events-none",
        className
      )}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
}
