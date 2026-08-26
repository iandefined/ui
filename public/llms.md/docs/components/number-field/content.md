# Number Field

A numeric input with increment, decrement, and scrub controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/number-field.json
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

## Anatomy

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

### With Scrub

Wrap a label in `NumberFieldScrubArea` to let people drag the label and adjust the value. Set `allowWheelScrub` to also allow mouse-wheel scrubbing while the input is focused.

### Disabled

### Range

Use `min` and `max` to constrain the allowed values.

### Step

### Controlled

### Formatting

Pass `Intl.NumberFormat` options through `format` to display values such as currency.
