import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const sides = [
  "top",
  "right",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

const sidesTooltip = Tooltip.createHandle<(typeof sides)[number]>();

export default function TooltipSidesDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {sides.map((side) => (
          <TooltipTrigger
            key={side}
            handle={sidesTooltip}
            payload={side}
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            <span className="capitalize">{side}</span>
          </TooltipTrigger>
        ))}
      </div>

      <Tooltip handle={sidesTooltip}>
        {({ payload }) => (
          <TooltipPopup showArrow side={payload} sideOffset={8}>
            <p className="text-xs text-muted-foreground">
              8:51 PM - Oct 22, 2025
            </p>
          </TooltipPopup>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
