import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipCustomContentDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipPopup>
          <div className="px-1 py-2">
            <p className="text-sm font-bold">Custom content</p>
            <p className="text-xs">This is a custom tooltip content.</p>
          </div>
        </TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  );
}
