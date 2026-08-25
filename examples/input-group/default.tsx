import { CheckIcon, InfoIcon, SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/registry/base/input-group";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function InputGroupDefaultDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full max-w-sm gap-6">
        <InputGroup>
          <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            type="search"
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Domain"
            className="pl-1!"
            placeholder="example.com"
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    aria-label="Information"
                    className="rounded-full"
                    size="icon-xs"
                  />
                }
              >
                <InfoIcon />
              </TooltipTrigger>
              <TooltipPopup>This is content in a tooltip.</TooltipPopup>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput placeholder="@shadcn" />
          <InputGroupAddon align="inline-end">
            <span className="flex size-4 items-center relative -right-1 justify-center rounded-full bg-primary text-primary-foreground">
              <CheckIcon className="size-3" />
            </span>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </TooltipProvider>
  );
}
