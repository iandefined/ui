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

### Footer Positions

`DrawerFooter` remains below the independently scrollable panel and follows top, left, and right drawer surfaces as they move. Passing `sticky` is safe in these positions but intentionally does not counter-translate the footer: pinning it to the viewport would detach it from the closing surface. Viewport-pinned movement and snap-point compensation are specific to bottom drawers.

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
  type DrawerPosition,
} from "@/registry/base/drawer";

const footerVariants: Array<{
  position: Exclude<DrawerPosition, "bottom">;
  sticky: boolean;
}> = [
  { position: "top", sticky: false },
  { position: "top", sticky: true },
  { position: "left", sticky: false },
  { position: "left", sticky: true },
  { position: "right", sticky: false },
  { position: "right", sticky: true },
];

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable drawer content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

export default function DrawerFooterPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {footerVariants.map(({ position, sticky }) => {
        const positionLabel =
          position.charAt(0).toUpperCase() + position.slice(1);
        const behaviorLabel = sticky ? "Sticky" : "Following";

        return (
          <Drawer key={`${position}-${behaviorLabel}`} position={position}>
            <DrawerTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {positionLabel}, {behaviorLabel}
            </DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>{positionLabel} drawer</DrawerTitle>
                <DrawerDescription>
                  {sticky
                    ? "Viewport pinning is bottom-only, so this footer remains safely attached to the surface."
                    : `This footer follows the drawer toward the ${position} edge.`}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerPanel scrollFade>
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
              </DrawerPanel>
              <DrawerFooter sticky={sticky} className="border-t py-4">
                <DrawerCloseTrigger
                  render={<Button size="sm" variant="outline" />}
                >
                  Close
                </DrawerCloseTrigger>
                <Button size="sm">{behaviorLabel} action</Button>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        );
      })}
    </div>
  );
}
```

### Snap Points

Pass `snapPoints` to create multiple resting positions. `snapToSequentialPoints` prevents fast swipes from skipping a position. Add `sticky` to `DrawerFooter` when it should stay pinned while the panel changes between snap points.

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
        <DrawerFooter sticky>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Sticky Footer

Use `<DrawerFooter sticky>` with `border-t` to keep action buttons or inputs pinned at the bottom edge while long content scrolls inside `DrawerPanel`. Without `sticky`, the footer remains part of the drawer surface and moves with it during a swipe. Combined with snap points, a sticky footer remains anchored as the drawer moves between heights.

```tsx
"use client";

import { HeartIcon, MessageSquareIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";
import { Input } from "@/registry/base/input";

const comments = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "AC",
    text: "This is absolutely stunning! The attention to detail is incredible.",
    time: "2h",
    likes: 24,
  },
  {
    id: 2,
    user: "Maria Garcia",
    avatar: "MG",
    text: "Love this so much! 😍",
    time: "1h",
    likes: 8,
  },
  {
    id: 3,
    user: "James Wilson",
    avatar: "JW",
    text: "Where can I get this? Asking for a friend 👀",
    time: "45m",
    likes: 12,
  },
  {
    id: 4,
    user: "Sophie Turner",
    avatar: "ST",
    text: "The colors are perfect together!",
    time: "30m",
    likes: 5,
  },
  {
    id: 5,
    user: "David Kim",
    avatar: "DK",
    text: "Been following your work for a while, this might be your best yet.",
    time: "15m",
    likes: 18,
  },
  {
    id: 6,
    user: "Emma Roberts",
    avatar: "ER",
    text: "Shared this with all my friends!",
    time: "10m",
    likes: 3,
  },
  {
    id: 7,
    user: "Chris Johnson",
    avatar: "CJ",
    text: "This is inspiring me to start creating again.",
    time: "5m",
    likes: 7,
  },
];

export default function DrawerStickyFooterDemo() {
  const [newComment, setNewComment] = React.useState("");

  return (
    <Drawer defaultSnapPoint={0.4} snapPoints={[0.4, 1]} snapToSequentialPoints>
      <DrawerTrigger render={<Button variant="outline" />}>
        <span className="flex items-center gap-2">
          <MessageSquareIcon className="size-4" />
          {comments.length} Comments
        </span>
      </DrawerTrigger>
      <DrawerPopup showBar className="max-w-2xl">
        <DrawerHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle>Comments</DrawerTitle>
            <span className="text-muted-foreground text-sm">
              {comments.length} comments
            </span>
          </div>
        </DrawerHeader>
        <DrawerPanel scrollFade className="py-4!">
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.user}</span>
                    <span className="text-muted-foreground text-xs">
                      {comment.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{comment.text}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <button
                      type="button"
                      className="text-muted-foreground flex items-center gap-1 text-xs hover:text-red-500"
                    >
                      <HeartIcon className="size-3.5" />
                      <span className="tabular-nums">{comment.likes}</span>
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground text-xs hover:underline"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter sticky className="border-t py-4 sm:flex-row">
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newComment.trim()) return;
              setNewComment("");
            }}
          >
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newComment.trim()}>
              Post
            </Button>
          </form>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### Floating Surface

Set `variant="floating"` for an inset panel with rounded corners on every edge. The example shows the same surface from all four drawer positions. Bottom floating drawers with snap points resize a rounded, clipped surface from its viewport-anchored bottom edge so the footer and perimeter remain visible at every height.

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

Use `DrawerMenuRow` to compose existing inputs such as `Switch`, `Checkbox`, `Radio`, and `Select` into a touch-sized drawer layout. The example also uses `TransitionPanel` to reveal related settings without opening another drawer.

```tsx
"use client";

import {
  ArrowLeftIcon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Globe2Icon,
  MonitorIcon,
  MoonIcon,
  NewspaperIcon,
  PaletteIcon,
  SunIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuRow,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";
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
import { Switch } from "@/registry/base/switch";
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/registry/base/transition-panel";

const languages = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "Español", value: "es" },
];

const themes = [
  { icon: MonitorIcon, label: "System", value: "system" },
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
];

export default function DrawerMenuDemo() {
  const [view, setView] = useState("menu");
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [language, setLanguage] = useState<string | null>("en");
  const [theme, setTheme] = useState("system");

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open settings
      </DrawerTrigger>
      <DrawerPopup className="max-w-xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Workspace settings</DrawerTitle>
          <DrawerDescription>
            Compose drawer rows with the same controls used throughout your
            application.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollFade>
          <TransitionPanel activeKey={view}>
            <TransitionPanelView viewKey="menu" initialFocus={false}>
              <DrawerMenu aria-label="Workspace settings">
                <DrawerMenuGroup>
                  <DrawerMenuGroupLabel>General</DrawerMenuGroupLabel>
                  <DrawerMenuItem onClick={() => setView("appearance")}>
                    <PaletteIcon aria-hidden="true" />
                    <span className="min-w-0 flex-1 text-start">
                      <span className="block font-medium">Appearance</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Theme and motion preferences
                      </span>
                    </span>
                    <span className="ms-auto text-xs text-muted-foreground">
                      {themes.find((option) => option.value === theme)?.label}
                    </span>
                    <ChevronRightIcon aria-hidden="true" />
                  </DrawerMenuItem>
                  <DrawerMenuRow>
                    <Globe2Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 opacity-80"
                    />
                    <span className="min-w-0 flex-1 font-medium">Language</span>
                    <Select
                      items={languages}
                      value={language}
                      onValueChange={(nextValue) =>
                        setLanguage(nextValue as string | null)
                      }
                    >
                      <SelectTrigger
                        aria-label="Language"
                        className="ms-auto min-w-32"
                      >
                        <SelectValue />
                        <SelectIcon>
                          <ChevronDownIcon aria-hidden="true" />
                        </SelectIcon>
                      </SelectTrigger>
                      <SelectPopup>
                        <SelectList>
                          {languages.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <SelectItemText>{option.label}</SelectItemText>
                              <SelectItemIndicator>
                                <CheckIcon
                                  aria-hidden="true"
                                  className="size-3"
                                />
                              </SelectItemIndicator>
                            </SelectItem>
                          ))}
                        </SelectList>
                      </SelectPopup>
                    </Select>
                  </DrawerMenuRow>
                </DrawerMenuGroup>

                <DrawerMenuSeparator />

                <DrawerMenuGroup>
                  <DrawerMenuGroupLabel>Notifications</DrawerMenuGroupLabel>
                  <DrawerMenuRow
                    className="cursor-pointer select-none hover:bg-muted"
                    render={<Label htmlFor="drawer-notifications" />}
                  >
                    <BellIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 opacity-80"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">
                        Desktop notifications
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Alerts for mentions and assigned work
                      </span>
                    </span>
                    <Switch
                      id="drawer-notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                      size="sm"
                    />
                  </DrawerMenuRow>
                  <DrawerMenuRow
                    className="cursor-pointer select-none hover:bg-muted"
                    render={<Label htmlFor="drawer-weekly-digest" />}
                  >
                    <NewspaperIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 opacity-80"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">Weekly digest</span>
                      <span className="block text-xs text-muted-foreground">
                        A Monday summary of workspace activity
                      </span>
                    </span>
                    <Checkbox
                      id="drawer-weekly-digest"
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                    />
                  </DrawerMenuRow>
                </DrawerMenuGroup>
              </DrawerMenu>
            </TransitionPanelView>

            <TransitionPanelView viewKey="appearance">
              <DrawerMenu aria-label="Appearance settings">
                <DrawerMenuItem onClick={() => setView("menu")}>
                  <ArrowLeftIcon aria-hidden="true" />
                  Back to settings
                </DrawerMenuItem>
                <DrawerMenuSeparator />
                <DrawerMenuGroup>
                  <DrawerMenuGroupLabel>Color theme</DrawerMenuGroupLabel>
                  <RadioGroup
                    aria-label="Color theme"
                    className="gap-0"
                    value={theme}
                    onValueChange={(nextValue) => setTheme(nextValue as string)}
                  >
                    {themes.map((option) => {
                      const Icon = option.icon;

                      return (
                        <DrawerMenuRow
                          key={option.value}
                          className="cursor-pointer select-none hover:bg-muted"
                          render={<Label />}
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-4 shrink-0 opacity-80"
                          />
                          <span className="flex-1 font-medium">
                            {option.label}
                          </span>
                          <Radio value={option.value} />
                        </DrawerMenuRow>
                      );
                    })}
                  </RadioGroup>
                </DrawerMenuGroup>
                <DrawerMenuSeparator />
                <DrawerMenuRow
                  className="cursor-pointer select-none hover:bg-muted"
                  render={<Label htmlFor="drawer-reduce-motion" />}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">Reduce motion</span>
                    <span className="block text-xs text-muted-foreground">
                      Use simpler interface transitions
                    </span>
                  </span>
                  <Switch
                    id="drawer-reduce-motion"
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                    size="sm"
                  />
                </DrawerMenuRow>
              </DrawerMenu>
            </TransitionPanelView>
          </TransitionPanel>
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

Include `DrawerTitle` inside every popup so Base UI can name the dialog. Add `DrawerDescription` when the panel needs supporting context, and provide a visible `DrawerCloseTrigger` for modal drawers. For `dismissible={false}`, provide at least one visible `DrawerCloseTrigger` and compose it around the button content with `render`. Do not place a composed input inside `DrawerMenuItem`, because the item is already a button. Render `DrawerMenuRow` as a `Label` instead so the row labels the input without nesting interactive controls.

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
| `sticky` | `boolean` | `false` | Keeps a bottom drawer footer pinned while the drawer moves or changes snap points. Top, side, and floating footers remain surface-bound to avoid detaching during dismissal. By default, every footer moves with the drawer surface. |
| `allowSelection` | `boolean` | `true` | Uses `DrawerContent` for selectable footer content. |

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
| `DrawerMenuRow`          | Lays out composed inputs and supporting content.           |
| `DrawerMenuItem`         | Renders an action row.                                     |
| `DrawerMenuTrigger`      | Renders a row that opens a nested drawer.                  |
| `DrawerMenuSeparator`    | Divides menu groups.                                       |
| `DrawerMenuGroup`        | Groups related menu rows.                                  |
| `DrawerMenuGroupLabel`   | Labels a menu group.                                       |

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
