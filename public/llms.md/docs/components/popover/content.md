# Popover

An accessible popup anchored to a button.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/popover.json
```

```bash
npm install @base-ui/react clsx tailwind-merge
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Usage

```tsx
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
```

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverPopup>
    <PopoverTitle>Popover Title</PopoverTitle>
    <PopoverDescription>Popover Description</PopoverDescription>
    <PopoverClose render={<Button variant="ghost" />}>Close</PopoverClose>
  </PopoverPopup>
</Popover>
```

## Anatomy

```tsx
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

<Popover>
  <PopoverTrigger />
  <PopoverPopup>
    <PopoverTitle />
    <PopoverDescription />
  </PopoverPopup>
</Popover>;
```

## Examples

### With Arrow

Pass `showArrow` to `PopoverPopup` to show an arrow. Keep `sideOffset` at 8 or more so it has room.

### Sides

Pass `side` to `PopoverPopup` to change the side of the popover. The default is `bottom`.

### Open on Hover

By default, Popover opens when the trigger is clicked. Pass `openOnHover` to `PopoverTrigger` to open it when the trigger is hovered. Use `delay` and `closeDelay` to control the hover timing.

### Modal

The `modal` prop determines whether the popover enters a modal state and how it interacts with the page:

- `false`: keyboard focus and pointer interaction can move between the popover and the page.
- `"trap-focus"`: keyboard focus stays within the popover, while page scrolling and pointer interaction outside it remain enabled. Clicking outside is therefore expected.
- `true`: keyboard focus stays within the popover, page scrolling is locked, and pointer interaction outside it is disabled.

The included `PopoverPopup` renders the visually hidden close control Base UI needs to enable focus trapping. Add a visible `PopoverClose` when people need an explicit way to close the popover.

### Offset

Pass `sideOffset` to `PopoverPopup` to change the offset of the popover. The default is `4`.

### Controlled

Control `open` and `onOpenChange` on `Popover` when the open state needs to be managed externally.

### With Form

Popover content can contain interactive form controls.

### Backdrop

Pass `backdrop` to `Popover` to choose how the page appears while the popover is open. The default is `transparent`.

#### Opaque

#### Blur

#### Transparent

### Custom Trigger

Use the `render` prop to compose a custom trigger. This example also uses `openOnHover` to open the popover when the trigger is hovered.
