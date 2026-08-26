import { Button } from "@/registry/base/button";
import { Kbd, KbdGroup } from "@/registry/base/kbd";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function KbdTooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button size="sm" variant="outline" />}>
            Save
          </TooltipTrigger>
          <TooltipPopup>
            <div className="flex items-center gap-2">
              Save changes <Kbd>S</Kbd>
            </div>
          </TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button size="sm" variant="outline" />}>
            Print
          </TooltipTrigger>
          <TooltipPopup>
            <div className="flex items-center gap-2">
              Print document
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipPopup>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
