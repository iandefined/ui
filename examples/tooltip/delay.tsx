import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipDelayDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger
            delay={1000}
            render={<Button size="sm" variant="outline" />}
          >
            Delay open (1000ms)
          </TooltipTrigger>
          <TooltipPopup>Tooltip content</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            closeDelay={1000}
            render={<Button size="sm" variant="outline" />}
          >
            Delay close (1000ms)
          </TooltipTrigger>
          <TooltipPopup>Tooltip content</TooltipPopup>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
