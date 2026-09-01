# Button

A button with a glossy default treatment, custom colors, variants, sections, and sizes.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
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
import { Button } from "@/components/ui/button";
```

```tsx
<Button>Get started</Button>
```

The default variant uses the glossy treatment. Pass any valid CSS color to `color` to generate its gradient and ring.

```tsx
<Button className="text-white" color="#3b82f6">
  Get started
</Button>
```

`color` is part of a discriminated union: it is available when `variant` is `"default"` or omitted, and TypeScript rejects it for every other variant.

## Examples

### Variants

### Custom Colors

### Sizes

### With Icons

Use `leftSection` and `rightSection` to place icons beside the label with optical padding.

### Loading

Pass `disabled` with a spinner when an action is in progress.

### Disabled

### As Link

Use Base UI's `render` prop and set `nativeButton={false}` when the component renders as a link.

## Accessibility

Give icon-only buttons an `aria-label`. Disabled buttons preserve their visual size and remove pointer interaction.

## API Reference

Button wraps Base UI's Button and accepts its props in addition to the props below.

| Prop           | Type                                                                                                      | Default     | Description                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| `variant`      | `"default" \| "secondary" \| "outline" \| "ghost" \| "link" \| "destructive"`                             | `"default"` | Controls the visual treatment.                            |
| `color`        | `string`                                                                                                  | —           | Generates the default variant's glossy gradient and ring. |
| `size`         | `"xs" \| "sm" \| "default" \| "lg" \| "xl" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg" \| "icon-xl"` | `"default"` | Controls button height and padding.                       |
| `radius`       | `"none" \| "sm" \| "default" \| "lg" \| "xl" \| "full"`                                                   | `"default"` | Controls the corner radius.                               |
| `leftSection`  | `ReactNode`                                                                                               | —           | Content rendered before the label.                        |
| `rightSection` | `ReactNode`                                                                                               | —           | Content rendered after the label.                         |
