# Radio Group

A set of checkable buttons where only one item can be checked at a time.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/radio-group.json
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

## Anatomy

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
