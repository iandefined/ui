import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "wipe",
  "wipeScale",
  "motion",
  "motionBlur",
] as const;

const animationTooltip = Tooltip.createHandle<(typeof presets)[number]>();

export default function TooltipAnimationDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {presets.map((preset) => (
          <TooltipTrigger
            key={preset}
            handle={animationTooltip}
            payload={preset}
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            {preset}
          </TooltipTrigger>
        ))}
      </div>

      <Tooltip handle={animationTooltip}>
        {({ payload }) => (
          <TooltipPopup animationPreset={payload}>
            {payload} tooltip
          </TooltipPopup>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
