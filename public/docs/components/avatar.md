# Avatar

An image element with a fallback for representing the user.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/avatar.json
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
```

```tsx
<Avatar>
  <AvatarImage src="/avatars/01.png" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Anatomy

```tsx
<Avatar>
  <AvatarImage />
  <AvatarFallback />
</Avatar>
```

## Examples

### Fallback Only

### Sizes

### Radius

### Group Avatars
