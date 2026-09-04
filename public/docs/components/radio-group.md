# Radio Group

A set of checkable buttons where only one item can be checked at a time.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `RadioGroup` when a person must choose exactly one option from a related set.

## Preview

## Installation

## Usage

```tsx
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
```

```tsx
<RadioGroup defaultValue="react-query">
  <div className="text-sm font-medium">
    Choose your favorite Tanstack library
  </div>
  <Label>
    <Radio value="react-query" /> React Query
  </Label>
  <Label>
    <Radio value="tanstack-router" /> Tanstack Router
  </Label>
  <Label>
    <Radio value="tanstack-table" /> Tanstack Table
  </Label>
</RadioGroup>
```

## Composition

```tsx
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioRoot,
} from "@/components/ui/radio-group";

// Option #1. Basic usage:
<RadioGroup>
  <Radio value="one" />
</RadioGroup>;

// Option #2. Custom usage:
<RadioGroup>
  <RadioRoot value="one">
    <RadioIndicator />
  </RadioRoot>
</RadioGroup>;
```

## Examples

### Basic

### With Description

### Orientation

Change the orientation of the radio group with the `orientation` prop.

### Controlled

Control the selected value with the `value` prop and `onValueChange` callback.

### Custom Layout

### Disabled

### Sizes

### Custom Indicator

## API Reference

`RadioGroup`, `Radio`, and the composable radio parts wrap [Base UI Radio Group primitives](https://base-ui.com/react/components/radio-group). Supported Base UI props pass through.

### Props

#### Radio and RadioRoot

Sets the radio control size.
