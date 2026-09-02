import { Input as InputPrimitive } from "@base-ui/react/input";
import { tv } from "tailwind-variants";

import { cn } from "@/shared/lib/utils";

const inputVariants = tv({
  base: "relative h-9 w-full min-w-0 rounded-lg border border-input/70 bg-background px-3 py-2 text-base/5 text-foreground shadow-xs outline-none placeholder:text-muted-foreground/80 [transition:box-shadow_150ms_ease-out] focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-border disabled:opacity-64 aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 [disabled,focus-visible,aria-invalid]:shadow-none dark:bg-input/32 dark:aria-invalid:ring-destructive/24 sm:text-sm",
  variants: {
    size: {
      sm: "h-8 px-3",
      default: "",
      lg: "h-10 px-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface InputProps extends Omit<InputPrimitive.Props, "size"> {
  size?: "sm" | "default" | "lg" | number;
}

function Input({ className, size = "default", ...props }: InputProps) {
  return (
    <InputPrimitive
      className={cn(
        inputVariants({ size: typeof size === "number" ? "default" : size }),
        props.type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        props.type === "file" &&
          "text-muted-foreground file:me-3 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      data-slot="input"
      size={typeof size === "number" ? size : undefined}
      {...props}
    />
  );
}

export { Input, inputVariants };
