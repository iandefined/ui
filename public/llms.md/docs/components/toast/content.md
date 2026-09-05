# Toast

Displays brief, self-dismissing feedback without blocking the page.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Toast` for transient feedback such as a saved change, a completed upload, or a recoverable error. Use `Dialog` or `AlertDialog` when the user must make a decision before continuing.

## Preview

## Installation

## Usage

Wrap the part of your app that can create notifications with `ToastProvider`, then call `toast()` from an event handler or another client-side function.

```tsx
import { ToastProvider, toast } from "@/components/ui/toast";

function App() {
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  );
}

function SaveButton() {
  return (
    <button type="button" onClick={() => toast({ title: "Changes saved" })}>
      Save
    </button>
  );
}
```

`toast()` accepts an options object or JSX content for custom notification layouts. Add `AnchoredToastProvider` only when the app uses `toast.anchored()`.

```tsx
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";

function App() {
  return (
    <ToastProvider>
      <AnchoredToastProvider>
        <Page />
      </AnchoredToastProvider>
    </ToastProvider>
  );
}
```

## Composition

`ToastProvider` renders the viewport stack and owns its default position. `AnchoredToastProvider` renders element-relative toasts created with `toast.anchored()`. Use the second provider only when contextual, anchor-relative feedback is part of the app.

```tsx
<ToastProvider>
  <AnchoredToastProvider>
    <App />
  </AnchoredToastProvider>
</ToastProvider>
```

## Features

- Six built-in types: `default`, `loading`, `success`, `error`, `warning`, and `info`.
- Fixed `id` values deduplicate repeated notifications by updating the existing toast.
- `toast.promise()` keeps asynchronous loading, success, and error states in one toast.
- Base UI measures variable-height content so the stack can reposition itself as descriptions and actions change.
- This phase does not include `toast.grouped()` or `toast.groupedPromise()`, and it does not reuse the app-only Sonner wrapper.

## Examples

### Types

Use `type` or a type-specific helper to communicate the result of an operation.

| Value     | Use                                               |
| --------- | ------------------------------------------------- |
| `default` | Neutral feedback without a status treatment.      |
| `loading` | Work that is still in progress.                   |
| `success` | A completed operation.                            |
| `error`   | A failed operation.                               |
| `warning` | A risk or caution that does not block the page.   |
| `info`    | Neutral information that is useful in the moment. |

### With Action

Pass an `action` with a visible label and callback for a reversible follow-up such as undo. Use `render` to compose the action with any button component and retain its styling API.

### Deduplication and Update

Pass the same fixed `id` to update a toast in place instead of stacking a duplicate. The returned ID can also be passed to `toast.update()` and `toast.dismiss()`.

### Promise

Use `toast.promise()` for an operation with loading, success, and error messages. It updates the same notification as the promise settles.

```tsx
toast.promise(saveChanges(), {
  loading: { title: "Saving changes" },
  success: { title: "Changes saved" },
  error: { title: "Could not save changes" },
});
```

### Anchored Toast

Use `toast.anchored()` for contextual feedback near the control that caused it. The anchor can be missing or disconnected; the provider keeps the notification safe to dismiss in that case.

```tsx
toast.anchored({
  title: "Copied",
  anchor: buttonRef.current,
  side: "top",
  sideOffset: 8,
  arrow: true,
});
```

### Varying Heights

Toasts measure their content and adjust the stack when titles, descriptions, or actions have different heights.

## Accessibility

Use `priority="low"` for ordinary feedback so screen readers announce it politely without interrupting the current task. Reserve `priority="high"` for urgent failures that need immediate attention.

Actions and close controls remain separate, keyboard-accessible controls. Give action labels enough context to describe the result, such as `Undo upload`, and keep `showCloseButton` enabled when users need a manual dismissal option.

## API Reference

`Toast` wraps the corresponding [Base UI Toast primitives](https://base-ui.com/react/components/toast), including the provider, portal, viewport, root, content, title, description, action, close, positioner, and arrow parts. Supported Base UI props pass through. The reference below covers the registry-owned options and helpers.

### Props

#### `toast()`

`toast()` displays a notification and returns its ID. It accepts object-based options, JSX content for custom layouts, and JSX-friendly React content in `title` and `description`.

Sets a stable ID for the toast. Reusing the ID updates the existing toast in
place and refreshes its dismissal timer.
Sets the primary toast content.
Sets supporting content below the title.
Sets the status treatment and icon behavior.
Sets the time in milliseconds before automatic dismissal. Use `0` to keep
the toast open until it is dismissed.
Controls announcement urgency. Use `high` only for urgent failures.
}
simpleType="object"
>
Adds a labeled action button. Pass `render` to project the action semantics
and callback onto a custom button element.
<ApiProp name="data" fullType="Record<string, unknown>">
Stores arbitrary data with the toast for consumer callbacks and custom
rendering.
<ApiProp name="onClose" fullType="() => void">
Runs when the toast begins closing.
<ApiProp name="onRemove" fullType="() => void">
Runs when the toast is removed after its closing transition finishes.
Shows the explicit close control.

#### toast() variants

The type helpers accept the same options as `toast()` and set `type` for you.

```tsx
toast.success({ title: "Saved" });
toast.error({ title: "Upload failed" });
toast.warning({ title: "Connection is unstable" });
toast.info({ title: "New updates are available" });
```

Use `toast.update()` and `toast.dismiss()` for explicit lifecycle control. `toast.promise()` accepts a promise and loading, success, and error messages. Success and error messages can be functions of the settled value or error.

```tsx
const id = toast({ id: "sync", title: "Syncing", type: "loading" });

toast.update(id, { title: "Synced", type: "success" });
toast.dismiss(id);

toast.promise(syncData(), {
  loading: { title: "Syncing" },
  success: (result) => ({ title: `Synced ${result.count} records` }),
  error: (error) => ({ title: error.message }),
});
```

#### `toast.anchored()`

`toast.anchored()` uses the same options as `toast()` except for `type`, then adds positioning options for an `AnchoredToastProvider`.

>
Sets the element that receives the contextual toast.
Sets the side of the anchor where the toast is placed.
Sets the distance from the anchor in pixels.
Aligns the toast against the anchor.
Adjusts the toast along the anchor's alignment axis in pixels.
Renders an arrow that points to the anchor.

#### `ToastProvider`

`ToastProvider` enables viewport stacks and exposes position, limit, and timeout controls. Toast entry, stacking, expansion, and swipe-dismiss motion are tuned as one coordinated behavior.

Sets the viewport position for stacked toasts.
Sets the maximum number of visible toasts before older items are limited.
Sets the default automatic dismissal timeout in milliseconds.
Sets the portal container for the toast viewport.

#### `AnchoredToastProvider`

`AnchoredToastProvider` enables `toast.anchored()` and uses the anchor positioning options from Base UI.

Sets the maximum number of anchored toasts displayed at once.
Sets the default automatic dismissal timeout in milliseconds.
Sets the portal container for anchored toasts.
