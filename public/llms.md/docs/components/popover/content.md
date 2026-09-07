# Popover

An accessible popup anchored to a button.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Popover` to reveal contextual content anchored to a trigger without navigating away.

## Preview

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverDefaultDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription className="mt-2">
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/popover.json
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

## Composition

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

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverWithArrowDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverPopup showArrow sideOffset={8} className="w-72">
        <PopoverTitle>With arrow</PopoverTitle>
        <PopoverDescription className="mt-2">
          The arrow points toward the trigger.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
```

### Sides

Pass `side` to `PopoverPopup` to change the side of the popover. The default is `bottom`.

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

const sides = [
  "top",
  "right",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

export default function PopoverSidesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            <span>{side}</span>
          </PopoverTrigger>
          <PopoverPopup showArrow side={side} sideOffset={8} className="w-56">
            <PopoverTitle className="text-base">{side}</PopoverTitle>
            <PopoverDescription className="mt-2">
              This popover is positioned on the {side} side.
            </PopoverDescription>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
```

### Open on Hover

By default, Popover opens when the trigger is clicked. Pass `openOnHover` to `PopoverTrigger` to open it when the trigger is hovered. Use `delay` and `closeDelay` to control the hover timing.

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverHoverDemo() {
  return (
    <Popover>
      <PopoverTrigger
        delay={200}
        openOnHover
        render={<Button variant="outline" />}
      >
        Hover to open
      </PopoverTrigger>
      <PopoverPopup>
        <PopoverTitle className="text-base">Hover popover</PopoverTitle>
        <PopoverDescription className="mt-2">
          This popover opens after a short delay.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
```

### Modal

The `modal` prop determines whether the popover enters a modal state and how it interacts with the page:

- `false`: keyboard focus and pointer interaction can move between the popover and the page.
- `"trap-focus"`: keyboard focus stays within the popover, while page scrolling and pointer interaction outside it remain enabled. Clicking outside is therefore expected.
- `true`: keyboard focus stays within the popover, page scrolling is locked, and pointer interaction outside it is disabled. Set `dismissible={false}` when it must only close through an explicit `PopoverClose` control.

The included `PopoverPopup` renders the visually hidden close control Base UI needs to enable focus trapping. Add a visible `PopoverClose` when people need an explicit way to close the popover.

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

const modes = [
  {
    label: "Non-modal",
    value: false,
    description:
      "Focus and pointer interaction can move between the popover and the page.",
  },
  {
    label: "Trap keyboard focus",
    value: "trap-focus",
    description:
      "Keyboard focus stays here, but you can still interact with the page.",
  },
  {
    label: "Block page interaction",
    value: true,
    description:
      "Focus stays here and the rest of the page cannot be interacted with.",
  },
] as const;

export default function PopoverModalDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {modes.map((mode) => (
        <Popover
          key={mode.label}
          modal={mode.value}
          dismissible={mode.value !== true}
        >
          <PopoverTrigger render={<Button variant="outline" />}>
            {mode.label}
          </PopoverTrigger>
          <PopoverPopup className="w-64">
            <PopoverTitle className="text-base">{mode.label}</PopoverTitle>
            <PopoverDescription className="mt-2">
              {mode.description}
            </PopoverDescription>
            <PopoverClose className="mt-4" render={<Button size="sm" />}>
              Close
            </PopoverClose>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
```

### Offset

Pass `sideOffset` to `PopoverPopup` to change the offset of the popover. The default is `4`.

```tsx
import { Button } from "@/registry/base/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@/registry/base/popover";

const offsets = [4, 16, -16] as const;

export default function PopoverOffsetDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {offsets.map((offset) => (
        <Popover key={offset}>
          <PopoverTrigger render={<Button size="sm" variant="outline" />}>
            {offset === 4 ? "Default offset (4)" : `${offset} offset`}
          </PopoverTrigger>
          <PopoverPopup sideOffset={offset}>Popover content</PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
```

### Controlled

Control `open` and `onOpenChange` on `Popover` when the open state needs to be managed externally.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger render={<Button variant="outline" />}>
          {open ? "Close popover" : "Open popover"}
        </PopoverTrigger>
        <PopoverPopup>
          <PopoverTitle className="text-base">Controlled popover</PopoverTitle>
          <PopoverDescription className="mt-2">
            The open state is managed by the parent.
          </PopoverDescription>
        </PopoverPopup>
      </Popover>
      <p className="text-sm text-muted-foreground">
        State: {open ? "Open" : "Closed"}
      </p>
    </div>
  );
}
```

### With Form

Popover content can contain interactive form controls.

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";
import { Textarea } from "@/registry/base/textarea";

export default function PopoverWithFormDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Send feedback
      </PopoverTrigger>
      <PopoverPopup className="w-80">
        <div className="mb-4">
          <PopoverTitle className="text-base">Send us feedback</PopoverTitle>
          <PopoverDescription className="mt-2">
            Let us know how we can improve.
          </PopoverDescription>
        </div>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <Textarea
            aria-label="Send feedback"
            placeholder="How can we improve?"
          />
          <Button type="submit">Send feedback</Button>
        </form>
      </PopoverPopup>
    </Popover>
  );
}
```

### Backdrop

Pass `backdrop` to `Popover` to choose how the page appears while the popover is open. The default is `transparent`.

#### Opaque

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverBackdropOpaqueDemo() {
  return (
    <Popover backdrop="opaque" modal>
      <PopoverTrigger render={<Button variant="outline" />}>
        Opaque backdrop
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Opaque backdrop</PopoverTitle>
        <PopoverDescription className="mt-2">
          The page is dimmed while the popover is open.
        </PopoverDescription>
        <PopoverClose className="mt-4" render={<Button size="sm" />}>
          Close
        </PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
```

#### Blur

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverBackdropBlurDemo() {
  return (
    <Popover backdrop="blur" modal>
      <PopoverTrigger render={<Button variant="outline" />}>
        Blur backdrop
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Blur backdrop</PopoverTitle>
        <PopoverDescription className="mt-2">
          The page is blurred while the popover is open.
        </PopoverDescription>
        <PopoverClose className="mt-4" render={<Button size="sm" />}>
          Close
        </PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
```

#### Transparent

```tsx
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverBackdropTransparentDemo() {
  return (
    <Popover backdrop="transparent" modal>
      <PopoverTrigger render={<Button variant="outline" />}>
        Transparent backdrop
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Transparent backdrop</PopoverTitle>
        <PopoverDescription className="mt-2">
          The page stays visible while outside interaction remains blocked.
        </PopoverDescription>
        <PopoverClose className="mt-4" render={<Button size="sm" />}>
          Close
        </PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
```

### Custom Trigger

Use the `render` prop to compose a custom trigger. This example also uses `openOnHover` to open the popover when the trigger is hovered.

```tsx
import { BellIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverCustomTriggerDemo() {
  return (
    <Popover>
      <PopoverTrigger
        delay={200}
        openOnHover
        render={
          <Button aria-label="Notifications" size="icon" variant="outline" />
        }
      >
        <BellIcon aria-hidden="true" />
      </PopoverTrigger>
      <PopoverPopup side="top" sideOffset={8} className="w-64">
        <PopoverTitle className="text-base">Notifications</PopoverTitle>
        <PopoverDescription className="mt-2">
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
```

### Popup Animations

Choose an `animationPreset` on `PopoverPopup`. This gallery uses each preset's exact prop value as its trigger label.

```tsx
import { useState, type ComponentProps } from "react";

import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof PopoverPopup>["animationPreset"]
>[];

const animationPopover = Popover.createHandle<(typeof presets)[number]>();

export default function PopoverAnimationDemo() {
  const [animationPreset, setAnimationPreset] = useState<
    (typeof presets)[number]
  >(presets[0]);

  return (
    <Popover handle={animationPopover}>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {presets.map((preset) => (
          <PopoverTrigger
            key={preset}
            handle={animationPopover}
            onClick={() => setAnimationPreset(preset)}
            payload={preset}
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            {preset}
          </PopoverTrigger>
        ))}
      </div>

      <PopoverPopup animationPreset={animationPreset} className="w-72">
        <PopoverTitle>{animationPreset} popover</PopoverTitle>
        <PopoverDescription className="mt-2">
          This popover uses the {animationPreset} animation preset.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
```

## API Reference

`Popover` and its parts wrap the corresponding [Base UI Popover primitives](https://base-ui.com/react/components/popover). Supported Base UI props pass through.

### Props

#### PopoverPopup

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `animationPreset` | `"none" \| "scale" \| "fade" \| "slideOutside" \| "slideInside" \| "motion" \| "motionBlur"` | `scale` | Sets the popup enter and exit animation. |
| `reduceMotion` | `boolean` | `false` | Disables popup animation. |
| `showArrow` | `boolean` | `false` | Renders an arrow pointing at the trigger. |
