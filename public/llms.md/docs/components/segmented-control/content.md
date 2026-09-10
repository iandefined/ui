# Segmented Control

A radio-group input for choosing one value from a compact set of options.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `SegmentedControl` when a form needs one value from a small set, such as a shirt size. It keeps radio-group semantics and keyboard behavior while using the same animated segmented surface as `Tabs`.

## Preview

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

export default function SegmentedControlDefaultDemo() {
  return (
    <SegmentedControl
      aria-label="Shirt size"
      className="w-full max-w-sm"
      defaultValue="m"
      name="shirtSize"
    >
      <SegmentedControlItem className="flex-1" value="s">
        S
      </SegmentedControlItem>
      <SegmentedControlItem className="flex-1" value="m">
        M
      </SegmentedControlItem>
      <SegmentedControlItem className="flex-1" value="l">
        L
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/segmented-control.json
```

## Usage

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

<SegmentedControl aria-label="Shirt size" defaultValue="m" name="shirtSize">
  <SegmentedControlItem value="s">S</SegmentedControlItem>
  <SegmentedControlItem value="m">M</SegmentedControlItem>
  <SegmentedControlItem value="l">L</SegmentedControlItem>
</SegmentedControl>;
```

## Composition

Use `FieldsetLegend` for the visible group label. The root renders a radio group with native hidden radio inputs, so `name`, `required`, `value`, `defaultValue`, and `onValueChange` work with form state and native form submission.

```tsx
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

<Fieldset>
  <FieldsetLegend>Shirt size</FieldsetLegend>
  <SegmentedControl aria-label="Shirt size" defaultValue="m">
    <SegmentedControlItem value="s">S</SegmentedControlItem>
    <SegmentedControlItem value="m">M</SegmentedControlItem>
    <SegmentedControlItem value="l">L</SegmentedControlItem>
  </SegmentedControl>
</Fieldset>;
```

## Examples

### Sizes

Use the same `size` values as `Input` to align the control with neighboring form controls.

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

const sizes = ["sm", "default", "lg"] as const;

export default function SegmentedControlSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      {sizes.map((size) => (
        <SegmentedControl
          aria-label={`${size} shirt size`}
          className="w-full"
          defaultValue="m"
          key={size}
          size={size}
        >
          <SegmentedControlItem className="flex-1" value="s">
            S
          </SegmentedControlItem>
          <SegmentedControlItem className="flex-1" value="m">
            M
          </SegmentedControlItem>
          <SegmentedControlItem className="flex-1" value="l">
            L
          </SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  );
}
```

### With Field

Place the group inside `Field` to connect its label and description.

```tsx
"use client";

import { useState } from "react";

import { Field, FieldDescription, FieldLabel } from "@/registry/base/field";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

export default function SegmentedControlWithFieldDemo() {
  const [value, setValue] = useState("m");

  return (
    <Field className="w-full max-w-sm" name="shirtSize">
      <FieldLabel>Shirt size</FieldLabel>
      <SegmentedControl
        aria-label="Shirt size"
        className="w-full"
        name="shirtSize"
        onValueChange={setValue}
        value={value}
      >
        <SegmentedControlItem className="flex-1" value="s">
          S
        </SegmentedControlItem>
        <SegmentedControlItem className="flex-1" value="m">
          M
        </SegmentedControlItem>
        <SegmentedControlItem className="flex-1" value="l">
          L
        </SegmentedControlItem>
      </SegmentedControl>
      <FieldDescription>Choose the size that fits you best.</FieldDescription>
    </Field>
  );
}
```

### Invalid

Submit without choosing a size to show the persistent destructive outline, one group-level error, and the invalid shake. Selecting a size clears the error, and another failed submission replays the shake.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import { Field, FieldError, FieldErrorSlot } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

const shirtSizes = ["s", "m", "l"] as const;

export default function SegmentedControlInvalidDemo() {
  const errorId = useId();
  const form = useForm({
    defaultValues: { shirtSize: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="shirtSize"
        validators={{
          onDynamic: ({ value }) =>
            shirtSizes.includes(value as (typeof shirtSizes)[number])
              ? undefined
              : "Choose a shirt size to continue.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <Fieldset className="mb-2">
                <FieldsetLegend>Shirt size</FieldsetLegend>
                <SegmentedControl
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                  className="w-full"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => field.handleChange(value)}
                  required
                  value={field.state.value}
                >
                  <SegmentedControlItem className="flex-1" value="s">
                    S
                  </SegmentedControlItem>
                  <SegmentedControlItem className="flex-1" value="m">
                    M
                  </SegmentedControlItem>
                  <SegmentedControlItem className="flex-1" value="l">
                    L
                  </SegmentedControlItem>
                </SegmentedControl>
              </Fieldset>
              <FieldErrorSlot>
                <FieldError id={errorId} match={invalid}>
                  {error}
                </FieldError>
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

### With Form

Connect `SegmentedControl` to a TanStack Form field through `Field`. The selected value is submitted with the form and shown after saving.

```tsx
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Field, FieldDescription } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

export default function SegmentedControlFormDemo() {
  const [submittedSize, setSubmittedSize] = useState<string>();
  const form = useForm({
    defaultValues: { shirtSize: "m" },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSubmittedSize(value.shirtSize);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field name="shirtSize">
        {(field) => (
          <Field name={field.name}>
            <Fieldset className="mb-2">
              <FieldsetLegend>Shirt size</FieldsetLegend>
              <SegmentedControl
                aria-label="Shirt size"
                className="w-full"
                name={field.name}
                onBlur={field.handleBlur}
                onValueChange={field.handleChange}
                required
                value={field.state.value}
              >
                <SegmentedControlItem className="flex-1" value="s">
                  S
                </SegmentedControlItem>
                <SegmentedControlItem className="flex-1" value="m">
                  M
                </SegmentedControlItem>
                <SegmentedControlItem className="flex-1" value="l">
                  L
                </SegmentedControlItem>
              </SegmentedControl>
            </Fieldset>
            <FieldDescription>
              Your selection is submitted with the rest of the form values.
            </FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving..." : "Save size"}
          </Button>
        )}
      </form.Subscribe>

      {submittedSize && (
        <output className="text-sm text-muted-foreground">
          Saved shirt size: {submittedSize.toUpperCase()}
        </output>
      )}
    </Form>
  );
}
```

## Accessibility

Give the group an accessible name with `aria-label` or a surrounding `FieldsetLegend`. Use arrow keys to move between options and `Space` to select the focused option. For validation, put `aria-invalid` and `aria-describedby` on the segmented root and render one `FieldError` after the group.

## API Reference

`SegmentedControl` and `SegmentedControlItem` wrap the corresponding [Base UI Radio Group primitives](https://base-ui.com/react/components/radio). Supported Base UI props pass through.

### SegmentedControl

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the item density for the control. |
| `invalid` | `boolean` | `-` | Applies the invalid state to the group root. `aria-invalid` and `data-invalid` can also be passed directly. |

### SegmentedControlItem

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg"` | `-` | Overrides the size inherited from `SegmentedControl`. |
