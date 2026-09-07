# Transition Panel

Animate between named views with direction-aware transitions and automatic height changes.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `TransitionPanel` to swap between related views while preserving their local state. It works well for multi-step flows, settings surfaces, and content inside dialogs or popovers.

## Preview

```tsx
"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/registry/base/transition-panel";

type Step = "account" | "verify" | "complete";

export default function TransitionPanelDefaultDemo() {
  const [step, setStep] = React.useState<Step>("account");

  return (
    <div className="w-full max-w-sm">
      <TransitionPanel
        activeKey={step}
        className="rounded-xl border border-border bg-card text-card-foreground shadow-sm"
      >
        <TransitionPanelView viewKey="account" className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="font-semibold">Create your account</h3>
            <p className="text-sm text-muted-foreground">
              Enter your email to get started.
            </p>
          </div>
          <Input type="email" placeholder="you@example.com" />
          <Button className="w-full" onClick={() => setStep("verify")}>
            Continue
          </Button>
        </TransitionPanelView>

        <TransitionPanelView viewKey="verify" className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="font-semibold">Check your email</h3>
            <p className="text-sm text-muted-foreground">
              Enter the verification code we sent you.
            </p>
          </div>
          <Input inputMode="numeric" placeholder="123456" />
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setStep("account")}
            >
              Back
            </Button>
            <Button className="flex-1" onClick={() => setStep("complete")}>
              Verify
            </Button>
          </div>
        </TransitionPanelView>

        <TransitionPanelView viewKey="complete" className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="font-semibold">You are all set</h3>
            <p className="text-sm text-muted-foreground">
              Your account is ready to use.
            </p>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setStep("account")}
          >
            Start over
          </Button>
        </TransitionPanelView>
      </TransitionPanel>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/transition-panel.json
```

## Usage

```tsx
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/components/ui/transition-panel";
```

```tsx
<TransitionPanel activeKey={step}>
  <TransitionPanelView viewKey="account">
    <AccountStep onNext={() => setStep("verify")} />
  </TransitionPanelView>
  <TransitionPanelView viewKey="verify">
    <VerifyStep onBack={() => setStep("account")} />
  </TransitionPanelView>
</TransitionPanel>
```

`activeKey` selects the visible view. Keep each `TransitionPanelView` mounted when possible so its local state survives a swap. The default slide transition infers direction from the order in which views are declared.

## Composition

```tsx
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/components/ui/transition-panel";

<TransitionPanel activeKey="first">
  <TransitionPanelView viewKey="first" />
  <TransitionPanelView viewKey="second" />
</TransitionPanel>;
```

Views can be wrapped, mapped, or conditionally rendered. Registration uses context rather than direct-child inspection, so the panel can compose with ordinary React wrappers.

## Examples

### Crossfade

Use `transition="fade"` for an in-place crossfade when the content should not move horizontally.

```tsx
"use client";

import * as React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/registry/base/transition-panel";

const VIEWS = ["overview", "details", "notes"] as const;
type View = (typeof VIEWS)[number];

const CONTENT: Record<View, { title: string; body: string }> = {
  overview: {
    title: "Overview",
    body: "The fade transition keeps the panel in place while the active view crossfades into the next one.",
  },
  details: {
    title: "Details",
    body: "The panel measures the active view and animates its real height, so content can grow or shrink without being scaled.",
  },
  notes: {
    title: "Notes",
    body: "Inactive views remain mounted, which keeps their local state when you move between views.",
  },
};

export default function TransitionPanelCrossfadeDemo() {
  const [view, setView] = React.useState<View>("overview");

  return (
    <div className="w-full max-w-sm space-y-3">
      <Tabs value={view} onValueChange={(value) => setView(value as View)}>
        <TabsList>
          {VIEWS.map((key) => (
            <TabsTrigger key={key} value={key}>
              {CONTENT[key].title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <TransitionPanel activeKey={view} transition="fade">
          {VIEWS.map((key) => (
            <TransitionPanelView key={key} viewKey={key}>
              <div className="space-y-1.5">
                <h3 className="font-semibold">{CONTENT[key].title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {CONTENT[key].body}
                </p>
              </div>
            </TransitionPanelView>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}
```

## API Reference

`TransitionPanel` and `TransitionPanelView` render `div` elements by default. Standard `div` props pass through, and both components support Base UI's `render` prop for polymorphic composition.

### Props

#### TransitionPanel

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeKey` | `string` | `-` | The key of the view that should be visible. It must match a `viewKey` on a descendant `TransitionPanelView`. |
| `transition` | `"slide" \| "fade"` | `slide` | Chooses the view transition. `slide` moves views horizontally according to their declaration order. `fade` crossfades them in place with a subtle scale. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | `-` | Replaces or composes the root `div` while preserving the internal measurement ref. |

#### TransitionPanelView

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `viewKey` | `string` | `-` | The identifier matched against the parent panel's `activeKey`. |
| `initialFocus` | `boolean \| React.RefObject<HTMLElement \| null>` | `true` | Controls focus after a view swap. `true` focuses the first tabbable element, `false` leaves focus where it is, and a ref targets a specific element. Initial rendering does not move focus. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | `-` | Replaces or composes the view wrapper while preserving registration and consumer refs. |

### Data attributes

The root exposes `data-slot="transition-panel"`, `data-transition`, and `data-activation-direction`. Each view exposes `data-slot="transition-panel-view"`, `data-viewkey`, and `data-active` while active.

### CSS custom properties

Set these properties on the root to tune the animation without replacing the component styles:

| Property           | Default                           | Description                                                   |
| ------------------ | --------------------------------- | ------------------------------------------------------------- |
| --tp-duration      | 240ms                             | Height and slide transition duration.                         |
| --tp-fade-duration | adaptive                          | Fade transition duration.                                     |
| --tp-ease          | cubic-bezier(0.32, 0.72, 0, 1)    | Height and slide easing.                                      |
| --tp-fade-ease     | cubic-bezier(0.26, 0.08, 0.25, 1) | Fade easing.                                                  |
| --tp-clip-margin   | 0px                               | Optional bleed for focus rings or shadows near the clip edge. |

The component respects prefers-reduced-motion. Inactive views stay mounted but are marked inert and aria-hidden so they do not participate in focus or assistive technology navigation.
