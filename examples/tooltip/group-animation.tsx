import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const toolbarTooltip = Tooltip.createHandle<string>();

const actions = [
  { icon: BoldIcon, label: "Bold" },
  { icon: ItalicIcon, label: "Italic" },
  { icon: UnderlineIcon, label: "Underline" },
] as const;

export default function TooltipGroupAnimationDemo() {
  return (
    <TooltipProvider>
      <div className="flex">
        {actions.map(({ icon: Icon, label }) => (
          <TooltipTrigger
            key={label}
            aria-label={label}
            handle={toolbarTooltip}
            payload={label}
            render={
              <Button
                className="rounded-none border-r-0 last:border-r first:rounded-l-md last:rounded-r-md"
                size="icon-sm"
                variant="outline"
              />
            }
          >
            <Icon />
          </TooltipTrigger>
        ))}
      </div>

      <Tooltip handle={toolbarTooltip}>
        {({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}
      </Tooltip>
    </TooltipProvider>
  );
}
