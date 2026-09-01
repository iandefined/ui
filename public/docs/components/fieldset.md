# Fieldset

A semantic field group with a styled legend.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/fieldset.json
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/checkbox.json https://ui.iandefined.com/r/input.json https://ui.iandefined.com/r/label.json https://ui.iandefined.com/r/radio-group.json
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
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
```

```tsx
<Fieldset>
  <FieldsetLegend>Shipping address</FieldsetLegend>
  {/* Input and Label compositions */}
</Fieldset>
```

## Anatomy

```tsx
<Fieldset>
  <FieldsetLegend />
</Fieldset>
```

Fieldset uses native `fieldset` and `legend` elements, so related controls retain their semantic grouping without another form library.

## Examples

### With Radio Group

Place a Radio Group inside Fieldset when the user must choose exactly one option.

### With Checkbox Group

Use several controlled Checkbox components when the user can choose multiple related options.
