# Fancy Button

A glossy button with press animation, custom color gradients, and section icons.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Fancy Button is intended for a hero call to action or another single standout action. Use the standard [Button](/docs/components/button) for routine interface actions.

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/fancy-button.json
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
import { FancyButton } from "@/components/ui/fancy-button";
```

```tsx
<FancyButton>Get started</FancyButton>
```

## Examples

### Sizes

The default size is `h-9`, matching the standard Button. Its small and large sizes also use the same `h-8` and `h-10` heights.

| Value     | Description                     |
| --------- | ------------------------------- |
| `xs`      | Compact text button.            |
| `sm`      | Small text button.              |
| `default` | Standard `h-9` button.          |
| `lg`      | Large text button.              |
| `icon-xs` | Extra-small square icon button. |
| `icon-sm` | Small square icon button.       |
| `icon`    | Standard square icon button.    |
| `icon-lg` | Large square icon button.       |

### With Icons

Use `leftSection` and `rightSection` to place icons beside the label with optical padding.

### Custom Colors

Set `color` to generate a glossy gradient, border ring, and hover treatment from any valid CSS color.

### Loading

Pass `disabled` with a spinner when an action is in progress.

### Disabled

### As Link

Use Base UI's `render` prop and set `nativeButton={false}` when the component renders as a link.

## Accessibility

Give icon-only buttons an `aria-label`. Disabled buttons preserve their visual size and remove pointer interaction.

## API Reference

Fancy Button wraps Base UI's Button and accepts its props in addition to the custom props below.

| Prop           | Type                                                                                 | Default     | Description                                     |
| -------------- | ------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------- |
| `size`         | `"xs" \| "sm" \| "default" \| "lg" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg"` | `"default"` | Controls button height and padding.             |
| `color`        | `string`                                                                             | —           | CSS color used to generate the glossy gradient. |
| `leftSection`  | `ReactNode`                                                                          | —           | Content rendered before the label.              |
| `rightSection` | `ReactNode`                                                                          | —           | Content rendered after the label.               |
