# Sheet

A sliding panel from a screen edge for navigation, forms, or supplementary content.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Sheet` for a panel that slides in from a screen edge without the draggable behavior of `Drawer`. It fits mobile navigation, filters, settings, and detail views that benefit from a fixed position and an explicit close action.

## Preview

## Installation

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

| Value      | Description                |
| ---------- | -------------------------- |
| `"right"`  | Slides in from the right.  |
| `"left"`   | Slides in from the left.   |
| `"top"`    | Slides down from the top.  |
| `"bottom"` | Slides up from the bottom. |

### Floating Variant

Use `variant="floating"` for a card-like sheet with rounded corners and space around the screen edges. The example includes a trigger for each direction.

### With Form

Place form fields inside `SheetBody` and keep actions in `SheetFooter`. When a
native `<form>` wraps the sheet parts, make it a flex column that fills the
content so the footer can stay pinned to the bottom.

### Nested Sheets

Render another `Sheet` inside the first sheet when a secondary action needs its own focus scope. The nested sheet inherits the parent’s `side`, while the parent scales down and shifts toward its edge behind it. The example includes default and floating nested sheets from each direction so you can compare the surface treatments.

Use the deeper example to inspect five nested `Sheet` instances in sequence.

### Multiple Nested Sheets

Open up to ten nested `Sheet` instances to inspect the stack behavior. The newest three
surfaces remain visible; older surfaces fade out and return as deeper `Sheet` instances
close.

### Inset Footer

Set `footerVariant="inset"` on `SheetContent` to separate the footer with a muted background and top border.

### Non-dismissible

Set `dismissible={false}` when outside presses and Escape should not close the
sheet. Use an explicit `SheetCloseTrigger` for each action that is allowed to
close it.

### Detached Trigger

Use `createSheetHandle()` to connect a trigger and sheet root that live in different parts of the tree.

### Non-Modal

Pass `modal={false}` to keep the page interactive. The backdrop is hidden, pointer events pass through the empty area, and outside presses do not dismiss the sheet.

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

Controls focus trapping, page scrolling, and pointer interaction outside the
sheet. `false` leaves the page interactive, while `"trap-focus"` traps focus
without locking page scrolling.
Allows outside presses and Escape to dismiss the sheet. When `false`, the
sheet can close only through `SheetCloseTrigger` or an externally controlled
`open` value.
Controls the backdrop treatment. Use `"brightness"` for a plain dark
dimmer or `"transparent"` to retain modal interaction without visual
dimming.
Prevents outside presses from closing the sheet. It defaults to `true` when
`modal` is `false` or `"trap-focus"`.

#### SheetContent

Chooses the edge where the sheet opens.
Uses an edge-attached panel for `"default"` or an inset, rounded card for
`"floating"`.
Sets the default treatment used by `SheetFooter` inside this content.
Renders the accessible X `SheetCloseTrigger` in the top corner.
Exposes a surface level as `data-level` for consumer styling.
Selects the shadow intensity independently from the surface level. Positive
values are unbounded; flush sheets cast the shadow toward the content-facing
edge so nested surfaces keep a clear elevation boundary.

#### SheetBody

Uses browser-native scrolling instead of the registry scrollbar.
Selects the edges that receive a scroll fade. `true` fades both axes and
`false` disables fades.
Reserves space for the scrollbar to reduce content movement while scrolling.
Keeps the custom scrollbar visible instead of showing it only while
interacting.
Hides the custom scrollbar while keeping the body scrollable.

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
