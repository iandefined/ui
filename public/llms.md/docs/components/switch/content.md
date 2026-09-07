# Switch

A draggable toggle with spring-based thumb animation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Switch` for an immediate on or off setting.

## Preview

```tsx
"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      aria-label="Enable notifications"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/switch.json
```

## Usage

```tsx
import { Switch } from "@/components/ui/switch";
```

```tsx
const [checked, setChecked] = useState(false);

<Switch
  aria-label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>;
```

## Examples

### With Label

```tsx
"use client";

import { useState } from "react";

import { Label } from "@/registry/base/label";
import { Switch } from "@/registry/base/switch";

export default function SwitchWithLabelDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Label
      className="flex items-center gap-3 cursor-pointer select-none"
      htmlFor="email-notifications"
    >
      <Switch
        checked={checked}
        id="email-notifications"
        onCheckedChange={setChecked}
      />
      Email notifications
    </Label>
  );
}
```

### Disabled

```tsx
import { Switch } from "@/registry/base/switch";

export default function SwitchDisabledDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Switch aria-label="Disabled" disabled />
      <Switch aria-label="Disabled and checked" defaultChecked disabled />
    </div>
  );
}
```

### Sizes

```tsx
"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchSizesDemo() {
  const [smallChecked, setSmallChecked] = useState(true);
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [largeChecked, setLargeChecked] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Switch
        aria-label="Small switch"
        checked={smallChecked}
        size="sm"
        onCheckedChange={setSmallChecked}
      />
      <Switch
        aria-label="Default switch"
        checked={defaultChecked}
        onCheckedChange={setDefaultChecked}
      />
      <Switch
        aria-label="Large switch"
        checked={largeChecked}
        size="lg"
        onCheckedChange={setLargeChecked}
      />
    </div>
  );
}
```

### Controlled

```tsx
"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchControlledDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Switch
        aria-label="Enable dark mode"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <p className="text-sm text-muted-foreground">
        Dark mode is {checked ? "enabled" : "disabled"}.
      </p>
    </div>
  );
}
```

### Custom Card Style

```tsx
"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchCustomCardStyleDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-lg border p-3">
      <div className="space-y-1">
        <p className="text-sm font-medium">Weekly summary</p>
        <p className="text-sm text-muted-foreground">
          Receive a recap of your workspace activity.
        </p>
      </div>
      <Switch
        aria-label="Enable weekly summary"
        checked={checked}
        className="shrink-0"
        onCheckedChange={setChecked}
      />
    </div>
  );
}
```

## API Reference

`Switch` wraps the [Base UI Switch](https://base-ui.com/react/components/switch). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the switch size. |
| `thumbTransition` | `Transition` | `-` | Overrides the Motion transition used for thumb movement. |
