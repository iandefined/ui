# Field

An accessible form field with automatic labels, descriptions, validation state, and error messages.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/field.json
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input.json
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

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
```

```tsx
const invalid = Boolean(error);

<Field invalid={invalid} name="email">
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" />
  {invalid ? (
    <FieldError match>{error}</FieldError>
  ) : (
    <FieldDescription>We only use this for account updates.</FieldDescription>
  )}
</Field>;
```

## Anatomy

```tsx
<Field>
  <FieldLabel />
  <FieldControl />
  {invalid ? (
    <FieldErrorSlot>
      <FieldError />
    </FieldErrorSlot>
  ) : (
    <FieldDescription />
  )}
  <FieldItem />
  <FieldValidity />
</Field>
```

`FieldControl` uses the same variants as Input. You can also place an existing Base UI control inside `Field`, which makes the component useful around Checkbox, Switch, Radio Group, Slider, and other registry controls.

## Examples

### Validation

Map validation state from a form library into `invalid`, `dirty`, and `touched`. Show either the helper or the error directly after the control so the message has one clear meaning. Field automatically applies `aria-invalid` and associates the active message through `aria-describedby`; errors also announce with `role="alert"`.

### Checkbox and Switch

Place Checkbox or Switch inside `FieldLabel` for an implicit accessible label.

### Radio Group

Combine Field, Fieldset, and `FieldItem` to label each option in a related choice group.

### Slider

Use the Slider's own `SliderLabel` because Slider is a trigger-based control.

### Disabled

Disabling Field cascades the disabled state to its Base UI controls.

`FieldErrorSlot` uses `interpolate-size` for its height transition. Browsers without support still show and hide the error correctly, without the height animation.
