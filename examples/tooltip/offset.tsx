import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const offsets = [4, 15, -15] as const;

export default function TooltipOffsetDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-4">
        {offsets.map((offset) => (
          <Tooltip key={offset}>
            <TooltipTrigger render={<Button size="sm" variant="outline" />}>
              {offset === 4 ? "Default offset (4)" : `${offset} offset`}
            </TooltipTrigger>
            <TooltipPopup sideOffset={offset}>Tooltip content</TooltipPopup>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
