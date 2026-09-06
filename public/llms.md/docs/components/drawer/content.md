# Drawer

A swipe gesture drawer with positions, snap points, and nested panels.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Drawer` for a panel that responds to edge swipes and can rest at snap points. It fits mobile navigation, filters, settings, and detail views that benefit from a draggable dismissal gesture.

## Preview

## Installation

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

### Non-dismissible

Set `dismissible={false}` when the user must complete an action before the
drawer can close. This disables outside presses, Escape, swipe dragging, and
swipe dismissal, and removes the thumb. Compose `DrawerCloseTrigger` around each
button that is allowed to close the drawer.

### Positions

Set `position` on `Drawer` to choose the edge where the drawer opens.

| Value      | Description                |
| ---------- | -------------------------- |
| `"bottom"` | Slides up from the bottom. |
| `"top"`    | Slides down from the top.  |
| `"left"`   | Slides in from the left.   |
| `"right"`  | Slides in from the right.  |

### Snap Points

Pass `snapPoints` to create multiple resting positions. `snapToSequentialPoints` prevents fast swipes from skipping a position.

### Floating Surface

Set `variant="floating"` for an inset panel with rounded corners on every edge. The example shows the same surface from all four drawer positions.

### Form Content

Use `DrawerPanel` for form fields and keep actions in `DrawerFooter`.

### Scrollable Content

Keep long content inside `DrawerPanel`. Set `scrollFade` to show fades only where the panel can scroll.

### Nested Drawers

Nest another `Drawer` inside a popup to coordinate parent scaling and child stacking.

### Indent Effect

Wrap the page surface with `DrawerIndent` inside `DrawerProvider` to scale and round it while a drawer is open.

### Menu Rows

Use the drawer menu parts for touch-sized actions, toggles, groups, and single-choice rows.

## Accessibility

Include `DrawerTitle` inside every popup so Base UI can name the dialog. Add `DrawerDescription` when the panel needs supporting context, and provide a visible `DrawerCloseTrigger` for modal drawers. For `dismissible={false}`, provide at least one visible `DrawerCloseTrigger` and compose it around the button content with `render`. `DrawerMenuCheckboxItem` and `DrawerMenuRadioItem` are individually focusable controls, so give the surrounding menu a label when it is not otherwise named.

## API Reference

`Drawer` and its parts wrap [Base UI Drawer primitives](https://base-ui.com/react/components/drawer). Supported Base UI props pass through. The props below are the styles and composition options owned by this registry component.

### Props

#### Drawer

Root component that provides the position context and maps it to Base UI's `swipeDirection`.

Allows outside presses, Escape, and swipe gestures to dismiss the drawer.
When `false`, swipe dragging is disabled, the drawer has no thumb, and it
can close only through `DrawerCloseTrigger` or an externally controlled
`open` value.
Chooses the edge where the drawer opens and the direction used for swipe
dismissal. An explicit `swipeDirection` still takes precedence.

#### DrawerPopup

Composes `DrawerPortal`, `DrawerBackdrop`, `DrawerViewport`, and the Base UI `Drawer.Popup`.

Uses a viewport-flush panel for `"default"` or an inset, fully rounded panel
for `"floating"`.
Renders a directional drag handle inside dismissible popups with a
transparent expanded hitbox, an open-hand cursor, and a stronger thumb color
on hover. The bar is omitted when `dismissible={false}`.
Overrides the position inherited from `Drawer`.
Exposes a surface level as `data-level` for consumer styling.
Selects the repository shadow scale used by the popup.

#### DrawerPanel

Wraps panel content in `ScrollArea` and `Drawer.Content` so scrolling and text selection coexist with swipe gestures.

Wraps the panel in the registry `ScrollArea` when enabled.
Enables the vertical `ScrollArea` shadow when the panel has overflow.
Wraps the content in `DrawerContent` so selecting text does not start a
drawer swipe.

#### DrawerHeader and DrawerFooter

Both parts support the Base UI `render` contract through `useRender`. `DrawerFooter` also supports the following props.

Uses standard action spacing or adds a bordered muted footer surface.
Uses `DrawerContent` for selectable footer content.

#### DrawerMenuCheckboxItem

A focusable Base UI checkbox row with a reserved indicator column.

Shows a checkmark or a non-interactive switch visual. The whole row remains
the checkbox control.
Sets the checked switch track color when `indicator="switch"`.
Sets the switch track and thumb shape when `indicator="switch"`.
Sets the switch visual size when `indicator="switch"`.
Chooses the switch visual transition style when `indicator="switch"`.

#### DrawerMenuRadioItem

Focusable radio row for use inside `DrawerMenuRadioGroup`.

Identifies the option within the surrounding radio group.

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
