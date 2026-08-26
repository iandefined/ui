# Dropdown Menu

A list of actions in a dropdown, enhanced with keyboard navigation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/dropdown-menu.json
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
```

## Anatomy

```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger />
  <DropdownMenuContent>
    <DropdownMenuItem />
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuGroupLabel />
      <DropdownMenuItem />
    </DropdownMenuGroup>
    <DropdownMenuCheckboxItem />
    <DropdownMenuRadioGroup>
      <DropdownMenuRadioItem />
    </DropdownMenuRadioGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger />
      <DropdownMenuSubContent />
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Examples

### Basic

### With Arrow

Set `showArrow` on the content. Keep `sideOffset` at 8 or more so the arrow has room.

### Sides

Set `side` on the content to control where the menu opens. The default is `bottom`.

### Open on Hover

Set `openOnHover` on the trigger to open the menu on hover instead of click.

### Checkboxes

Checkbox items stay open when clicked by default. Set `closeOnClick` to close the menu after a selection.

```tsx
<DropdownMenuCheckboxItem closeOnClick>
  Show status bar
</DropdownMenuCheckboxItem>
```

### Radio Group

Radio items also stay open by default. Set `closeOnClick` to close the menu after choosing an item.

```tsx
<DropdownMenuRadioItem closeOnClick value="light">
  Light
</DropdownMenuRadioItem>
```

Pass `activeIcon` to the radio group to replace the default dot indicator.

### With Groups

### Nested Menu

### Navigate to Another Page

Compose a menu item with an anchor using Base UI’s `render` prop.

```tsx
<DropdownMenuItem render={<a href="/projects" />}>
  Go to projects
</DropdownMenuItem>
```

### Open a Dialog

Control the dialog state and open it from the menu item’s `onClick` handler.

```tsx
<DropdownMenuItem onClick={() => setDialogOpen(true)}>
  Open dialog
</DropdownMenuItem>
```

## Popup Animation

Set `animationPreset` on the content. The default is `scale`.

### Scale

### Wipe

### Wipe Scale

### Motion

### Motion Blur

### Slide Outside

### Slide Inside
