# Switch

A draggable toggle with spring-based thumb animation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/switch.json
```

```bash
npm install @base-ui/react framer-motion clsx tailwind-merge
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
import { Switch } from "@/components/ui/switch";
```

```tsx
const [checked, setChecked] = useState(false);

<Switch
  aria-label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>;
```

## Examples

### With Label

### Disabled

### Sizes

### Controlled

### Custom Card Style
