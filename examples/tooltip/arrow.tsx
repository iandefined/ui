import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipArrowDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipPopup showArrow sideOffset={8}>
          Helpful information.
        </TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  );
}
