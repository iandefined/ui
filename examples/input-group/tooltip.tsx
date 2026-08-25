import { HelpCircleIcon, InfoIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/base/input-group";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function InputGroupTooltipDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full max-w-sm gap-4">
        <InputGroup>
          <InputGroupInput placeholder="Enter password" type="password" />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    aria-label="Password requirements"
                    size="icon-xs"
                    variant="ghost"
                  />
                }
              >
                <InfoIcon />
              </TooltipTrigger>
              <TooltipPopup>
                Password must be at least 8 characters.
              </TooltipPopup>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Your email address" />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    aria-label="Email help"
                    size="icon-xs"
                    variant="ghost"
                  />
                }
              >
                <HelpCircleIcon />
              </TooltipTrigger>
              <TooltipPopup>
                We&apos;ll use this for notifications.
              </TooltipPopup>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </TooltipProvider>
  );
}
