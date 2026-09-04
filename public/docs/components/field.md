# Field

An accessible field composition primitive for labels, descriptions, validation state, and errors.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Field` with either a native `<form>` or the TanStack Form `Form` adapter. The [Forms guide](/docs/forms) explains both paths and control-specific labeling patterns.

## Preview

## Installation

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
<Field
  dirty={field.state.meta.isDirty}
  invalid={Boolean(error)}
  name={field.name}
  touched={field.state.meta.isTouched}
>
  {/* control and active message */}
</Field>
```

## Examples

### Validation

Map external validation state to `Field` and animate an error into the active message slot.

### Checkbox and Switch

Wrap each control in its label to preserve an accessible click target.

### Radio Group

Combine `Field`, `Fieldset`, and `FieldItem` for a related single-choice group.

### Slider

Use Slider's own label and value display for a trigger-based range control.

### Disabled

Disable Field to cascade the state to its Base UI controls.

## Accessibility

Keep one active description or error directly after the control. `FieldError` uses `role="alert"`, while `FieldErrorSlot` preserves that association during its reduced-motion-safe transition. Do not use label color alone to communicate an error.

## API Reference

`Field` and its Base UI parts accept their underlying Base UI props in addition to the registry-owned behavior below.

Exposes dirty state to the field and its descendants.
Exposes invalid state and associates the active error with the control.
Identifies the field for label and message association.
Exposes touched state to the field and its descendants.

### FieldError

Shows the error only when the enclosing field is invalid.
