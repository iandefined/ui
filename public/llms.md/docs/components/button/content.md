# Button

Displays a button or a component that looks like a button.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

<div className="flex flex-wrap items-center gap-2 md:flex-row">
</div>

```tsx
<div className="flex flex-wrap items-center gap-2 md:flex-row">
  <Button>Button</Button>
  <Button variant="outline" size="icon" aria-label="Submit">
    <ArrowUpIcon />
  </Button>
</div>
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
```

```bash
npm install @base-ui/react tailwind-variants
```

## Usage

```tsx
import { Button } from "@/components/ui/button";
```

```tsx
<Button variant="outline">Button</Button>
```

## Variants

### Default

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDefault() {
  return <Button>Default</Button>;
}
```

### Secondary

```tsx
import { Button } from "@/components/ui/button";

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>;
}
```

### Outline

```tsx
import { Button } from "@/components/ui/button";

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>;
}
```

### Ghost

```tsx
import { Button } from "@/components/ui/button";

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>;
}
```

### Link

```tsx
import { Button } from "@/components/ui/button";

export function ButtonLink() {
  return <Button variant="link">Link</Button>;
}
```

### Destructive

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>;
}
```

## Examples

### Sizes

### With Icon

### Icon Only
