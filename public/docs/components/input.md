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

### Invalid

Submit an empty or malformed email to mark the input invalid and run one shake. The error persists on focus, revalidates while you edit, and clears only when the email is valid.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";

function validateEmail(value: string) {
  if (!value.trim()) {
    return "Enter your email address.";
  }

  return /^\S+@\S+\.\S+$/.test(value)
    ? undefined
    : "Enter a valid email address.";
}

export default function InputInvalidDemo() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="email"
        validators={{ onDynamic: ({ value }) => validateEmail(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel>Email address</FieldLabel>
              <Input
                autoComplete="email"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="you@example.com"
                type="email"
                value={field.state.value}
              />
              <FieldErrorSlot>
                <FieldError match={invalid}>{error}</FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Continue</Button>
    </Form>
  );
}
```

## API Reference

`Input` wraps [Base UI Input](https://base-ui.com/react/components/input). Supported Base UI and native input props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg" \| number` | `default` | Sets a preset height, or a custom height in pixels. |
