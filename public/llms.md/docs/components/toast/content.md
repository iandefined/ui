# Toast

Displays brief, self-dismissing feedback without blocking the page.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Toast` for transient feedback such as a saved change, a completed upload, or a recoverable error. Use `Dialog` or `AlertDialog` when the user must make a decision before continuing.

## Preview

```tsx
"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

export default function ToastDefaultDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({
            title: "Changes saved",
            description: "Your preferences are up to date.",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: <span className="font-medium">JSX-friendly content</span>,
            description: (
              <span>
                Titles and descriptions can be composed from React nodes.
              </span>
            ),
          })
        }
      >
        JSX content
      </Button>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/toast.json
```

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
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";

<ToastProvider>
  <AnchoredToastProvider>
    <App />
  </AnchoredToastProvider>
</ToastProvider>;
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

```tsx
"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const types = [
  "default",
  "loading",
  "success",
  "error",
  "warning",
  "info",
] as const;

function showToast(type: (typeof types)[number]) {
  const message = {
    default: {
      title: "Neutral update",
      description: "Nothing needs your attention.",
    },
    loading: {
      title: "Uploading",
      description: "Your file is being uploaded.",
    },
    success: {
      title: "Upload complete",
      description: "Your file is ready to use.",
    },
    error: { title: "Upload failed", description: "Try again in a moment." },
    warning: {
      title: "Storage is nearly full",
      description: "Remove old files to make room.",
    },
    info: {
      title: "New version available",
      description: "Refresh when you are ready.",
    },
  }[type];

  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "warning") {
    toast.warning(message);
  } else if (type === "info") {
    toast.info(message);
  } else {
    toast({ ...message, type });
  }
}

export default function ToastTypesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
      {types.map((type) => (
        <Button
          key={type}
          className="w-full"
          size="sm"
          variant="outline"
          onClick={() => showToast(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
}
```

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

```tsx
"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

export default function ToastActionDemo() {
  const handleAction = () => {
    const id = toast({
      title: "Action performed",
      description: "You can undo this action.",
      action: {
        label: "Undo",
        render: <Button variant="outline" size="sm" />,
        onClick: () => {
          toast.dismiss(id);
          toast({ title: "Action undone" });
        },
      },
    });

    return id;
  };

  return <Button onClick={handleAction}>Perform action</Button>;
}
```

### Deduplication and Update

Pass the same fixed `id` to update a toast in place instead of stacking a duplicate. The returned ID can also be passed to `toast.update()` and `toast.dismiss()`.

```tsx
"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const statusId = "toast-deduplication-status";

export default function ToastDeduplicationDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({
            id: statusId,
            title: "Draft saved",
            description: "Click again while it is visible to update in place.",
          })
        }
      >
        Save draft
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.update(statusId, {
            title: "Sync complete",
            description:
              "The existing toast was updated instead of duplicated.",
            type: "success",
          })
        }
      >
        Update toast
      </Button>
    </div>
  );
}
```

### Promise

Use `toast.promise()` for an operation with loading, success, and error messages. It updates the same notification as the promise settles.

```tsx
"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

function saveChanges(shouldFail: boolean): Promise<{ name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("The server could not be reached."));
      } else {
        resolve({ name: "Project Alpha" });
      }
    }, 900);
  });
}

function startSave(shouldFail: boolean) {
  void toast.promise(saveChanges(shouldFail), {
    loading: {
      title: "Saving changes",
      description: "Please wait while the project is saved.",
    },
    success: (result) => ({
      title: "Changes saved",
      description: `${result.name} was saved successfully.`,
    }),
    error: (error) => ({
      title: "Save failed",
      description: error instanceof Error ? error.message : "Please try again.",
    }),
  });
}

export default function ToastPromiseDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => startSave(false)}>Resolve promise</Button>
      <Button variant="outline" onClick={() => startSave(true)}>
        Reject promise
      </Button>
    </div>
  );
}
```

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
"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

export default function ToastAnchoredDemo() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex justify-center py-12">
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => {
          toast.anchored({
            title: "Copied",
            description: "The link was copied to your clipboard.",
            anchor: buttonRef.current,
            side: "top",
            sideOffset: 8,
            arrow: true,
            duration: 2000,
          });
        }}
      >
        Copy link
      </Button>
    </div>
  );
}
```

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

```tsx
"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const messages = [
  {
    title: "Quick update",
    description: "Task completed.",
  },
  {
    title: "New comment on your post",
    description:
      "Jordan replied: This looks great. Can we schedule a call to discuss the details?",
  },
  {
    title: "Meeting reminder",
    description:
      "Your meeting with the design team starts in 15 minutes. Bring the latest prototype and notes from user testing.",
  },
];

export default function ToastVaryingHeightsDemo() {
  const [index, setIndex] = React.useState(0);

  return (
    <Button
      variant="outline"
      onClick={() => {
        const message = messages[index % messages.length];
        toast(message);
        setIndex((current) => current + 1);
      }}
    >
      Create toast
    </Button>
  );
}
```

## Accessibility

Use `priority="low"` for ordinary feedback so screen readers announce it politely without interrupting the current task. Reserve `priority="high"` for urgent failures that need immediate attention.

Actions and close controls remain separate, keyboard-accessible controls. Give action labels enough context to describe the result, such as `Undo upload`, and keep `showCloseButton` enabled when users need a manual dismissal option.

## API Reference

`Toast` wraps the corresponding [Base UI Toast primitives](https://base-ui.com/react/components/toast), including the provider, portal, viewport, root, content, title, description, action, close, positioner, and arrow parts. Supported Base UI props pass through. The reference below covers the registry-owned options and helpers.

### Props

#### `toast()`

`toast()` displays a notification and returns its ID. It accepts object-based options, JSX content for custom layouts, and JSX-friendly React content in `title` and `description`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | `-` | Sets a stable ID for the toast. Reusing the ID updates the existing toast in place and refreshes its dismissal timer. |
| `title` | `React.ReactNode` | `-` | Sets the primary toast content. |
| `description` | `React.ReactNode` | `-` | Sets supporting content below the title. |
| `type` | `"default" \| "loading" \| "success" \| "error" \| "warning" \| "info"` | `default` | Sets the status treatment and icon behavior. |
| `duration` | `number` | `5000` | Sets the time in milliseconds before automatic dismissal. Use `0` to keep the toast open until it is dismissed. |
| `priority` | `"low" \| "high"` | `low` | Controls announcement urgency. Use `high` only for urgent failures. |
| `action` | `'React.ComponentPropsWithoutRef<"button"> & { label: React.ReactNode; render?: Toast.Action.Props["render"]` | `-` | Adds a labeled action button. Pass `render` to project the action semantics and callback onto a custom button element. |
| `data` | `Record<string, unknown>` | `-` | Stores arbitrary data with the toast for consumer callbacks and custom rendering. |
| `onClose` | `() => void` | `-` | Runs when the toast begins closing. |
| `onRemove` | `() => void` | `-` | Runs when the toast is removed after its closing transition finishes. |
| `showCloseButton` | `boolean` | `true` | Shows the explicit close control. |

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

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `anchor` | `Element \| React.RefObject<Element \| null> \| null` | `-` | Sets the element that receives the contextual toast. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `-` | Sets the side of the anchor where the toast is placed. |
| `sideOffset` | `number` | `8` | Sets the distance from the anchor in pixels. |
| `align` | `"start" \| "center" \| "end"` | `center` | Aligns the toast against the anchor. |
| `alignOffset` | `number` | `0` | Adjusts the toast along the anchor's alignment axis in pixels. |
| `arrow` | `boolean` | `false` | Renders an arrow that points to the anchor. |

#### `ToastProvider`

`ToastProvider` enables viewport stacks and exposes position, limit, and timeout controls. Toast entry, stacking, expansion, and swipe-dismiss motion are tuned as one coordinated behavior.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `bottom-right` | Sets the viewport position for stacked toasts. |
| `limit` | `number` | `3` | Sets the maximum number of visible toasts before older items are limited. |
| `timeout` | `number` | `5000` | Sets the default automatic dismissal timeout in milliseconds. |
| `container` | `Element \| null` | `-` | Sets the portal container for the toast viewport. |

#### `AnchoredToastProvider`

`AnchoredToastProvider` enables `toast.anchored()` and uses the anchor positioning options from Base UI.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `limit` | `number` | `5` | Sets the maximum number of anchored toasts displayed at once. |
| `timeout` | `number` | `2000` | Sets the default automatic dismissal timeout in milliseconds. |
| `container` | `Element \| null` | `-` | Sets the portal container for anchored toasts. |
