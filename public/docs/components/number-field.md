# Number Field

A numeric input with increment, decrement, and scrub controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `NumberField` when people need to enter a numeric value or adjust it with dedicated controls.

## Preview

## Installation

## Usage

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
```

```tsx
<NumberField defaultValue={0}>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
```

## Composition

```tsx
<NumberField>
  <NumberFieldScrubArea />
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
```

## Examples

### Sizes

### With Scrub

Wrap a label in `NumberFieldScrubArea` to let people drag the label and adjust the value. Set `allowWheelScrub` to also allow mouse-wheel scrubbing while the input is focused.

### Disabled

### Range

Use `min` and `max` to constrain the allowed values.

### Step

### Controlled

### Formatting

Pass `Intl.NumberFormat` options through `format` to display values such as currency.

## API Reference

`NumberField` and its parts wrap the corresponding [Base UI Number Field primitives](https://base-ui.com/react/components/number-field). Supported Base UI props pass through.

### Props

Sets the styled size. A numeric value keeps the default visual size for
compatibility with Base UI sizing.
