import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "relative block h-9 w-full min-w-0 truncate rounded-lg border border-input/70 not-dark:border-input bg-background px-3 py-2 text-base/5 text-foreground shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid placeholder:text-muted-foreground/80 [transition:border-color_150ms_ease-out,outline-width_100ms_ease-out,outline-offset_100ms_ease-out,outline-color_100ms_ease-out] focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 disabled:opacity-64 aria-invalid:border-destructive aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50 focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:outline-destructive/50 [disabled,focus-visible,aria-invalid]:shadow-none dark:bg-input/32 sm:text-sm",
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
          "text-muted-foreground flex items-center pt-2 pb-[9px] file:me-3 file:relative file:top-px file:align-middle file:rounded-lg file:border file:border-input/70 not-dark:file:border-input file:bg-transparent file:py-0 file:text-base file:font-medium file:leading-5 file:text-foreground sm:file:text-sm",
        className
      )}
      data-slot="input"
      size={typeof size === "number" ? size : undefined}
      {...props}
    />
  );
}

export { Input, inputVariants };
