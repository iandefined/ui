# Dialog

A modal window for focused tasks that require user interaction.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Dialog` for focused tasks such as editing a record, confirming an action, or completing a short form without leaving the current page.

## Preview

## Installation

## Usage

```tsx
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger render={<Button>Open dialog</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog title</DialogTitle>
      <DialogDescription>Supporting text for the task.</DialogDescription>
    </DialogHeader>
    <DialogBody>Dialog content.</DialogBody>
    <DialogFooter>
      <DialogCloseTrigger render={<Button variant="outline">Cancel</Button>} />
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

## Composition

```tsx
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger />
  <DialogContent>
    <DialogHeader>
      <DialogTitle />
      <DialogDescription />
    </DialogHeader>
    <DialogBody />
    <DialogFooter>
      <DialogCloseTrigger />
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

`DialogContent` composes the portal, backdrop, and viewport. Place the content parts directly inside it. Use `DialogBody` for content that should scroll independently from the header and footer.

## Examples

### Controlled

Control `open` and `onOpenChange` when the surrounding flow owns the dialog state.

### With Form

Place a native `<form>` inside `DialogContent` and close it after a successful submit.

### Scrollable Content

The default `scroll="inside"` mode keeps the header and footer visible while `DialogBody` scrolls.

### Outside Scroll

Set `scroll="outside"` when the entire dialog card should move through the viewport.

### Inset Footer

Set `variant="inset"` to separate the footer with a muted background and top border.

### Non-dismissible

Set `dismissible={false}` when the user must complete an action before the
dialog can close. This prevents outside presses and Escape from dismissing the
dialog. Compose `DialogCloseTrigger` around each button that is allowed to
close it.

### Nested Dialogs

Render another `Dialog` inside the first dialog when a secondary action needs its own focus scope.

### Detached Trigger

Use `createDialogHandle()` to connect a trigger and dialog root that live in different parts of the tree.

### Non-Modal

Pass `modal={false}` for a floating dialog that leaves the page interactive and does not dismiss from outside presses.

## Accessibility

Include a `DialogTitle` for every dialog and use `DialogDescription` for supporting context when the task needs it. Base UI manages the dialog role, focus trap, Escape handling, and focus restoration.

Dismissible dialogs include a default corner close action with the accessible name
`Close`; add a footer close action when the dialog uses `scroll="outside"` and
the header can move out of view.

For `dismissible={false}`, provide at least one visible `DialogCloseTrigger` and
compose it around the button content with `render`.

`scroll="outside"` initially focuses the popup so a tall dialog does not open scrolled past its title. Pass `initialFocus` to choose another target. For `modal={false}`, the page remains interactive and the default pointer dismissal is disabled.

## API Reference

`Dialog` and its parts wrap the corresponding [Base UI Dialog primitives](https://base-ui.com/react/components/dialog). Supported Base UI props pass through. The reference below covers the registry-owned behavior and defaults.

### Props

#### Dialog

Allows outside presses and Escape to dismiss the dialog. When `false`, the
default corner close is omitted and the dialog can close only through
`DialogCloseTrigger` or an externally controlled `open` value.
Controls focus trapping, page scrolling, and pointer interaction outside the
dialog. `false` leaves the page interactive, while `"trap-focus"` traps
focus without locking page scrolling.
Prevents outside presses from closing the dialog. It defaults to `true` when
`modal` is `false` or `"trap-focus"`.

#### DialogContent

Selects the dialog frame treatment. `"inset"` adds a muted footer surface
when `DialogFooter` is present.
Chooses whether `DialogBody` or the surrounding viewport scrolls.
>
Chooses the element that receives focus when the dialog opens. In
`"outside"` scroll mode, the popup is the default target.

#### DialogBody

Uses the browser's native scrolling instead of the registry scrollbar.
Selects the edges that receive a scroll fade. `true` fades both axes and
`false` disables fades.
Reserves space for the scrollbar to reduce content movement while scrolling.
Keeps the custom scrollbar visible instead of showing it only while
interacting with the scroll area.
Hides the custom scrollbar while keeping the body scrollable.

### Utilities

#### `createDialogHandle`

Create a handle once, pass it to a detached `DialogTrigger` and `Dialog`, and optionally provide a payload type for shared dialogs.

```tsx
import {
  createDialogHandle,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type User = { id: string; name: string };

const handle = createDialogHandle<User>();

<DialogTrigger handle={handle} payload={{ id: "u1", name: "Jane" }}>
  Edit Jane
</DialogTrigger>;

<Dialog handle={handle}>
  <DialogContent>
    {({ payload }) => <DialogTitle>Edit {payload?.name}</DialogTitle>}
  </DialogContent>
</Dialog>;
```
