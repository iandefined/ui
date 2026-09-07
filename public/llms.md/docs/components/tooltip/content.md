# Tooltip

Displays contextual information when a user hovers or focuses an element.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Tooltip` for a short, supplementary description of a control.

## Preview

```tsx
import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipDefaultDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipPopup>Helpful information.</TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/tooltip.json
```

## Usage

```tsx
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>
    Hover me
  </TooltipTrigger>
  <TooltipPopup>Helpful hint</TooltipPopup>
</Tooltip>;
```

Wrap related tooltips in `TooltipProvider` so adjacent tooltips open instantly after the first one.

## Composition

```tsx
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger />
    <TooltipPopup />
  </Tooltip>
</TooltipProvider>;
```

## Examples

### Basic

```tsx
import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipDefaultDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipPopup>Helpful information.</TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### With Arrow

Set `showArrow` to display the tooltip arrow. Keep `sideOffset` at 8 or more so it has room.

```tsx
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
```

### Sides

Set `side` on `TooltipPopup` to control its position. The default is `top`. The preview follows the Dropdown Menu sides layout, includes the logical `inline-start` and `inline-end` positions, and uses one shared tooltip handle so the popup animates between triggers.

```tsx
import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const sides = [
  "top",
  "right",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

const sidesTooltip = Tooltip.createHandle<(typeof sides)[number]>();

export default function TooltipSidesDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {sides.map((side) => (
          <TooltipTrigger
            key={side}
            handle={sidesTooltip}
            payload={side}
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            <span className="capitalize">{side}</span>
          </TooltipTrigger>
        ))}
      </div>

      <Tooltip handle={sidesTooltip}>
        {({ payload }) => (
          <TooltipPopup showArrow side={payload} sideOffset={8}>
            <p className="text-xs text-muted-foreground">
              8:51 PM - Oct 22, 2025
            </p>
          </TooltipPopup>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
```

### Offset

Set `sideOffset` to control the distance between the trigger and popup. Its default is `4`.

```tsx
import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const offsets = [4, 15, -15] as const;

export default function TooltipOffsetDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-4">
        {offsets.map((offset) => (
          <Tooltip key={offset}>
            <TooltipTrigger render={<Button size="sm" variant="outline" />}>
              {offset === 4 ? "Default offset (4)" : `${offset} offset`}
            </TooltipTrigger>
            <TooltipPopup sideOffset={offset}>Tooltip content</TooltipPopup>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
```

### Delay

Set `delay` or `closeDelay` on `TooltipTrigger` to control each tooltip. `TooltipProvider` also accepts `delay` to configure a group; its default is 300ms.

```tsx
import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipDelayDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger
            delay={1000}
            render={<Button size="sm" variant="outline" />}
          >
            Delay open (1000ms)
          </TooltipTrigger>
          <TooltipPopup>Tooltip content</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            closeDelay={1000}
            render={<Button size="sm" variant="outline" />}
          >
            Delay close (1000ms)
          </TooltipTrigger>
          <TooltipPopup>Tooltip content</TooltipPopup>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### Controlled

Control `open` and `onOpenChange` on `Tooltip` when the open state needs to be managed externally.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover me
          </TooltipTrigger>
          <TooltipPopup>Tooltip content</TooltipPopup>
        </Tooltip>
        <p className="text-sm text-muted-foreground">
          State: {open ? "Open" : "Closed"}
        </p>
      </div>
    </TooltipProvider>
  );
}
```

### Custom Content

`TooltipPopup` accepts arbitrary content.

```tsx
import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipCustomContentDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipPopup>
          <div className="px-1 py-2">
            <p className="text-sm font-bold">Custom content</p>
            <p className="text-xs">This is a custom tooltip content.</p>
          </div>
        </TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### Shared Tooltip Root

To animate a tooltip as it moves between triggers, create one shared handle and pass it to each trigger and its single `Tooltip` root. A `TooltipProvider` coordinates the group, but the handle is what makes the popup shared. The Positioner transitions its position, the Popup transitions its dimensions, and the built-in viewport transitions the content.

```tsx
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
```

## Popup Animation

Set `animationPreset` on `TooltipPopup`. The gallery uses each preset's exact prop value as its trigger label. `scale` is the default. Use `transitionPreset` to select the timing curve, or `reduceMotion` to disable animation. This preview uses one shared tooltip root, so it also animates as you move between presets.

```tsx
import type { ComponentProps } from "react";

import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof TooltipPopup>["animationPreset"]
>[];

const animationTooltip = Tooltip.createHandle<(typeof presets)[number]>();

export default function TooltipAnimationDemo() {
  return (
    <TooltipProvider>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {presets.map((preset) => (
          <TooltipTrigger
            key={preset}
            handle={animationTooltip}
            payload={preset}
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            {preset}
          </TooltipTrigger>
        ))}
      </div>

      <Tooltip handle={animationTooltip}>
        {({ payload }) => (
          <TooltipPopup animationPreset={payload}>
            {payload} tooltip
          </TooltipPopup>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
```

## API Reference

`Tooltip` and its parts wrap the corresponding [Base UI Tooltip primitives](https://base-ui.com/react/components/tooltip). Supported Base UI props pass through.

### Props

#### TooltipProvider

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `delay` | `number` | `300` | Sets the delay before a tooltip in the provider group opens. |

#### TooltipPopup

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `animationPreset` | `"none" \| "scale" \| "fade" \| "slideOutside" \| "slideInside" \| "motion" \| "motionBlur"` | `scale` | Sets the popup enter and exit animation. |
| `reduceMotion` | `boolean` | `false` | Disables popup animation. |
| `showArrow` | `boolean` | `false` | Renders an arrow pointing at the trigger. |
