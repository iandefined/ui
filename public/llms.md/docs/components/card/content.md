# Card

A container with header, content, action, and footer regions.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/card.json
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
```

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description.</CardDescription>
  </CardHeader>
  <CardContent>Card content.</CardContent>
</Card>
```

## Anatomy

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
    <CardAction />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>
```

## Examples

### With Footer and Action

Use `CardFooter` for actions below the content and `CardAction` for a control in
the header.

### Variants

Use `variant` to change how the card is framed.

The `inset` variant keeps the outer frame on `card` and uses the lighter `muted`
token for its nested content panel. It does not require surface levels or
additional theme variables.

## API Reference

| Prop        | Type                   | Default     | Description                        |
| ----------- | ---------------------- | ----------- | ---------------------------------- |
| `variant`   | `"default" \| "inset"` | `"default"` | Changes how the card is framed.    |
| `className` | `string`               | -           | Adds styles to the card container. |
