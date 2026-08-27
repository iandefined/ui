"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { IconSwap } from "@/registry/base/icon-swap";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/base/input-group";

export default function InputGroupButtonsDemo() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput readOnly value="https://ui.iandefined.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy URL"
            onClick={() => setCopied(true)}
            size="icon-xs"
          >
            <IconSwap
              className="inline-flex shrink-0"
              state={copied ? "copied" : "copy"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </IconSwap>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
