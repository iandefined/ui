# Checkbox

A control that allows the user to toggle between checked and unchecked.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Checkbox` for independent boolean choices, including optional indeterminate states.

## Preview

```tsx
import { Checkbox } from "@/registry/base/checkbox";
import { Label } from "@/registry/base/label";

export default function CheckboxDemo() {
  return (
    <Label
      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
      htmlFor="terms"
    >
      <Checkbox id="terms" />
      Accept terms and conditions
    </Label>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/checkbox.json
```

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox aria-label="Receive updates" />;
```

## Composition

Use `CheckboxRoot` and `CheckboxIndicator` when a custom composition needs separate parts.

```tsx
import { CheckboxIndicator, CheckboxRoot } from "@/components/ui/checkbox";

<CheckboxRoot>
  <CheckboxIndicator />
</CheckboxRoot>;
```

## Examples

### Disabled

Prevent changes while retaining the current state.

```tsx
import { Checkbox } from "@/registry/base/checkbox";
import { Label } from "@/registry/base/label";

export default function CheckboxDisabledDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Label
        className="flex items-center gap-2 text-sm text-muted-foreground"
        htmlFor="disabled"
      >
        <Checkbox disabled id="disabled" />
        Disabled
      </Label>
      <Label
        className="flex items-center gap-2 text-sm text-muted-foreground"
        htmlFor="disabled-checked"
      >
        <Checkbox defaultChecked disabled id="disabled-checked" />
        Disabled and checked
      </Label>
    </div>
  );
}
```

### Sizes

Align the checkbox with nearby controls.

```tsx
import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxSizesDemo() {
  return (
    <div className="flex items-center gap-5">
      <Checkbox aria-label="Small checkbox" defaultChecked size="sm" />
      <Checkbox aria-label="Default checkbox" defaultChecked />
      <Checkbox aria-label="Large checkbox" defaultChecked size="lg" />
    </div>
  );
}
```

### Radius

Adjust the checkmark container's corner radius.

```tsx
import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxRadiusDemo() {
  return (
    <div className="flex items-center gap-5">
      <Checkbox aria-label="No radius checkbox" defaultChecked radius="none" />
      <Checkbox aria-label="Small radius checkbox" defaultChecked radius="sm" />
      <Checkbox aria-label="Default radius checkbox" defaultChecked />
      <Checkbox aria-label="Large radius checkbox" defaultChecked radius="lg" />
      <Checkbox
        aria-label="Full radius checkbox"
        defaultChecked
        radius="full"
      />
    </div>
  );
}
```

### Custom Icons

Provide an icon for checked and indeterminate states.

```tsx
import { CircleIcon, HeartIcon, StarIcon } from "lucide-react";

import { CheckboxIndicator, CheckboxRoot } from "@/registry/base/checkbox";

export default function CheckboxIconsDemo() {
  return (
    <div className="flex items-center gap-5">
      <CheckboxRoot aria-label="Circle checkbox" defaultChecked>
        <CheckboxIndicator>
          <CircleIcon className="fill-current" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <CheckboxRoot aria-label="Star checkbox" defaultChecked>
        <CheckboxIndicator>
          <StarIcon className="fill-current" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <CheckboxRoot aria-label="Heart checkbox" defaultChecked>
        <CheckboxIndicator>
          <HeartIcon className="fill-current" />
        </CheckboxIndicator>
      </CheckboxRoot>
    </div>
  );
}
```

### Invalid

Trigger the invalid-state shake on the checkbox.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Checkbox aria-invalid={invalid || undefined} aria-label="Accept terms" />
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
```

## Accessibility

Give an unlabeled checkbox an `aria-label`, or associate it with a visible `<label>`.

## API Reference

`Checkbox` wraps [Base UI Checkbox](https://base-ui.com/react/components/checkbox). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the control dimensions. |
| `radius` | `"none" \| "sm" \| "default" \| "lg" \| "full"` | `default` | Sets the indicator corner radius. |
| `reduceMotion` | `boolean` | `false` | Disables the indicator animation. |
