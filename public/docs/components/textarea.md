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

Submit a short message to mark the textarea invalid and run one shake. After that attempt, editing revalidates the message without repeatedly shaking the control.

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
import { Textarea } from "@/registry/base/textarea";

function validateMessage(value: string) {
  const message = value.trim();

  if (!message) {
    return "Message is required.";
  }

  return message.length >= 10 ? undefined : "Enter at least 10 characters.";
}

export default function TextareaInvalidDemo() {
  const form = useForm({
    defaultValues: { message: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="message"
        validators={{ onDynamic: ({ value }) => validateMessage(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel>Message</FieldLabel>
              <Textarea
                aria-label="Message"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Tell us more..."
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

`Textarea` wraps the native `<textarea>` element. Standard textarea attributes pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg" \| number` | `default` | Sets the textarea's padding and text size. |
