# Input

A styled text input built on Base UI.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Input` for concise, single-line text entry in forms and controls.

## Preview

```tsx
import { Input } from "@/registry/base/input";

export default function InputDefaultDemo() {
  return (
    <Input
      aria-label="Enter text"
      className="w-full max-w-sm"
      placeholder="Enter text"
    />
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input.json
```

## Usage

```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="Enter text" />;
```

## Examples

### Sizes

Choose a size that aligns with adjacent controls.

```tsx
import { Input } from "@/registry/base/input";

export default function InputSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input aria-label="Small input" placeholder="Small" size="sm" />
      <Input aria-label="Default input" placeholder="Default" />
      <Input aria-label="Large input" placeholder="Large" size="lg" />
    </div>
  );
}
```

### Input Types

Use the native `type` attribute for specialized input behavior.

```tsx
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function InputTypesDemo() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <div className="grid gap-1 text-muted-foreground">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="jane@example.com" type="email" />
      </div>
      <div className="grid gap-1 text-muted-foreground">
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="••••••••" type="password" />
      </div>
    </div>
  );
}
```

### File

Use `type="file"` to accept selected files.

```tsx
import { Input } from "@/registry/base/input";

export default function InputFileDemo() {
  return <Input aria-label="File" className="w-full max-w-sm" type="file" />;
}
```

### Disabled

Prevent interaction while retaining the entered value.

```tsx
import { Input } from "@/registry/base/input";

export default function InputDisabledDemo() {
  return (
    <Input
      aria-label="Disabled"
      className="w-full max-w-sm"
      disabled
      placeholder="Disabled"
    />
  );
}
```

### Controlled

Control the value from application state.

```tsx
"use client";

import { useState } from "react";

import { Input } from "@/registry/base/input";
import { TextMorph } from "@/registry/base/text-morph";

export default function InputControlledDemo() {
  const [value, setValue] = useState("base-ui.com");

  return (
    <div className="flex w-80 flex-col gap-2">
      <Input
        aria-label="Domain"
        onValueChange={setValue}
        placeholder="domain"
        value={value}
      />
      <span className="inline-flex w-fit px-1 text-sm text-muted-foreground">
        https://
        <TextMorph>{value || "your-domain"}</TextMorph>
      </span>
    </div>
  );
}
```

## API Reference

`Input` wraps [Base UI Input](https://base-ui.com/react/components/input). Supported Base UI and native input props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg" \| number` | `default` | Sets a preset height, or a custom height in pixels. |
