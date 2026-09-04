# Checkbox

A control that allows the user to toggle between checked and unchecked.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Checkbox` for independent boolean choices, including optional indeterminate states.

## Preview

## Installation

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox aria-label="Receive updates" />;
```

## Composition

Use `CheckboxRoot` and `CheckboxIndicator` when a custom composition needs separate parts.

```tsx
<CheckboxRoot>
  <CheckboxIndicator />
</CheckboxRoot>
```

## Examples

### Disabled

Prevent changes while retaining the current state.

### Sizes

Align the checkbox with nearby controls.

### Radius

Adjust the checkmark container's corner radius.

### Custom Icons

Provide an icon for checked and indeterminate states.

## Accessibility

Give an unlabeled checkbox an `aria-label`, or associate it with a visible `<label>`.

## API Reference

`Checkbox` wraps [Base UI Checkbox](https://base-ui.com/react/components/checkbox). Supported Base UI props pass through.

### Props

Sets the control dimensions.
Sets the indicator corner radius.
Disables the indicator animation.
