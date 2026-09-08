# Sheet

A sliding panel from a screen edge for navigation, forms, or supplementary content.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Sheet` for a panel that slides in from a screen edge without the draggable behavior of `Drawer`. It fits mobile navigation, filters, settings, and detail views that benefit from a fixed position and an explicit close action.

## Preview

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

export default function SheetDefaultDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You are all caught up. Good job!</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm text-muted-foreground">
            New activity will appear here when it needs your attention.
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/sheet.json
```

## Usage

```tsx
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
```

```tsx
<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Notifications</SheetTitle>
      <SheetDescription>You are all caught up. Good job!</SheetDescription>
    </SheetHeader>
    <SheetBody>Sheet content.</SheetBody>
    <SheetFooter>
      <SheetCloseTrigger render={<Button variant="outline" />}>
        Close
      </SheetCloseTrigger>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Composition

`SheetContent` composes the portal, viewport, backdrop, and popup. It renders an accessible X close button by default. Use `SheetBody` for scrollable content and compose `SheetCloseTrigger` around your own button content for additional close actions.

```tsx
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger />
  <SheetContent>
    <SheetHeader>
      <SheetTitle />
    </SheetHeader>
    <SheetBody />
    <SheetFooter>
      <SheetCloseTrigger />
    </SheetFooter>
  </SheetContent>
</Sheet>;
```

## Examples

### Positions

Use `side` on `SheetContent` to choose which edge the sheet slides in from.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const positions = [
  { label: "Top", side: "top" },
  { label: "Bottom", side: "bottom" },
  { label: "Left", side: "left" },
  { label: "Right", side: "right" },
] as const;

export default function SheetPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {positions.map(({ label, side }) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {label}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{label} sheet</SheetTitle>
              <SheetDescription>
                Set <code>side="{side}"</code> to choose where it opens.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
```

| Value      | Description                |
| ---------- | -------------------------- |
| `"right"`  | Slides in from the right.  |
| `"left"`   | Slides in from the left.   |
| `"top"`    | Slides down from the top.  |
| `"bottom"` | Slides up from the bottom. |

### Footer Positions

Compare default and inset footers across every sheet edge. In each case, `SheetBody` owns the long scroll area while `SheetFooter` remains attached to the sheet surface.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetFooterVariant,
  type SheetSide,
} from "@/registry/base/sheet";

const footerVariants: Array<{
  side: SheetSide;
  footerVariant: SheetFooterVariant;
}> = [
  { side: "top", footerVariant: "default" },
  { side: "top", footerVariant: "inset" },
  { side: "bottom", footerVariant: "default" },
  { side: "bottom", footerVariant: "inset" },
  { side: "left", footerVariant: "default" },
  { side: "left", footerVariant: "inset" },
  { side: "right", footerVariant: "default" },
  { side: "right", footerVariant: "inset" },
];

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable sheet content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function SheetFooterPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {footerVariants.map(({ side, footerVariant }) => {
        const sideLabel = capitalize(side);
        const footerLabel = capitalize(footerVariant);

        return (
          <Sheet key={`${side}-${footerVariant}`}>
            <SheetTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {sideLabel}, {footerLabel}
            </SheetTrigger>
            <SheetContent side={side} footerVariant={footerVariant}>
              <SheetHeader>
                <SheetTitle>{sideLabel} sheet</SheetTitle>
                <SheetDescription>
                  The body scrolls independently while the{" "}
                  {footerLabel.toLowerCase()} footer remains attached to the
                  sheet.
                </SheetDescription>
              </SheetHeader>
              <SheetBody fadeEdges="y">
                <div className="grid gap-3">
                  {cards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-lg border bg-muted/40 p-4"
                    >
                      <div className="text-sm font-medium">{card.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </SheetBody>
              <SheetFooter>
                <SheetCloseTrigger
                  render={<Button size="sm" variant="outline" />}
                >
                  Close
                </SheetCloseTrigger>
                <Button size="sm">{footerLabel} action</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
}
```

### Floating Variant

Use `variant="floating"` for a card-like sheet with rounded corners and space around the screen edges. The example includes a trigger for each direction.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const directions = [
  { label: "Top", side: "top" },
  { label: "Bottom", side: "bottom" },
  { label: "Left", side: "left" },
  { label: "Right", side: "right" },
] as const;

export default function SheetFloatingDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {directions.map(({ label, side }) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {label}
          </SheetTrigger>
          <SheetContent side={side} variant="floating">
            <SheetHeader>
              <SheetTitle>{label} floating sheet</SheetTitle>
              <SheetDescription>
                A floating sheet keeps a margin around the panel.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <p className="text-sm text-muted-foreground">
                Use the floating variant when the sheet should read as a card
                above the page instead of a viewport edge.
              </p>
            </SheetBody>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
```

### With Form

Place form fields inside `SheetBody` and keep actions in `SheetFooter`. When a
native `<form>` wraps the sheet parts, make it a flex column that fills the
content so the footer can stay pinned to the bottom.

```tsx
"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

export default function SheetWithFormDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
      <SheetContent>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Update your profile details, then save when you are done.
            </SheetDescription>
          </SheetHeader>
          <SheetBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sheet-email">Email</Label>
              <Input
                id="sheet-email"
                type="email"
                defaultValue="jane@example.com"
              />
            </div>
          </SheetBody>
          <SheetFooter>
            <SheetCloseTrigger
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
```

### Nested Sheets

Render another `Sheet` inside the first sheet when a secondary action needs its own focus scope. The nested sheet inherits the parent’s `side`, while the parent scales down and shifts toward its edge behind it. The example includes default and floating nested sheets from each direction so you can compare the surface treatments.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const nestedDirections = [
  { label: "Top", side: "top", variant: "default" },
  { label: "Bottom", side: "bottom", variant: "default" },
  { label: "Left", side: "left", variant: "default" },
  { label: "Right", side: "right", variant: "default" },
  { label: "Top", side: "top", variant: "floating" },
  { label: "Bottom", side: "bottom", variant: "floating" },
  { label: "Left", side: "left", variant: "floating" },
  { label: "Right", side: "right", variant: "floating" },
] as const;

export default function SheetNestedDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {nestedDirections.map(({ label, side, variant }) => (
        <Sheet key={`${variant}-${side}`}>
          <SheetTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {variant === "floating" ? `${label} floating` : `${label} nested`}
          </SheetTrigger>
          <SheetContent side={side} variant={variant}>
            <SheetHeader>
              <SheetTitle>
                {variant === "floating"
                  ? `${label} floating sheet`
                  : `${label} sheet`}
              </SheetTitle>
              <SheetDescription>
                Open a secondary sheet from the same edge for a separate focus
                scope.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <Sheet>
                <SheetTrigger render={<Button className="w-36" />}>
                  Open nested sheet
                </SheetTrigger>
                <SheetContent variant={variant}>
                  <SheetHeader>
                    <SheetTitle>
                      {variant === "floating"
                        ? `${label} floating nested sheet`
                        : `${label} nested sheet`}
                    </SheetTitle>
                    <SheetDescription>
                      This sheet inherits the direction of its parent.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetBody>
                    <p className="text-sm text-muted-foreground">
                      The parent is rounded and shifts behind this sheet.
                    </p>
                  </SheetBody>
                  <SheetFooter>
                    <SheetCloseTrigger
                      render={<Button variant="outline">Close</Button>}
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </SheetBody>
            <SheetFooter>
              <SheetCloseTrigger
                render={<Button variant="outline">Close</Button>}
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
```

Use the deeper example to inspect five nested `Sheet` instances in sequence.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const MAX_NESTED_LEVEL = 5;

function NestedSheet({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final sheet" : `Open sheet ${level}`}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nested sheet {level}</SheetTitle>
          <SheetDescription>
            This is level {level} of five nested Sheets.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The fifth nested Sheet is now active. Each parent keeps its own
              focus scope and returns focus to its trigger when it closes.
            </p>
          ) : (
            <NestedSheet level={level + 1} />
          )}
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function SheetNestedFiveDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open five nested sheets
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nested Sheets</SheetTitle>
          <SheetDescription>
            Open five Sheets in sequence to inspect the nested stack.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <NestedSheet level={1} />
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Multiple Nested Sheets

Open up to ten nested `Sheet` instances to inspect the stack behavior. The newest three
surfaces remain visible; older surfaces fade out and return as deeper `Sheet` instances
close.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const MAX_NESTED_LEVEL = 10;

function NestedSheet({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final sheet" : `Open sheet ${level}`}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nested sheet {level}</SheetTitle>
          <SheetDescription>
            This is level {level} of ten nested Sheets.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The tenth nested Sheet is now active. Older surfaces fade after
              the three-layer visible stack.
            </p>
          ) : (
            <NestedSheet level={level + 1} />
          )}
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function SheetMultipleNestedDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open multiple nested sheets
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Multiple Nested Sheets</SheetTitle>
          <SheetDescription>
            Open ten Sheets in sequence to inspect the visible stack limit.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <NestedSheet level={1} />
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Inset Footer

Set `footerVariant="inset"` on `SheetContent` to separate the footer with a muted background and top border.

```tsx
import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

export default function SheetInsetFooterDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit profile
      </SheetTrigger>
      <SheetContent footerVariant="inset">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            The inset footer separates actions from the form content.
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sheet-inset-name">Name</Label>
            <Input id="sheet-inset-name" defaultValue="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sheet-inset-handle">Username</Label>
            <Input id="sheet-inset-handle" defaultValue="@janedoe" />
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <SheetCloseTrigger render={<Button>Save changes</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Non-dismissible

Set `dismissible={false}` when outside presses and Escape should not close the
sheet. Use an explicit `SheetCloseTrigger` for each action that is allowed to
close it.

```tsx
import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

export default function SheetNonDismissibleDemo() {
  return (
    <Sheet dismissible={false}>
      <SheetTrigger render={<Button variant="outline" />}>
        Important action
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Confirm action</SheetTitle>
          <SheetDescription>
            This sheet cannot be dismissed by clicking outside or pressing
            Escape.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm text-muted-foreground">
            Use the button below to complete or cancel this action.
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Cancel
          </SheetCloseTrigger>
          <SheetCloseTrigger render={<Button />}>Continue</SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Detached Trigger

Use `createSheetHandle()` to connect a trigger and sheet root that live in different parts of the tree.

```tsx
import { Button } from "@/registry/base/button";
import {
  createSheetHandle,
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const sheetHandle = createSheetHandle();

export default function SheetDetachedTriggerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <SheetTrigger
        handle={sheetHandle}
        render={<Button>Open settings</Button>}
      />
      <Sheet handle={sheetHandle}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              The trigger and sheet root can live in different parts of the
              tree.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <p className="text-sm text-muted-foreground">
              This is useful when a toolbar owns the trigger and a shared sheet
              renders elsewhere in the tree.
            </p>
          </SheetBody>
          <SheetFooter>
            <SheetCloseTrigger
              render={<Button variant="outline">Close</Button>}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```

### Non-Modal

Pass `modal={false}` to keep the page interactive. The backdrop is hidden, pointer events pass through the empty area, and outside presses do not dismiss the sheet.

```tsx
import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

export default function SheetNonModalDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Sheet modal={false}>
        <SheetTrigger render={<Button variant="outline" />}>
          Open floating panel
        </SheetTrigger>
        <SheetContent className="sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Quick note</SheetTitle>
            <SheetDescription>
              The page remains interactive while this sheet is open.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <Input aria-label="Note" placeholder="Type a note..." />
          </SheetBody>
          <SheetFooter>
            <SheetCloseTrigger
              render={<Button variant="outline">Done</Button>}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Input aria-label="Page note" placeholder="Type here while open" />
    </div>
  );
}
```

## Accessibility

Include a `SheetTitle` inside every `SheetContent` so Base UI can name the dialog. Add `SheetDescription` when extra context helps. The built-in close button is labeled Close; add a visible `SheetCloseTrigger` in the footer when the close action should remain available beside the content.

When `modal={true}`, focus moves into the sheet and is trapped until it closes. With `modal={false}`, the page remains interactive and focus is not trapped, so keep an explicit close action available from the keyboard.

When `dismissible={false}`, outside presses and Escape are ignored, but explicit `SheetCloseTrigger` controls remain available.

## API Reference

Sheet and its parts wrap [Base UI Dialog primitives](https://base-ui.com/react/components/dialog). Supported Base UI props pass through. The props below are the styles and composition options owned by this registry component.

### Props

#### Sheet

Root component that forwards Base UI Dialog root props and defaults `modal` and
`dismissible` to `true`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `modal` | `boolean \| 'trap-focus'` | `true` | Controls focus trapping, page scrolling, and pointer interaction outside the sheet. `false` leaves the page interactive, while `"trap-focus"` traps focus without locking page scrolling. |
| `dismissible` | `boolean` | `true` | Allows outside presses and Escape to dismiss the sheet. When `false`, the sheet can close only through `SheetCloseTrigger` or an externally controlled `open` value. |
| `overlay` | `"blur" \| "brightness" \| "transparent"` | `blur` | Controls the backdrop treatment. Use `"brightness"` for a plain dark dimmer or `"transparent"` to retain modal interaction without visual dimming. |
| `disablePointerDismissal` | `boolean` | `-` | Prevents outside presses from closing the sheet. It defaults to `true` when `modal` is `false` or `"trap-focus"`. |

#### SheetContent

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `side` | `"right" \| "left" \| "top" \| "bottom"` | `right` | Chooses the edge where the sheet opens. |
| `variant` | `"default" \| "floating"` | `default` | Uses an edge-attached panel for `"default"` or an inset, rounded card for `"floating"`. |
| `footerVariant` | `"default" \| "inset"` | `default` | Sets the default treatment used by `SheetFooter` inside this content. |
| `showCloseButton` | `boolean` | `true` | Renders the accessible X `SheetCloseTrigger` in the top corner. |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `5` | Exposes a surface level as `data-level` for consumer styling. |
| `shadowLevel` | `number` | `5` | Selects the shadow intensity independently from the surface level. Positive values are unbounded; flush sheets cast the shadow toward the content-facing edge so nested surfaces keep a clear elevation boundary. |

#### SheetBody

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `nativeScroll` | `boolean` | `false` | Uses browser-native scrolling instead of the registry scrollbar. |
| `fadeEdges` | `boolean \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'x' \| 'y' \| SheetFadeEdge[]` | `true` | Selects the edges that receive a scroll fade. `true` fades both axes and `false` disables fades. |
| `scrollbarGutter` | `boolean` | `false` | Reserves space for the scrollbar to reduce content movement while scrolling. |
| `persistScrollbar` | `boolean` | `false` | Keeps the custom scrollbar visible instead of showing it only while interacting. |
| `hideScrollbar` | `boolean` | `false` | Hides the custom scrollbar while keeping the body scrollable. |

### Utilities

#### createSheetHandle

Create a handle once, pass it to a detached `SheetTrigger` and `Sheet`, and optionally provide a payload type for shared sheets.

```tsx
import {
  createSheetHandle,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type User = { id: string; name: string };

const handle = createSheetHandle<User>();

<SheetTrigger handle={handle} payload={{ id: "u1", name: "Jane" }}>
  Edit Jane
</SheetTrigger>;

<Sheet handle={handle}>
  <SheetContent>
    {({ payload }) => <SheetTitle>Edit {payload?.name}</SheetTitle>}
  </SheetContent>
</Sheet>;
```

### Components

| Component           | Responsibility                                        |
| ------------------- | ----------------------------------------------------- |
| `SheetTrigger`      | Opens the sheet and supports Base UI's render prop.   |
| `SheetCloseTrigger` | Closes the sheet and supports Base UI's render prop.  |
| `SheetContent`      | Composes the panel, portal, viewport, and backdrop.   |
| `SheetHeader`       | Provides the standard title and description spacing.  |
| `SheetBody`         | Provides scrollable sheet content.                    |
| `SheetFooter`       | Groups actions and supports the inset footer variant. |
| `SheetTitle`        | Names the dialog for assistive technology.            |
| `SheetDescription`  | Adds supporting context to the sheet.                 |
