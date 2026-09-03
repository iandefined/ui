# Badge

Compact labels for status, category, or metadata.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/badge.json
```

```bash
npm install @base-ui/react class-variance-authority clsx tailwind-merge
```

```css
@theme inline {
  --color-destructive-foreground: var(--destructive-foreground);
  --color-error: var(--error);
  --color-error-foreground: var(--error-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}

:root {
  --destructive-foreground: var(--color-white);
  --error: var(--color-red-500);
  --error-foreground: var(--color-red-700);
  --info: var(--color-blue-500);
  --info-foreground: var(--color-blue-700);
  --success: var(--color-emerald-500);
  --success-foreground: var(--color-emerald-700);
  --warning: var(--color-amber-500);
  --warning-foreground: var(--color-amber-700);
}

.dark {
  --destructive-foreground: var(--color-white);
  --error: var(--color-red-500);
  --error-foreground: var(--color-red-400);
  --info: var(--color-blue-500);
  --info-foreground: var(--color-blue-400);
  --success: var(--color-emerald-500);
  --success-foreground: var(--color-emerald-400);
  --warning: var(--color-amber-500);
  --warning-foreground: var(--color-amber-400);
}
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
import { Badge } from "@/components/ui/badge";
```

```tsx
<Badge>Badge</Badge>
```

## Palette colors

Set `color` only with an explicit `translucent` or `dot` variant. Semantic
variants such as `success` and `warning` own their color and do not accept the
`color` prop.

```tsx
<Badge color="violet" variant="translucent">
  Fiction
</Badge>

<Badge color="emerald" variant="dot">
  Online
</Badge>
```

## Examples

### Semantic variants

### Palette colors

### Sizes

### With Icon

### With Link

### With Count

## API Reference

| Prop      | Type                                                                                                                              | Default     | Description                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "error" \| "info" \| "success" \| "warning" \| "translucent" \| "dot"` | `"default"` | Controls the semantic or palette-driven appearance.     |
| `color`   | `BadgeColor`                                                                                                                      | `"gray"`    | Requires an explicit `translucent` or `dot` variant.    |
| `size`    | `"default" \| "compact"`                                                                                                          | `"default"` | Controls the badge height, gap, padding, and type size. |
| `render`  | `React.ReactElement`                                                                                                              | —           | Renders another element, such as a link, as the badge.  |
