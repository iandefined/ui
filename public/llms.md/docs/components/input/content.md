# Input

A styled text input built on Base UI.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input.json
```

The CLI also installs `TextMorph` and its Calligraph and Motion dependencies for the animated controlled example.

```bash
npx shadcn@latest add https://ui.iandefined.com/r/text-morph.json
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
import { Input } from "@/components/ui/input";

<Input placeholder="Enter text" />;
```

## Examples

### Sizes

### Input Types

### File

### Disabled

### Controlled

The value preview uses the shared `TextMorph` abstraction instead of a component-specific text animation.
