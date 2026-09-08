# Dialog

A modal window for focused tasks that require user interaction.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Dialog` for focused tasks such as editing a record, confirming an action, or completing a short form without leaving the current page.

## Preview

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function DialogDefaultDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Share project</Button>} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share project</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this project.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1 space-y-2">
              <Label htmlFor="dialog-share-link">Project link</Label>
              <Input
                id="dialog-share-link"
                defaultValue="https://example.com/projects/abc123"
                readOnly
              />
            </div>
            <Button type="button">Copy</Button>
          </div>
        </DialogBody>
        <DialogFooter className="sm:justify-start">
          <DialogCloseTrigger
            render={<Button variant="outline">Close</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/dialog.json
```

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

```tsx
"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

export default function DialogControlledDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <DialogTrigger render={<Button variant="outline" />}>
        Open controlled dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>
            The parent owns the open state and can close the dialog after an
            operation completes.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            Current state: {open ? "open" : "closed"}
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### With Form

Place a native `<form>` inside `DialogContent` and close it after a successful submit.

```tsx
"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function DialogWithFormDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update your profile details, then save when you are done.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" defaultValue="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dialog-email">Email</Label>
              <Input
                id="dialog-email"
                type="email"
                defaultValue="jane@example.com"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### Scrollable Content

The default `scroll="inside"` mode keeps the header and footer visible while `DialogBody` scrolls.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using our service, you agree to be bound by these terms. If you do not agree to all the terms, you may not access the service.",
  },
  {
    title: "User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "Intellectual Property",
    body: "The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "User Content",
    body: "You retain ownership of content you submit. By posting content, you grant us a license to use, modify, and display it in connection with the service.",
  },
  {
    title: "Prohibited Activities",
    body: "You may not use the service for any illegal purpose, to harass others, to distribute malware, or to interfere with the proper functioning of the service.",
  },
  {
    title: "Termination",
    body: "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users.",
  },
  {
    title: "Limitation of Liability",
    body: "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Information",
    body: "If you have any questions about these terms, please contact us at support@example.com. We will respond to your inquiry within a reasonable timeframe.",
  },
];

export default function DialogScrollableDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open scrollable dialog
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Workspace settings</DialogTitle>
          <DialogDescription>
            The header and footer stay in place while DialogBody scrolls.
          </DialogDescription>
        </DialogHeader>
        <DialogBody fadeEdges="y" className="space-y-4">
          {sections.map((section, index) => (
            <section key={section.title} className="space-y-1">
              <h3 className="font-medium">
                {index + 1}. {section.title}
              </h3>
              <p className="text-sm text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Close</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Outside Scroll

Set `scroll="outside"` when the entire dialog card should move through the viewport.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

const terms = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using our service, you agree to be bound by these terms. If you do not agree to all the terms, you may not access the service.",
  },
  {
    title: "User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "Intellectual Property",
    body: "The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "User Content",
    body: "You retain ownership of content you submit. By posting content, you grant us a license to use, modify, and display it in connection with the service.",
  },
  {
    title: "Prohibited Activities",
    body: "You may not use the service for any illegal purpose, to harass others, to distribute malware, or to interfere with the proper functioning of the service.",
  },
  {
    title: "Termination",
    body: "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users.",
  },
  {
    title: "Limitation of Liability",
    body: "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Information",
    body: "If you have any questions about these terms, please contact us at support@example.com. We will respond to your inquiry within a reasonable timeframe.",
  },
];

export default function DialogOutsideScrollDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open outside-scroll dialog
      </DialogTrigger>
      <DialogContent scroll="outside" className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>
            With outside scrolling, the complete dialog card moves through the
            viewport.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-4">
          {terms.map((section, index) => (
            <section key={section.title} className="space-y-1">
              <h3 className="font-medium">
                {index + 1}. {section.title}
              </h3>
              <p className="text-sm text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Decline</Button>}
          />
          <DialogCloseTrigger render={<Button>Accept</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Footer Behavior

Compare default and inset footer styles with both scroll modes. Inside scrolling keeps the footer visible while `DialogBody` scrolls; outside scrolling moves the footer with the complete dialog card.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

const footerVariants = [
  { scroll: "inside", variant: "default" },
  { scroll: "inside", variant: "inset" },
  { scroll: "outside", variant: "default" },
  { scroll: "outside", variant: "inset" },
] as const;

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable dialog content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function DialogFooterBehaviorDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {footerVariants.map(({ scroll, variant }) => {
        const scrollLabel = capitalize(scroll);
        const variantLabel = capitalize(variant);

        return (
          <Dialog key={`${scroll}-${variant}`}>
            <DialogTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {scrollLabel}, {variantLabel}
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-lg"
              scroll={scroll}
              variant={variant}
            >
              <DialogHeader>
                <DialogTitle>{scrollLabel}-scroll dialog</DialogTitle>
                <DialogDescription>
                  {scroll === "inside"
                    ? "The body scrolls while the footer remains visible."
                    : "The footer travels with the complete dialog card."}
                </DialogDescription>
              </DialogHeader>
              <DialogBody fadeEdges={scroll === "inside" ? "y" : false}>
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
              </DialogBody>
              <DialogFooter>
                <DialogCloseTrigger
                  render={<Button size="sm" variant="outline" />}
                >
                  Close
                </DialogCloseTrigger>
                <Button size="sm">{variantLabel} action</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
```

### Inset Footer

Set `variant="inset"` to separate the footer with a muted background and top border.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function DialogInsetFooterDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent variant="inset" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            The inset footer separates actions from the form content.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dialog-inset-name">Name</Label>
            <Input id="dialog-inset-name" defaultValue="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialog-inset-handle">Username</Label>
            <Input id="dialog-inset-handle" defaultValue="@janedoe" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <DialogCloseTrigger render={<Button>Save changes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Non-dismissible

Set `dismissible={false}` when the user must complete an action before the
dialog can close. This prevents outside presses and Escape from dismissing the
dialog. Compose `DialogCloseTrigger` around each button that is allowed to
close it.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

export default function DialogNonDismissibleDemo() {
  return (
    <Dialog dismissible={false}>
      <DialogTrigger render={<Button variant="outline" />}>
        Important action
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This dialog cannot be dismissed by clicking outside or pressing
            Escape. Use one of the buttons below.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            Review the change before continuing. The dialog stays open until you
            choose an action.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <DialogCloseTrigger render={<Button>Confirm</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Nested Dialogs

Render another `Dialog` inside the first dialog when a secondary action needs its own focus scope.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

export default function DialogNestedDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open account dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account settings</DialogTitle>
          <DialogDescription>
            Open a second dialog for an action that needs separate focus.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            The nested dialog stacks above this one and restores focus when it
            closes.
          </p>
        </DialogBody>
        <DialogFooter className="justify-between">
          <Dialog>
            <DialogTrigger
              render={<Button variant="ghost" className="text-destructive" />}
            >
              Delete account
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p className="text-sm text-muted-foreground">
                  All of your projects and settings will be permanently removed.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogCloseTrigger
                  render={<Button variant="outline">Cancel</Button>}
                />
                <DialogCloseTrigger
                  render={<Button variant="destructive">Delete</Button>}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DialogCloseTrigger
            render={<Button variant="outline">Close</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Use the deeper example to inspect five nested Dialogs in sequence.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";

const MAX_NESTED_LEVEL = 5;

function NestedDialog({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final dialog" : `Open dialog ${level}`}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nested dialog {level}</DialogTitle>
          <DialogDescription>
            This is level {level} of five nested Dialogs.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The fifth nested Dialog is now active. Focus returns to each
              trigger as its dialog closes.
            </p>
          ) : (
            <NestedDialog level={level + 1} />
          )}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DialogNestedFiveDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open five nested dialogs
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nested Dialogs</DialogTitle>
          <DialogDescription>
            Open five Dialogs in sequence to inspect the nested stack.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <NestedDialog level={1} />
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger render={<Button variant="outline" />}>
            Close
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Detached Trigger

Use `createDialogHandle()` to connect a trigger and dialog root that live in different parts of the tree.

```tsx
import { Button } from "@/registry/base/button";
import {
  createDialogHandle,
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base/dialog";

const dialogHandle = createDialogHandle();

export default function DialogDetachedTriggerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <DialogTrigger
        handle={dialogHandle}
        render={<Button>Open settings</Button>}
      />
      <Dialog handle={dialogHandle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              The trigger and the dialog root do not need to share a parent.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-muted-foreground">
              This is useful when a table row or toolbar owns the trigger and a
              shared dialog renders elsewhere in the tree.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              render={<Button variant="outline">Close</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### Non-Modal

Pass `modal={false}` for a floating dialog that leaves the page interactive and does not dismiss from outside presses.

```tsx
import { Button } from "@/registry/base/button";
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
} from "@/registry/base/dialog";
import { Input } from "@/registry/base/input";

export default function DialogNonModalDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Dialog modal={false}>
        <DialogTrigger render={<Button variant="outline" />}>
          Open floating panel
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Quick note</DialogTitle>
            <DialogDescription>
              The page remains interactive while this panel is open.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Input aria-label="Note" placeholder="Type a note..." />
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              render={<Button variant="outline">Done</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Input aria-label="Page note" placeholder="Type here while open" />
    </div>
  );
}
```

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

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `dismissible` | `boolean` | `true` | Allows outside presses and Escape to dismiss the dialog. When `false`, the default corner close is omitted and the dialog can close only through `DialogCloseTrigger` or an externally controlled `open` value. |
| `overlay` | `"blur" \| "brightness" \| "transparent"` | `blur` | Controls the backdrop treatment. Use `"brightness"` for a plain dark dimmer or `"transparent"` to retain modal interaction without visual dimming. |
| `modal` | `boolean \| 'trap-focus'` | `true` | Controls focus trapping, page scrolling, and pointer interaction outside the dialog. `false` leaves the page interactive, while `"trap-focus"` traps focus without locking page scrolling. |
| `disablePointerDismissal` | `boolean` | `-` | Prevents outside presses from closing the dialog. It defaults to `true` when `modal` is `false` or `"trap-focus"`. |

#### DialogContent

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "inset"` | `default` | Selects the dialog frame treatment. `"inset"` adds a muted footer surface when `DialogFooter` is present. |
| `scroll` | `"inside" \| "outside"` | `inside` | Chooses whether `DialogBody` or the surrounding viewport scrolls. |
| `initialFocus` | `boolean \| React.RefObject<HTMLElement \| null> \| ((openType) => boolean \| HTMLElement \| null \| void)` | `-` | Chooses the element that receives focus when the dialog opens. In `"outside"` scroll mode, the popup is the default target. |

#### DialogBody

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `nativeScroll` | `boolean` | `false` | Uses the browser's native scrolling instead of the registry scrollbar. |
| `fadeEdges` | `boolean \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'x' \| 'y' \| DialogFadeEdge[]` | `true` | Selects the edges that receive a scroll fade. `true` fades both axes and `false` disables fades. |
| `scrollbarGutter` | `boolean` | `false` | Reserves space for the scrollbar to reduce content movement while scrolling. |
| `persistScrollbar` | `boolean` | `false` | Keeps the custom scrollbar visible instead of showing it only while interacting with the scroll area. |
| `hideScrollbar` | `boolean` | `false` | Hides the custom scrollbar while keeping the body scrollable. |

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
