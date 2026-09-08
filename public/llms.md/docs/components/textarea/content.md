# Textarea

A styled multiline text control built on Base UI Field.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Textarea` when people need to enter multiple lines of text.

## Preview

```tsx
import { Textarea } from "@/registry/base/textarea";

export default function TextareaDefaultDemo() {
  return <Textarea className="max-w-72" placeholder="Type your message here" />;
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/textarea.json
```

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Type your message here" />;
```

## Examples

### Sizes

```tsx
import { Textarea } from "@/registry/base/textarea";

export default function TextareaSizesDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Textarea className="w-full" placeholder="Small" size="sm" />
      <Textarea className="w-full" placeholder="Default" />
      <Textarea className="w-full" placeholder="Large" size="lg" />
    </div>
  );
}
```

### Disabled

```tsx
import { Textarea } from "@/registry/base/textarea";

export default function TextareaDisabledDemo() {
  return (
    <Textarea className="max-w-72" disabled placeholder="Can't type here" />
  );
}
```

### Controlled

```tsx
"use client";

import { useState } from "react";

import { Textarea } from "@/registry/base/textarea";

export default function TextareaControlledDemo() {
  const [value, setValue] = useState("Type your message here");

  return (
    <div className="flex w-80 flex-col gap-2">
      <Textarea
        aria-label="Message"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <span className="px-1 text-sm text-muted-foreground">Value: {value}</span>
    </div>
  );
}
```

### Invalid

Trigger the invalid-state shake on demand.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Textarea } from "@/registry/base/textarea";

export default function TextareaInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Textarea
        aria-label="Message"
        aria-invalid={invalid || undefined}
        className="w-full"
        placeholder="Tell us more..."
      />
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

## API Reference

`Textarea` wraps the native `<textarea>` element. Standard textarea attributes pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg" \| number` | `default` | Sets the textarea's padding and text size. |
