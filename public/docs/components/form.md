# Form

A TanStack Form submission wrapper for composing type-safe forms with registry controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/form.json
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json https://ui.iandefined.com/r/checkbox.json https://ui.iandefined.com/r/field.json https://ui.iandefined.com/r/fieldset.json https://ui.iandefined.com/r/input.json https://ui.iandefined.com/r/radio-group.json https://ui.iandefined.com/r/slider.json https://ui.iandefined.com/r/switch.json https://ui.iandefined.com/r/textarea.json
```

```bash
npm install @tanstack/react-form
```

```bash
npm install zod
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

import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";

const form = useForm({
  defaultValues: { email: "" },
  onSubmit: ({ value }) => console.info(value),
});

<Form form={form}>
  <form.Field name="email">
    {(field) => (
      <Field name={field.name}>
        <FieldLabel>Email</FieldLabel>
        <FieldControl
          value={field.state.value}
          onBlur={field.handleBlur}
          onValueChange={field.handleChange}
        />
      </Field>
    )}
  </form.Field>
</Form>;
```

The component defaults to `noValidate` so TanStack Form remains the only validation layer. Pass `noValidate={false}` when native constraint validation is intentional.

For fields with supporting guidance, render the helper while the field is valid and replace it with an actionable `FieldError` when validation fails. Keep that single active message directly after the control; Field connects it with `aria-describedby` and propagates `aria-invalid` from the external validation state.

## Examples

### Complete Form

Compose Input, Textarea, Radio Group, Slider, Switch, and Checkbox fields in one profile form. It validates with Zod, revalidates as errors are corrected, handles an asynchronous submission, and reports the submitted result.

### With Fieldset

Group related TanStack fields with the semantic Fieldset component and use Field for automatic label association.

### Zod Validation

Pass a Zod schema to TanStack Form's dynamic validator. The form validates on submit, then revalidates as values change so errors clear while the user corrects them.

### Server Validation

Use an asynchronous submit validator for checks that need a server round trip, such as reserved or already-used usernames. Try `admin` to see the server error.
