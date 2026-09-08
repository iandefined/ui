# Input Group

Compose inputs and textareas with icons, text, buttons, and menus.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `InputGroup` to attach context and actions directly to an input or textarea.

## Preview

```tsx
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
            <span className="flex size-4 items-center relative justify-center rounded-full bg-primary text-primary-foreground">
              <CheckIcon className="size-3" />
            </span>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </TooltipProvider>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input-group.json
```

## Usage

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>;
```

## Composition

Use `InputGroupInput` or `InputGroupTextarea` as the control. Place `InputGroupAddon` at `inline-start`, `inline-end`, `block-start`, or `block-end`.

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

<InputGroup>
  <InputGroupAddon>
    <InputGroupText />
  </InputGroupAddon>
  <InputGroupInput />
  <InputGroupAddon align="inline-end">
    <InputGroupButton />
  </InputGroupAddon>
</InputGroup>;
```

## Examples

### Text

Add a textual prefix or suffix.

```tsx
"use client";

import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/base/input-group";

export default function InputGroupTextDemo() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-label="Amount" placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea
          aria-label="Message"
          maxLength={120}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Enter your message"
          value={message}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs">
            {120 - message.length} characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### Icons

Add a contextual icon without changing the input semantics.

```tsx
import { CreditCardIcon, MailIcon, SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";

export default function InputGroupIconsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label="Search" placeholder="Search..." />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Enter your email" type="email" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Card number" />
      </InputGroup>
    </div>
  );
}
```

### Buttons

Place related actions inside an addon.

```tsx
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
```

### Spinner

Indicate in-progress input work.

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/base/input-group";
import { Spinner } from "@/registry/base/spinner";

export default function InputGroupSpinnerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled>
        <InputGroupInput disabled placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <Spinner size="sm" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupAddon>
          <Spinner size="sm" />
        </InputGroupAddon>
        <InputGroupInput disabled placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### Tooltip

Explain icon-only controls.

```tsx
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
```

### Menu

Expose additional input actions through a menu.

```tsx
import { ChevronDownIcon, MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/base/input-group";

export default function InputGroupMenuDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<InputGroupButton aria-label="More" size="icon-xs" />}
            >
              <MoreHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Copy path</DropdownMenuItem>
              <DropdownMenuItem>Open location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="ghost" />}>
              Search in <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Blog posts</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### Invalid

Trigger the invalid-state shake on the input group.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";

export default function InputGroupInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <InputGroup className="w-full">
        <InputGroupInput
          aria-invalid={invalid || undefined}
          aria-label="Website"
          placeholder="example.com"
        />
        <InputGroupAddon>https://</InputGroupAddon>
      </InputGroup>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
```

## API Reference

`InputGroup` and its parts are styled HTML elements. Standard element props pass through.

### InputGroupAddon Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `inline-start` | Sets the addon's position around the control. |

### InputGroupButton Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `xs` | Sets the embedded button size. |
