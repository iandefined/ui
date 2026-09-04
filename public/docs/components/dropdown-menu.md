# Dropdown Menu

A list of actions in a dropdown, enhanced with keyboard navigation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DropdownMenu` to expose contextual actions without permanently occupying space.

## Preview

## Installation

## Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Account settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Composition

Compose items, groups, checkbox or radio groups, separators, and nested submenus inside `DropdownMenuContent`.

## Examples

### With Arrow

Set `showArrow` on the content.

### Sides

Set `side` to control the opening direction.

### Open on Hover

Set `openOnHover` on the trigger.

### Checkboxes

Checkbox items remain open by default; set `closeOnClick` to close after selection.

### Radio Group

Radio items remain open by default and support a custom `activeIcon`.

### With Groups

Organize related actions.

### Nested Menu

Use a submenu for secondary actions.

### Navigate to Another Page

Use Base UI's `render` prop to make an item a link.

```tsx
<DropdownMenuItem render={<a href="/projects" />}>
  Go to projects
</DropdownMenuItem>
```

### Open a Dialog

Open application state from an item's `onClick` handler.

```tsx
<DropdownMenuItem onClick={() => setDialogOpen(true)}>
  Open dialog
</DropdownMenuItem>
```

### Popup Animations

Choose an animation preset for the menu content.

## Accessibility

Use clear item labels. Give an icon-only trigger an `aria-label`, and keep destructive actions visually and verbally distinct.

## API Reference

`DropdownMenu` wraps [Base UI Menu](https://base-ui.com/react/components/menu). Supported Base UI menu props pass through.

### DropdownMenuContent Props

Sets the entry and exit animation.
Sets the modal backdrop treatment.

### DropdownMenuItem Props

Sets the item treatment.

### DropdownMenuRadioGroup Props

Replaces the default selected-item indicator.
