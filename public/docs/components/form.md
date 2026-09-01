# Form

A TanStack Form submission wrapper for composing type-safe forms with registry controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/form.json
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json https://ui.iandefined.com/r/checkbox.json https://ui.iandefined.com/r/fieldset.json https://ui.iandefined.com/r/input.json https://ui.iandefined.com/r/label.json
```

```bash
npm install @tanstack/react-form
```

```bash
npm install @base-ui/react tailwind-variants clsx tailwind-merge
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Usage

Create the form instance with TanStack Form, then pass it to `Form`. The wrapper prevents native submission and calls `form.handleSubmit()`.

```tsx
import { useForm } from "@tanstack/react-form";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const form = useForm({
  defaultValues: { email: "" },
  onSubmit: ({ value }) => console.info(value),
});

<Form form={form}>
  <form.Field name="email">
    {(field) => (
      <div className="grid gap-2">
        <Label htmlFor={field.name}>Email</Label>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
        />
      </div>
    )}
  </form.Field>
</Form>;
```

The component defaults to `noValidate` so TanStack Form remains the only validation layer. Pass `noValidate={false}` when native constraint validation is intentional.

## Examples

### With Fieldset

Group related TanStack fields with the semantic Fieldset component and keep each control composed from the existing registry primitives.
