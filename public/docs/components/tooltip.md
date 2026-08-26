# Tooltip

Displays contextual information when a user hovers or focuses an element.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Preview

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/tooltip.json
```

```bash
npm install @base-ui/react tailwind-variants clsx tailwind-merge
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Anatomy

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

### Basic

### With Arrow

Set `showArrow` to display the tooltip arrow. Keep `sideOffset` at 8 or more so it has room.

### Sides

Set `side` on `TooltipPopup` to control its position. The default is `top`. The preview follows the Dropdown Menu sides layout, includes the logical `inline-start` and `inline-end` positions, and uses one shared tooltip handle so the popup animates between triggers.

### Offset

Set `sideOffset` to control the distance between the trigger and popup. Its default is `4`.

### Delay

Set `delay` or `closeDelay` on `TooltipTrigger` to control each tooltip. `TooltipProvider` also accepts `delay` to configure a group; its default is 300ms.

### Controlled

Control `open` and `onOpenChange` on `Tooltip` when the open state needs to be managed externally.

### Custom Content

`TooltipPopup` accepts arbitrary content.

### Shared Tooltip Root

To animate a tooltip as it moves between triggers, create one shared handle and pass it to each trigger and its single `Tooltip` root. A `TooltipProvider` coordinates the group, but the handle is what makes the popup shared. The Positioner transitions its position, the Popup transitions its dimensions, and the built-in viewport transitions the content.

## Popup Animation

Set `animationPreset` on `TooltipPopup`. Pure UI supports `scale`, `fade`, `slideOutside`, `slideInside`, `wipe`, `wipeScale`, `motion`, and `motionBlur`; `scale` is the default. Use `transitionPreset` to select the timing curve, or `reduceMotion` to disable animation. This preview uses one shared tooltip root, so it also animates as you move between presets.

## Base UI vs Radix UI

- Use `render` on `TooltipTrigger` instead of `asChild`.
- Prefer `TooltipPopup` over `TooltipContent`.
- Compose the trigger with a native button or a Button passed through `render`.
