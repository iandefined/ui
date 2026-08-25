# Checkbox

A control that allows the user to toggle between checked and unchecked.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Preview

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/checkbox.json
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

## Anatomy

```tsx
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxRoot,
} from "@/components/ui/checkbox";

// Option #1. Basic usage:
<Checkbox />;

// Option #2. Custom usage:
<CheckboxRoot>
  <CheckboxIndicator />
</CheckboxRoot>;
```

## Usage

### Disabled

### Sizes

### Radius

### Custom Icons
