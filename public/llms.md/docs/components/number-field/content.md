# Number Field

A numeric input with increment, decrement, and scrub controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `NumberField` when people need to enter a numeric value or adjust it with dedicated controls.

## Preview

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/base/number-field";

export default function NumberFieldDemo() {
  return (
    <NumberField defaultValue={0}>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/number-field.json
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

## Composition

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/ui/number-field";

<NumberField>
  <NumberFieldScrubArea />
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>;
```

## Examples

### Sizes

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/base/number-field";

export default function NumberFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <NumberField defaultValue={10} size="sm">
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Small number field" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={20}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Default number field" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={30} size="lg">
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Large number field" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
```

### With Scrub

Wrap a label in `NumberFieldScrubArea` to let people drag the label and adjust the value. Set `allowWheelScrub` to also allow mouse-wheel scrubbing while the input is focused.

```tsx
import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldWithScrubDemo() {
  return (
    <NumberField defaultValue={0} id="marks">
      <NumberFieldScrubArea>
        <Label className="cursor-ew-resize" htmlFor="marks">
          Marks
        </Label>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

### Disabled

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/base/number-field";

export default function NumberFieldDisabledDemo() {
  return (
    <NumberField defaultValue={0} disabled>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

### Range

Use `min` and `max` to constrain the allowed values.

```tsx
import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldRangeDemo() {
  return (
    <div className="flex flex-col gap-5">
      <NumberField defaultValue={10} id="minimum" min={5}>
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="minimum">
            Minimum
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={10} id="maximum" max={25}>
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="maximum">
            Maximum
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={10} id="range" max={25} min={5}>
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="range">
            Range
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
```

### Step

```tsx
import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldStepDemo() {
  return (
    <NumberField defaultValue={0} id="step-20" step={20}>
      <NumberFieldScrubArea>
        <Label className="cursor-ew-resize" htmlFor="step-20">
          Step 20
        </Label>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

### Controlled

```tsx
import { useState } from "react";

import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldControlledDemo() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <NumberField
        id="controlled"
        onValueChange={(nextValue) => setValue(nextValue ?? 0)}
        value={value}
      >
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="controlled">
            Controlled
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <span className="px-1 text-sm text-muted-foreground">Value: {value}</span>
    </div>
  );
}
```

### Formatting

Pass `Intl.NumberFormat` options through `format` to display values such as currency.

```tsx
import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldFormattingDemo() {
  return (
    <NumberField
      defaultValue={0}
      format={{ currency: "USD", style: "currency" }}
      id="price"
      min={0}
    >
      <NumberFieldScrubArea>
        <Label className="cursor-ew-resize" htmlFor="price">
          Price
        </Label>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

## API Reference

`NumberField` and its parts wrap the corresponding [Base UI Number Field primitives](https://base-ui.com/react/components/number-field). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg" \| number` | `default` | Sets the styled size. A numeric value keeps the default visual size for compatibility with Base UI sizing. |
