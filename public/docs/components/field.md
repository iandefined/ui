# Field

An accessible field composition primitive for labels, descriptions, validation state, and errors.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Field` with either a native `<form>` or the TanStack Form `Form` adapter. The [Forms guide](/docs/forms) explains both paths and control-specific labeling patterns.

## Preview

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/base/field";

export default function FieldDefaultDemo() {
  return (
    <Field className="w-full max-w-sm" name="username">
      <FieldLabel>Username</FieldLabel>
      <FieldControl placeholder="Enter a username" />
      <FieldDescription>
        Use 3–20 letters, numbers, or underscores.
      </FieldDescription>
    </Field>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/field.json
```

## Usage

Place a label and one control inside `Field`. Render a description while the field is valid and replace it with the active error when validation fails.

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

<Field invalid={Boolean(error)} name="email">
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" />
  {error ? (
    <FieldError match>{error}</FieldError>
  ) : (
    <FieldDescription>We use this for account updates.</FieldDescription>
  )}
</Field>;
```

## Composition

`FieldControl` is an Input-styled Base UI control. For registry controls with their own root or trigger, place the control inside `Field` and use the control's label pattern:

- Wrap Checkbox and Switch in `FieldLabel` for an implicit label.
- Put Radio Group options in `FieldItem` and use `Fieldset` for the group legend.
- Use `SliderLabel` for Slider and the trigger label supplied by Select or Combobox.

Pass `dirty`, `invalid`, and `touched` from TanStack Form field metadata. `Field` propagates these states, and its description/error primitives associate the active message with the control.

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

<Field>
  <FieldLabel />
  <FieldControl />
  {error ? <FieldError match>{error}</FieldError> : <FieldDescription />}
</Field>;
```

## Examples

### Validation

Submit a short display name to show the complete validation lifecycle. The field keeps its error on focus, revalidates during correction, and shakes only on failed submissions.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

function validateDisplayName(value: string) {
  const displayName = value.trim();

  if (!displayName) {
    return "Display name is required.";
  }

  return displayName.length >= 2 ? undefined : "Enter at least 2 characters.";
}

export default function FieldValidationDemo() {
  const form = useForm({
    defaultValues: { displayName: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="displayName"
        validators={{ onDynamic: ({ value }) => validateDisplayName(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel>Display name</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={field.handleChange}
                placeholder="Ada Lovelace"
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

### Checkbox and Switch

Wrap each control in its label to preserve an accessible click target.

```tsx
"use client";

import { useState } from "react";

import { Checkbox } from "@/registry/base/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/registry/base/field";
import { Switch } from "@/registry/base/switch";

export default function FieldWithCheckboxAndSwitchDemo() {
  const [accepted, setAccepted] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field name="terms">
        <FieldLabel>
          <Checkbox checked={accepted} onCheckedChange={setAccepted} />
          <span>I accept the terms and privacy policy.</span>
        </FieldLabel>
      </Field>

      <Field name="notifications" className="space-y-0">
        <FieldLabel className="justify-between">
          Product notifications
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </FieldLabel>
        <FieldDescription>
          Receive occasional updates about new features.
        </FieldDescription>
      </Field>
    </div>
  );
}
```

### Radio Group

Combine `Field`, `Fieldset`, and `FieldItem` for a related single-choice group.

```tsx
"use client";

import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
} from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const plans = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Business", value: "business" },
];

export default function FieldWithRadioGroupDemo() {
  const [value, setValue] = useState("pro");

  return (
    <Field className="w-full max-w-sm" name="plan">
      <Fieldset>
        <FieldsetLegend>Plan</FieldsetLegend>
        <RadioGroup value={value} onValueChange={setValue}>
          {plans.map((plan) => (
            <FieldItem key={plan.value}>
              <FieldLabel className="cursor-pointer">
                <Radio value={plan.value} />
                {plan.label}
              </FieldLabel>
            </FieldItem>
          ))}
        </RadioGroup>
      </Fieldset>
      <FieldDescription className="mt-4">
        You can change plans at any time.
      </FieldDescription>
    </Field>
  );
}
```

### Slider

Use Slider's own label and value display for a trigger-based range control.

```tsx
"use client";

import { useState } from "react";

import { Field, FieldDescription } from "@/registry/base/field";
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function FieldWithSliderDemo() {
  const [value, setValue] = useState(65);

  return (
    <Field className="w-full max-w-sm" name="volume">
      <Slider
        formatValue={(currentValue) => `${currentValue}%`}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>Volume</SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>
      <FieldDescription>Adjust the output volume level.</FieldDescription>
    </Field>
  );
}
```

### Disabled

Disable Field to cascade the state to its Base UI controls.

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/base/field";

export default function FieldDisabledDemo() {
  return (
    <Field className="w-full max-w-sm" disabled name="username">
      <FieldLabel>Username</FieldLabel>
      <FieldControl defaultValue="ada" />
      <FieldDescription>
        Contact an administrator to change your username.
      </FieldDescription>
    </Field>
  );
}
```

## Accessibility

Keep one active description or error directly after the control. `FieldErrorSlot` preserves the error association during its reduced-motion-safe transition. Do not add `role="alert"` to an inline error that is already associated through `aria-describedby`, and do not use label color alone to communicate an error.

## API Reference

`Field` and its Base UI parts accept their underlying Base UI props in addition to the registry-owned behavior below.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `dirty` | `boolean` | `-` | Exposes dirty state to the field and its descendants. |
| `invalid` | `boolean` | `-` | Exposes invalid state and associates the active error with the control. |
| `name` | `string` | `-` | Identifies the field for label and message association. |
| `touched` | `boolean` | `-` | Exposes touched state to the field and its descendants. |

### FieldError

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `match` | `boolean` | `false` | Shows the error only when the enclosing field is invalid. |
