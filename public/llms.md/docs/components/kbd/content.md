# Kbd

Displays textual keyboard input and shortcut combinations.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Kbd` for individual keys and `KbdGroup` for shortcuts shown in instructions or controls.

## Preview

```tsx
import { Kbd, KbdGroup } from "@/registry/base/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/kbd.json
```

## Usage

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd";
```

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

## Examples

### Group

```tsx
import { Kbd, KbdGroup } from "@/registry/base/kbd";

export default function KbdGroupDemo() {
  return (
    <p className="text-sm text-muted-foreground">
      Use{" "}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{" "}
      to open the command palette.
    </p>
  );
}
```

### Button

```tsx
import { Button } from "@/registry/base/button";
import { Kbd } from "@/registry/base/kbd";

export default function KbdButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="pr-2" size="sm" variant="outline">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button className="pr-2" size="sm" variant="outline">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  );
}
```

### Tooltip

```tsx
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
```

### Input Group

```tsx
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";
import { Kbd } from "@/registry/base/kbd";

export default function KbdInputGroupDemo() {
  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupInput aria-label="Search" placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

## API Reference

`Kbd` and `KbdGroup` wrap native `<kbd>` elements. Their standard HTML attributes pass through.
