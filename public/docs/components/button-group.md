# Button Group

A container that groups related buttons together with consistent styling.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button-group.json
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/separator.json
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
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
```

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## Anatomy

```tsx
<ButtonGroup>
  <Button />
  <ButtonGroupSeparator orientation="vertical" />
  <ButtonGroupText>Text</ButtonGroupText>
</ButtonGroup>
```

## Examples

### Basic

### Orientation

Set the `orientation` prop to change the button group layout.

### Sizes

Control the size of buttons using the `size` prop on individual buttons.

### Nested

Nest `ButtonGroup` components to create button groups with spacing.

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator because they have a border. For other variants, a separator improves the visual hierarchy.

### Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

### Input

Wrap an Input component with buttons.

### Input Group

Wrap an Input Group component to create complex input layouts.

### Menu

Create a split button group with a Dropdown Menu component.

### Select

Pair with a Select component.

### Popover

Use with a Popover component.
