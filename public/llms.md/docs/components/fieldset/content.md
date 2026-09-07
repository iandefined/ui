# Fieldset

A native semantic group for related fields with a styled legend.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Fieldset` to group related controls in native or TanStack Form compositions. See the [Forms guide](/docs/forms) for group validation and choice-control patterns.

## Preview

```tsx
import { Field, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Input } from "@/registry/base/input";

const fields = [
  { id: "first-name", label: "First name", placeholder: "John" },
  { id: "last-name", label: "Last name", placeholder: "Doe" },
  { id: "street-address", label: "Street address", placeholder: "123 Main St" },
];

export default function FieldsetDefaultDemo() {
  return (
    <Fieldset className="w-full max-w-sm">
      <FieldsetLegend>Shipping address</FieldsetLegend>
      {fields.map((field) => (
        <Field key={field.id} name={field.id}>
          <FieldLabel>{field.label}</FieldLabel>
          <Input name={field.id} placeholder={field.placeholder} />
        </Field>
      ))}
    </Fieldset>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/fieldset.json
```

## Usage

Compose `Field` inside `Fieldset` when controls share a visible group label. The underlying native `fieldset` and `legend` preserve the group relationship without a form library.

```tsx
import { Field, FieldLabel } from "@/components/ui/field";
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";

<Fieldset>
  <FieldsetLegend>Shipping address</FieldsetLegend>
  <Field name="street">
    <FieldLabel>Street address</FieldLabel>
    <Input autoComplete="street-address" />
  </Field>
</Fieldset>;
```

## Composition

Use one `FieldsetLegend` for a related group. For a Radio Group, put `aria-invalid` and `aria-describedby` on the group root and render one group-level `FieldError` after its options. For multiple checkboxes, keep each checkbox independently labelable while the fieldset supplies the shared context.

`Fieldset` only provides native grouping and layout. Use `Field` for descriptions, error messages, and state mapping from TanStack Form.

```tsx
import { Field, FieldLabel } from "@/components/ui/field";
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";

<Fieldset>
  <FieldsetLegend />
  <Field>
    <FieldLabel />
    <Input />
  </Field>
</Fieldset>;
```

## Examples

### Radio Group

Use a legend and option labels to describe one required choice.

```tsx
import { Field, FieldItem, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const plans = [
  {
    description: "For personal projects and experiments.",
    label: "Starter",
    value: "starter",
  },
  {
    description: "For growing products and small teams.",
    label: "Pro",
    value: "pro",
  },
  {
    description: "For organizations that need more control.",
    label: "Business",
    value: "business",
  },
];

export default function FieldsetWithRadioGroupDemo() {
  return (
    <Field className="w-full max-w-sm" name="plan">
      <Fieldset>
        <FieldsetLegend>Choose a plan</FieldsetLegend>
        <RadioGroup defaultValue="pro">
          {plans.map((plan) => (
            <FieldItem key={plan.value}>
              <FieldLabel className="cursor-pointer items-start">
                <Radio value={plan.value} />
                <span className="grid gap-1">
                  <span>{plan.label}</span>
                  <span className="text-xs/4 font-normal text-muted-foreground">
                    {plan.description}
                  </span>
                </span>
              </FieldLabel>
            </FieldItem>
          ))}
        </RadioGroup>
      </Fieldset>
    </Field>
  );
}
```

### Checkbox Group

Group several independently labeled checkbox choices under one legend.

```tsx
"use client";

import { useState } from "react";

import { Checkbox } from "@/registry/base/checkbox";
import { Field, FieldItem, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";

const notifications = [
  {
    description: "A summary of activity and account changes.",
    label: "Email",
    value: "email",
  },
  {
    description: "Time-sensitive alerts sent to your phone.",
    label: "Text messages",
    value: "sms",
  },
  {
    description: "Updates shown while you are using the app.",
    label: "In-app",
    value: "in-app",
  },
];

export default function FieldsetWithCheckboxGroupDemo() {
  const [value, setValue] = useState(["email", "in-app"]);

  return (
    <Field className="w-full max-w-sm" name="notifications">
      <Fieldset>
        <FieldsetLegend>Notifications</FieldsetLegend>
        {notifications.map((notification) => {
          const checked = value.includes(notification.value);

          return (
            <FieldItem key={notification.value}>
              <FieldLabel className="cursor-pointer items-start">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(nextChecked) => {
                    setValue((currentValue) =>
                      nextChecked
                        ? [...currentValue, notification.value]
                        : currentValue.filter(
                            (item) => item !== notification.value
                          )
                    );
                  }}
                />
                <span className="grid gap-1">
                  <span>{notification.label}</span>
                  <span className="text-xs/4 font-normal text-muted-foreground">
                    {notification.description}
                  </span>
                </span>
              </FieldLabel>
            </FieldItem>
          );
        })}
      </Fieldset>
    </Field>
  );
}
```

### TanStack Form Fields

Combine fieldset semantics with registered fields in a submit-capable form.

```tsx
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";
import { Field, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";

export default function FormWithFieldsetDemo() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      address: "",
      city: "",
      saveAddress: true,
    },
    onSubmit: () => {
      setSubmitted(true);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-5" form={form}>
      <Fieldset>
        <FieldsetLegend>Shipping address</FieldsetLegend>

        <form.Field name="address">
          {(field) => (
            <Field name={field.name}>
              <FieldLabel>Street address</FieldLabel>
              <Input
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmitted(false);
                  field.handleChange(event.target.value);
                }}
                placeholder="123 Main St"
                value={field.state.value}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="city">
          {(field) => (
            <Field name={field.name}>
              <FieldLabel>City</FieldLabel>
              <Input
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmitted(false);
                  field.handleChange(event.target.value);
                }}
                placeholder="San Francisco"
                value={field.state.value}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="saveAddress">
          {(field) => (
            <Field name={field.name}>
              <FieldLabel className="w-fit cursor-pointer">
                <Checkbox
                  checked={field.state.value}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onCheckedChange={(checked) => {
                    setSubmitted(false);
                    field.handleChange(checked);
                  }}
                />
                Save this address
              </FieldLabel>
            </Field>
          )}
        </form.Field>
      </Fieldset>

      <Button type="submit">Continue</Button>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Shipping address saved.
        </output>
      )}
    </Form>
  );
}
```

## Accessibility

Use `FieldsetLegend` rather than a visually similar heading whenever controls form one conceptual group. Keep each choice label adjacent to and associated with its own control; a legend supplements rather than replaces those labels.

## API Reference

`Fieldset` accepts native `<fieldset>` attributes, and `FieldsetLegend` accepts native `<legend>` attributes. Both add their documented `data-slot` attributes for styling and composition.
