# Drawer

A swipe gesture drawer with positions, snap points, and nested panels.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Drawer` for a panel that responds to edge swipes and can rest at snap points. It fits mobile navigation, filters, settings, and detail views that benefit from a draggable dismissal gesture.

## Preview

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerDefaultDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You are all caught up. Good job!
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/drawer.json
```

## Usage

```tsx
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
```

```tsx
<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>
    Open drawer
  </DrawerTrigger>
  <DrawerPopup showBar>
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>You are all caught up. Good job!</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerCloseTrigger render={<Button variant="outline" />}>
        Close
      </DrawerCloseTrigger>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

## Composition

`DrawerPopup` composes the portal, backdrop, viewport, and popup. Use `DrawerPanel` for scrollable or form content, and use `DrawerContent` directly when a custom layout needs text selection without starting a swipe gesture.

```tsx
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

<Drawer>
  <DrawerTrigger />
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle />
      <DrawerDescription />
    </DrawerHeader>
    <DrawerPanel />
    <DrawerFooter>
      <DrawerCloseTrigger />
    </DrawerFooter>
  </DrawerPopup>
</Drawer>;
```

## Examples

### Controlled

Pass `open` and `onOpenChange` when the drawer state belongs to a parent component.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" />}>
          {open ? "Drawer open" : "Open controlled drawer"}
        </DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>Controlled drawer</DrawerTitle>
            <DrawerDescription>
              The parent owns the open state through open and onOpenChange.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerCloseTrigger render={<Button variant="outline" />}>
              Close
            </DrawerCloseTrigger>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
      <p className="text-sm text-muted-foreground" role="status">
        {open ? "Open" : "Closed"}
      </p>
    </div>
  );
}
```

### Non-dismissible

Set `dismissible={false}` when the user must complete an action before the
drawer can close. This disables outside presses, Escape, swipe dragging, and
swipe dismissal, and removes the thumb. Compose `DrawerCloseTrigger` around each
button that is allowed to close the drawer.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerNonDismissibleDemo() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Important action
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Confirm action</DrawerTitle>
          <DrawerDescription>
            This drawer cannot be dismissed by clicking outside, pressing
            Escape, or dragging. Use one of the buttons below.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <p className="text-sm">
            Review the change before continuing. The drawer stays open until you
            choose an action.
          </p>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Cancel
          </DrawerCloseTrigger>
          <DrawerCloseTrigger render={<Button />}>Confirm</DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Positions

Set `position` on `Drawer` to choose the edge where the drawer opens.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
  type DrawerPosition,
} from "@/registry/base/drawer";

const positions: Array<{ value: DrawerPosition; label: string }> = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export default function DrawerPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {positions.map(({ value, label }) => (
        <Drawer key={value} position={value}>
          <DrawerTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {label}
          </DrawerTrigger>
          <DrawerPopup showBar>
            <DrawerHeader>
              <DrawerTitle>{label} drawer</DrawerTitle>
              <DrawerDescription>
                Set position="{value}" on Drawer.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
```

| Value      | Description                |
| ---------- | -------------------------- |
| `"bottom"` | Slides up from the bottom. |
| `"top"`    | Slides down from the top.  |
| `"left"`   | Slides in from the left.   |
| `"right"`  | Slides in from the right.  |

### Snap Points

Pass `snapPoints` to create multiple resting positions. `snapToSequentialPoints` prevents fast swipes from skipping a position. A `DrawerFooter` stays pinned while the panel changes between snap points.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

const sections = [
  "Overview",
  "Activity",
  "Members",
  "Integrations",
  "Notifications",
  "Permissions",
];

export default function DrawerSnapPointsDemo() {
  return (
    <Drawer
      defaultSnapPoint={0.35}
      snapPoints={[0.35, 0.7, 1]}
      snapToSequentialPoints
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Open with snap points
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Project settings</DrawerTitle>
          <DrawerDescription>
            Drag the drawer between three resting positions.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollFade>
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section}
                className="rounded-lg border border-border bg-muted/40 p-3"
              >
                <h3 className="font-medium">{section}</h3>
                <p className="text-sm text-muted-foreground">
                  Configure the {section.toLowerCase()} for this project.
                </p>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Floating Surface

Set `variant="floating"` for an inset panel with rounded corners on every edge. The example shows the same surface from all four drawer positions.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
  type DrawerPosition,
} from "@/registry/base/drawer";

const positions: Array<{ value: DrawerPosition; label: string }> = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export default function DrawerFloatingDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {positions.map(({ value, label }) => (
        <Drawer key={value} position={value}>
          <DrawerTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {label}
          </DrawerTrigger>
          <DrawerPopup showBar variant="floating">
            <DrawerHeader>
              <DrawerTitle>{label} floating drawer</DrawerTitle>
              <DrawerDescription>
                The floating variant adds an inset surface with rounded corners
                from every edge.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerCloseTrigger render={<Button variant="outline" />}>
                Close
              </DrawerCloseTrigger>
            </DrawerFooter>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
```

### Form Content

Use `DrawerPanel` for form fields and keep actions in `DrawerFooter`.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function DrawerWithFormDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Edit profile</DrawerTrigger>
      <DrawerPopup className="max-w-xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Update your details, then save the changes.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drawer-name">Name</Label>
              <Input id="drawer-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drawer-username">Username</Label>
              <Input id="drawer-username" defaultValue="@peduarte" />
            </div>
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Cancel
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Scrollable Content

Keep long content inside `DrawerPanel`. Set `scrollFade` to show fades only where the panel can scroll.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

const items = Array.from({ length: 24 }, (_, index) => index + 1);

export default function DrawerScrollableDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open scrollable drawer
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Recent activity</DrawerTitle>
          <DrawerDescription>
            Scroll the panel, then swipe from the top edge to dismiss it.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollFade>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item} className="rounded-lg border border-border p-3">
                <p className="font-medium">Activity {item}</p>
                <p className="text-sm text-muted-foreground">
                  A short description for this activity entry.
                </p>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Nested Drawers

Nest another `Drawer` inside a popup to coordinate parent scaling and child stacking.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerNestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open nested drawers
      </DrawerTrigger>
      <DrawerPopup className="max-w-2xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>
            Open another drawer without losing the parent context.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <p className="text-sm text-muted-foreground">
            Nested drawers scale the parent surface and keep a small peek of it
            visible while the child is open.
          </p>
        </DrawerPanel>
        <DrawerFooter>
          <Drawer>
            <DrawerMenuTrigger>View account details</DrawerMenuTrigger>
            <DrawerPopup className="max-w-2xl" showBar>
              <DrawerHeader>
                <DrawerTitle>Account details</DrawerTitle>
                <DrawerDescription>
                  This panel is nested inside the account drawer.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerCloseTrigger render={<Button variant="outline" />}>
                  Close details
                </DrawerCloseTrigger>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Multiple Nested Drawers

Open up to ten nested Drawers to inspect the stack behavior. The newest three
surfaces remain visible; older surfaces fade out and return as deeper Drawers
close.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

const MAX_NESTED_LEVEL = 10;

function NestedDrawer({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final drawer" : `Open drawer ${level}`}
      </DrawerTrigger>
      <DrawerPopup className="max-w-2xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Nested drawer {level}</DrawerTitle>
          <DrawerDescription>
            This is level {level} of ten nested Drawers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The tenth nested Drawer is now active. Older surfaces fade after
              the three-layer visible stack.
            </p>
          ) : (
            <NestedDrawer level={level + 1} />
          )}
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}

export default function DrawerMultipleNestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open multiple nested drawers
      </DrawerTrigger>
      <DrawerPopup className="max-w-2xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Multiple Nested Drawers</DrawerTitle>
          <DrawerDescription>
            Open ten Drawers in sequence to inspect the visible stack limit.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <NestedDrawer level={1} />
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Indent Effect

Wrap the page surface with `DrawerIndent` inside `DrawerProvider` to scale and round it while a drawer is open.

```tsx
import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerProvider,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerIndentDemo() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <DrawerProvider>
        <DrawerIndentBackground className="absolute" />
        <DrawerIndent className="relative flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
          <p className="max-w-sm text-sm text-muted-foreground">
            The page content scales and rounds while the drawer is open.
          </p>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Open with indent effect
            </DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>Indent effect</DrawerTitle>
                <DrawerDescription>
                  DrawerIndent coordinates the background treatment with the
                  provider.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerCloseTrigger render={<Button variant="outline" />}>
                  Close
                </DrawerCloseTrigger>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerIndent>
      </DrawerProvider>
    </div>
  );
}
```

### Menu Rows

Use the drawer menu parts for touch-sized actions, toggles, groups, and single-choice rows.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerMenuDemo() {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [quality, setQuality] = useState("high");

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open settings
      </DrawerTrigger>
      <DrawerPopup className="max-w-xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Checkbox rows toggle immediately, while radio rows choose one
            option.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <DrawerMenu aria-label="Settings">
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Connections</DrawerMenuGroupLabel>
              <DrawerMenuCheckboxItem
                checked={wifi}
                indicator="switch"
                onCheckedChange={setWifi}
              >
                Wi-Fi
              </DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem
                checked={bluetooth}
                indicator="switch"
                onCheckedChange={setBluetooth}
              >
                Bluetooth
              </DrawerMenuCheckboxItem>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Streaming quality</DrawerMenuGroupLabel>
              <DrawerMenuRadioGroup
                value={quality}
                onValueChange={(value) => setQuality(value as string)}
              >
                <DrawerMenuRadioItem value="low">Low</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="standard">
                  Standard
                </DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="high">High</DrawerMenuRadioItem>
              </DrawerMenuRadioGroup>
            </DrawerMenuGroup>
          </DrawerMenu>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

## Accessibility

Include `DrawerTitle` inside every popup so Base UI can name the dialog. Add `DrawerDescription` when the panel needs supporting context, and provide a visible `DrawerCloseTrigger` for modal drawers. For `dismissible={false}`, provide at least one visible `DrawerCloseTrigger` and compose it around the button content with `render`. `DrawerMenuCheckboxItem` and `DrawerMenuRadioItem` are individually focusable controls, so give the surrounding menu a label when it is not otherwise named.

## API Reference

`Drawer` and its parts wrap [Base UI Drawer primitives](https://base-ui.com/react/components/drawer). Supported Base UI props pass through. The props below are the styles and composition options owned by this registry component.

### Props

#### Drawer

Root component that provides the position context and maps it to Base UI's `swipeDirection`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `dismissible` | `boolean` | `true` | Allows outside presses, Escape, and swipe gestures to dismiss the drawer. When `false`, swipe dragging is disabled, the drawer has no thumb, and it can close only through `DrawerCloseTrigger` or an externally controlled `open` value. |
| `overlay` | `"blur" \| "brightness" \| "transparent"` | `blur` | Controls the backdrop treatment. Use `"brightness"` for a plain dark dimmer or `"transparent"` to retain modal interaction without visual dimming. |
| `position` | `"top" \| "right" \| "bottom" \| "left"` | `bottom` | Chooses the edge where the drawer opens and the direction used for swipe dismissal. An explicit `swipeDirection` still takes precedence. |

#### DrawerPopup

Composes `DrawerPortal`, `DrawerBackdrop`, `DrawerViewport`, and the Base UI `Drawer.Popup`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "floating"` | `default` | Uses a viewport-flush panel for `"default"` or an inset, fully rounded panel for `"floating"`. |
| `showBar` | `boolean` | `false` | Renders a directional drag handle inside dismissible popups with a transparent expanded hitbox, an open-hand cursor, and a stronger thumb color on hover. The bar is omitted when `dismissible={false}`. |
| `position` | `"top" \| "right" \| "bottom" \| "left"` | `-` | Overrides the position inherited from `Drawer`. |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `5` | Exposes a surface level as `data-level` for consumer styling. |
| `shadowLevel` | `number` | `5` | Selects the repository shadow scale used by the popup. Positive values are unbounded; flush drawers cast the shadow toward the content-facing edge so nested surfaces keep a clear elevation boundary. |

#### DrawerPanel

Wraps panel content in `ScrollArea` and `Drawer.Content` so scrolling and text selection coexist with swipe gestures.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `scrollable` | `boolean` | `true` | Wraps the panel in the registry `ScrollArea` when enabled. |
| `scrollFade` | `boolean` | `false` | Enables the vertical `ScrollArea` shadow when the panel has overflow. |
| `allowSelection` | `boolean` | `true` | Wraps the content in `DrawerContent` so selecting text does not start a drawer swipe. |

#### DrawerHeader and DrawerFooter

Both parts support the Base UI `render` contract through `useRender`. `DrawerFooter` also supports the following props.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "inset"` | `default` | Uses standard action spacing or adds a bordered muted footer surface. |
| `allowSelection` | `boolean` | `true` | Uses `DrawerContent` for selectable footer content. |

#### DrawerMenuCheckboxItem

A focusable Base UI checkbox row with a reserved indicator column.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `indicator` | `"check" \| "switch"` | `check` | Shows a checkmark or a non-interactive switch visual. The whole row remains the checkbox control. |
| `switchColor` | `"primary" \| "neutral"` | `primary` | Sets the checked switch track color when `indicator="switch"`. |
| `switchShape` | `"circle" \| "pill" \| "squircle"` | `circle` | Sets the switch track and thumb shape when `indicator="switch"`. |
| `switchSize` | `"xs" \| "sm" \| "default" \| "lg"` | `sm` | Sets the switch visual size when `indicator="switch"`. |
| `switchMotion` | `"default" \| "stretch"` | `default` | Chooses the switch visual transition style when `indicator="switch"`. |

#### DrawerMenuRadioItem

Focusable radio row for use inside `DrawerMenuRadioGroup`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `-` | Identifies the option within the surrounding radio group. |

### Components

| Component                | Responsibility                                             |
| ------------------------ | ---------------------------------------------------------- |
| `DrawerTrigger`          | Opens the drawer and supports Base UI's `render` prop.     |
| `DrawerCloseTrigger`     | Closes the drawer and supports Base UI's `render` prop.    |
| `DrawerBar`              | Renders the hoverable directional drag handle and hitbox.  |
| `DrawerContent`          | Wraps selectable custom content with `Drawer.Content`.     |
| `DrawerProvider`         | Coordinates indent state for related drawers.              |
| `DrawerIndent`           | Scales and rounds the page surface while a drawer is open. |
| `DrawerIndentBackground` | Renders the background layer for the indent effect.        |
| `DrawerSwipeArea`        | Adds an invisible edge area for swipe-to-open gestures.    |
| `DrawerMenu`             | Groups drawer menu rows in a semantic `nav`.               |
| `DrawerMenuItem`         | Renders an action row.                                     |
| `DrawerMenuTrigger`      | Renders a row that opens a nested drawer.                  |
| `DrawerMenuSeparator`    | Divides menu groups.                                       |
| `DrawerMenuGroup`        | Groups related menu rows.                                  |
| `DrawerMenuGroupLabel`   | Labels a menu group.                                       |
| `DrawerMenuRadioGroup`   | Coordinates single-choice rows.                            |

### Drawer CSS Variables

Base UI exposes these values on the popup while it is being swiped or snapped.

| Variable                     | Description                                     |
| ---------------------------- | ----------------------------------------------- |
| `--drawer-swipe-progress`    | Progress toward dismissal, from `0` to `1`.     |
| `--drawer-swipe-movement-x`  | Horizontal swipe offset in pixels.              |
| `--drawer-swipe-movement-y`  | Vertical swipe offset in pixels.                |
| `--drawer-swipe-strength`    | Velocity-based value used for dismissal timing. |
| `--drawer-snap-point-offset` | Offset created by the active snap point.        |
| `--drawer-height`            | Current drawer height.                          |
| `--drawer-frontmost-height`  | Height of the frontmost nested drawer.          |
| `--nested-drawers`           | Number of nested drawers currently open.        |
