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

export default function TooltipAnimationDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {presets.map((preset) => (
          <Tooltip key={preset}>
            <TooltipTrigger
              render={<Button className="w-full" size="sm" variant="outline" />}
            >
              {preset.replace(/([A-Z])/g, " $1")}
            </TooltipTrigger>
            <TooltipPopup animationPreset={preset}>
              Tooltip content
            </TooltipPopup>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
