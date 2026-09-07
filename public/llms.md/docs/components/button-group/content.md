# Button Group

A container that groups related buttons together with consistent styling.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `ButtonGroup` when adjacent actions belong to the same task or control.

## Preview

```tsx
"use client";

import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterPlusIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function ButtonGroupDefaultDemo() {
  const [label, setLabel] = useState("personal");

  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button aria-label="Go back" size="icon" variant="outline">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button aria-label="More options" size="icon" variant="outline" />
            }
          >
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterPlusIcon />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={label}
                    onValueChange={setLabel}
                  >
                    <DropdownMenuRadioItem value="personal">
                      Personal
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">
                      Work
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button-group.json
```

## Usage

```tsx
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>;
```

## Composition

```tsx
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

<ButtonGroup>
  <Button />
  <ButtonGroupSeparator orientation="vertical" />
  <ButtonGroupText>Text</ButtonGroupText>
</ButtonGroup>;
```

## Examples

### Basic

Group related actions.

```tsx
import {
  ArchiveIcon,
  EditIcon,
  EllipsisIcon,
  FilesIcon,
  FilmIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function ButtonGroupBasicDemo() {
  return (
    <ButtonGroup aria-label="File actions">
      <Button variant="outline">
        <FilesIcon />
        Files
      </Button>
      <Button variant="outline">
        <FilmIcon />
        Media
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button aria-label="Menu" size="icon" variant="outline" />}
        >
          <EllipsisIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EditIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArchiveIcon />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
```

### Orientation

Set `orientation` to stack actions vertically.

```tsx
import { MinusIcon, PlusIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";

export default function ButtonGroupOrientationDemo() {
  return (
    <div className="flex gap-3">
      <ButtonGroup
        aria-label="Media controls"
        className="h-fit"
        orientation="vertical"
      >
        <Button aria-label="Increase" size="icon" variant="outline">
          <PlusIcon />
        </Button>
        <Button aria-label="Decrease" size="icon" variant="outline">
          <MinusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Zoom controls" orientation="vertical">
        <Button aria-label="Zoom in" size="icon" variant="outline">
          <ZoomInIcon />
        </Button>
        <Button aria-label="Zoom out" size="icon" variant="outline">
          <ZoomOutIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

### Sizes

Size each contained button for the context.

```tsx
import { PlusIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";

export default function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="sm" variant="outline">
          Button
        </Button>
        <Button size="sm" variant="outline">
          Group
        </Button>
        <Button aria-label="Add small item" size="icon-sm" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button aria-label="Add item" size="icon" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button size="lg" variant="outline">
          Button
        </Button>
        <Button size="lg" variant="outline">
          Group
        </Button>
        <Button aria-label="Add large item" size="icon-lg" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

### Nested

Nest groups to separate related action clusters.

```tsx
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";

export default function ButtonGroupNestedDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          1
        </Button>
        <Button size="sm" variant="outline">
          2
        </Button>
        <Button size="sm" variant="outline">
          3
        </Button>
        <Button size="sm" variant="outline">
          4
        </Button>
        <Button size="sm" variant="outline">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Previous" size="icon-sm" variant="outline">
          <ArrowLeftIcon />
        </Button>
        <Button aria-label="Next" size="icon-sm" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
```

### Separator

Use `ButtonGroupSeparator` where adjacent button borders do not provide separation.

```tsx
import { Button } from "@/registry/base/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/base/button-group";

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="secondary">
        Copy
      </Button>
      <ButtonGroupSeparator orientation="vertical" />
      <Button size="sm" variant="secondary">
        Paste
      </Button>
    </ButtonGroup>
  );
}
```

### Split

Pair a primary action with a secondary control.

```tsx
import { PlusIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/base/button-group";

export default function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator orientation="vertical" />
      <Button aria-label="Add" size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
```

### Input

Combine an input with related actions.

```tsx
import { SearchIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import { Input } from "@/registry/base/input";

export default function ButtonGroupInputDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button aria-label="Search" variant="outline">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
```

### Input Group

Compose a more complex input control.

```tsx
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
```

### Menu

Use a dropdown for secondary actions.

```tsx
import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function ButtonGroupMenuDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More follow actions"
          render={<Button size="icon" variant="outline" />}
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <VolumeOffIcon />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertTriangleIcon />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundXIcon />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
```

### Select

Pair a selection control with actions.

```tsx
"use client";

import { ArrowRightIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import { Input } from "@/registry/base/input";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

interface Currency {
  value: string;
  label: string;
}

const currencies: Currency[] = [
  {
    value: "$",
    label: "US Dollar",
  },
  {
    value: "EUR",
    label: "Euro",
  },
  {
    value: "GBP",
    label: "British Pound",
  },
];

export default function ButtonGroupSelectDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          defaultValue={currencies[0]}
          itemToStringValue={(currency) => (currency as Currency)?.value}
        >
          <SelectTrigger aria-label="Select currency" className="min-w-0 w-fit">
            <SelectValue>{(currency: Currency) => currency.value}</SelectValue>
            <SelectIcon>
              <ChevronsUpDownIcon className="size-3.5" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPopup alignItemWithTrigger>
            <SelectList className="min-w-48">
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency}>
                  <SelectItemText>
                    {currency.value}{" "}
                    <span className="text-muted-foreground">
                      {currency.label}
                    </span>
                  </SelectItemText>
                  <SelectItemIndicator>
                    <CheckIcon className="size-3" />
                  </SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </Select>
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
```

### Popover

Open supplemental controls from the group.

```tsx
import { BotIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import { Popover, PopoverPopup, PopoverTrigger } from "@/registry/base/popover";
import { Separator } from "@/registry/base/separator";
import { Textarea } from "@/registry/base/textarea";

export default function ButtonGroupPopoverDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <BotIcon /> Copilot
      </Button>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Open Popover" />
          }
        >
          <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverPopup align="end" className="p-0 text-sm">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Agent Tasks</div>
          </div>
          <Separator />
          <div className="min-w-0 p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <Textarea
              placeholder="Describe your task in natural language."
              className="mb-4 min-h-20 resize-none"
            />
            <p className="font-medium">Start a new task with Copilot</p>
            <p className="text-muted-foreground">
              Describe your task in natural language. Copilot will work in the
              background and open a pull request for your review.
            </p>
          </div>
        </PopoverPopup>
      </Popover>
    </ButtonGroup>
  );
}
```

## API Reference

`ButtonGroup` is a styled `div`; standard HTML props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `orientation` | `"horizontal" \| "vertical"` | `horizontal` | Sets the layout direction. |
