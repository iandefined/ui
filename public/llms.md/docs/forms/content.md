# Forms

Compose accessible native and TanStack Form workflows with registry controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Registry controls are composable rather than tied to one form library. Use a native `<form>` when browser constraints are enough, or use TanStack Form when fields need managed values, schemas, asynchronous validation, and submission state.

## Preview

## Choose a Form Model

Use a native form for simple inputs and built-in browser validation. It requires no `Form` component or form-library state.

Use TanStack Form when validation spans fields, a schema owns validation, values must be controlled, or submission and asynchronous errors need coordinated state. The registry `Form` component is a native form wrapper that calls `form.handleSubmit()`.

## Native Constraint Validation

Compose `Field`, `Fieldset`, and registry controls inside a native `<form>`. Native controls such as `FieldControl`, Input, and Textarea support standard `required`, `type`, and `pattern` constraints.

```tsx
import { Button } from "@/components/ui/button";
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";

<form onSubmit={(event) => event.preventDefault()}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl required type="email" />
  </Field>
  <Button type="submit">Continue</Button>
</form>;
```

## TanStack Form Quick Start

Create the form with `useForm`, connect each registry control to `form.Field`, and give the registry `Form` the form API.

```tsx
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";

function NewsletterForm() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: ({ value }) => console.info(value),
  });

  return (
    <Form form={form}>
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) =>
            value.includes("@") ? undefined : "Enter a valid email address.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={typeof error === "string"}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Email</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={field.handleChange}
                type="email"
                value={field.state.value}
              />
              <FieldError match={typeof error === "string"}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Subscribe</Button>
    </Form>
  );
}
```

## Labels, Descriptions, and Errors

`Field` connects one control with its label and active description or error. Keep the active message immediately after the control. Map TanStack metadata into `dirty`, `invalid`, and `touched`; show a `FieldError` only when there is a current error.

- Use `FieldLabel` with text controls, Input, Textarea, and Number Field.
- Wrap Checkbox and Switch in `FieldLabel` for an implicit label.
- Use `FieldsetLegend` for Radio Group and related checkbox groups, then label every choice with `FieldItem` and `FieldLabel`.
- Use the built-in label/value composition for Slider and the trigger label supplied by Select or Combobox.
- Put `aria-invalid` and the group error's `aria-describedby` on a group root such as Radio Group, not on every option.

## Grouped Controls

Use `Fieldset` for a shared context such as an address, plan, or notification preferences. `Fieldset` supplies native grouping while each nested `Field` keeps its own label and validation state.

## Validation

Use field validators for small local rules. Use a schema when rules depend on multiple values. The Zod example validates on submission, then revalidates when a value changes so corrected fields clear their errors.

```tsx
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";

const accountSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

const form = useForm({
  defaultValues: { email: "" },
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: { onDynamic: accountSchema },
});
```

For availability and other server checks, use an asynchronous validator such as `onSubmitAsync`. Keep the field pending/submission state visible, and return an actionable message rather than a generic failure.

## Submission State

Use `form.Subscribe` to read `canSubmit` and `isSubmitting`. Disable submission while a request is pending, reset any success feedback when values change, and render a success or failure message in the form itself.

```tsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, isSubmitting]) => (
    <Button disabled={!canSubmit} type="submit">
      {isSubmitting ? "Saving..." : "Save changes"}
    </Button>
  )}
</form.Subscribe>
```

## Component Reference

| Component                                                                                                             | Use it for                                           |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Form](/docs/components/form)                                                                                         | TanStack Form submission and native form attributes. |
| [Field](/docs/components/field)                                                                                       | Labels, descriptions, validation state, and errors.  |
| [Fieldset](/docs/components/fieldset)                                                                                 | Native semantic groups and legends.                  |
| [Input](/docs/components/input), [Textarea](/docs/components/textarea), [Number Field](/docs/components/number-field) | Text and numeric entry.                              |
| [Checkbox](/docs/components/checkbox), [Switch](/docs/components/switch), [Radio Group](/docs/components/radio-group) | Boolean and choice controls.                         |
| [Select](/docs/components/select), [Combobox](/docs/components/combobox), [Slider](/docs/components/slider)           | Trigger-based, searchable, and range controls.       |
