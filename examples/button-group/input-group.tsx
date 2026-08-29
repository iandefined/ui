"use client";

import { AudioLinesIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
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

export default function ButtonGroupInputGroupDemo() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <TooltipProvider>
      <ButtonGroup className="[--radius:9999rem]">
        <ButtonGroup>
          <Button aria-label="Add attachment" size="icon" variant="outline">
            <PlusIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput
              disabled={voiceEnabled}
              placeholder={
                voiceEnabled ? "Record and send audio..." : "Send a message..."
              }
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <InputGroupButton
                      aria-pressed={voiceEnabled}
                      className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                      data-active={voiceEnabled}
                      onClick={() => setVoiceEnabled((value) => !value)}
                      size="icon-xs"
                    />
                  }
                >
                  <AudioLinesIcon />
                </TooltipTrigger>
                <TooltipPopup>Voice Mode</TooltipPopup>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    </TooltipProvider>
  );
}
