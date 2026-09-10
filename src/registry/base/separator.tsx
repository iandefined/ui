import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva } from "class-variance-authority";
import { cn } from "cn";

const separatorVariants = cva(
  "shrink-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
  {
    variants: {
      variant: {
        solid:
          "bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        dashed: [
          "bg-transparent",
          "data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-dashed data-[orientation=horizontal]:border-border",
          "data-[orientation=vertical]:w-0 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-dashed data-[orientation=vertical]:border-border",
        ],
      },
      lightSource: {
        none: "",
        above: "",
        below: "",
        right: "",
        left: "",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        lightSource: "above",
        className:
          "[box-shadow:0_1px_0_0_white] dark:[box-shadow:0_-1px_0_0_var(--background)]",
      },
      {
        variant: "solid",
        lightSource: "below",
        className:
          "[box-shadow:0_-1px_0_0_white] dark:[box-shadow:0_1px_0_0_var(--background)]",
      },
      {
        variant: "solid",
        lightSource: "right",
        className:
          "[box-shadow:-1px_0_0_0_white] dark:[box-shadow:1px_0_0_0_var(--background)]",
      },
      {
        variant: "solid",
        lightSource: "left",
        className:
          "[box-shadow:1px_0_0_0_white] dark:[box-shadow:-1px_0_0_0_var(--background)]",
      },
    ],
    defaultVariants: {
      variant: "solid",
      lightSource: "none",
    },
  }
);

type SeparatorProps = SeparatorPrimitive.Props & {
  lightSource?: "none" | "above" | "below" | "right" | "left";
  variant?: "solid" | "dashed";
};

type SeparatorVariant = NonNullable<SeparatorProps["variant"]>;
type SeparatorLightSource = NonNullable<SeparatorProps["lightSource"]>;

function Separator({
  className,
  orientation = "horizontal",
  variant = "solid",
  lightSource = "none",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      className={cn(separatorVariants({ lightSource, variant }), className)}
      data-light-source={lightSource}
      data-slot="separator"
      data-variant={variant}
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
export type { SeparatorLightSource, SeparatorProps, SeparatorVariant };
