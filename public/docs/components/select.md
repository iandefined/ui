# Select

A form control for choosing one or more values from a popup list.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Select` to choose one or more values from a popup list.

## Preview

## Installation

## Usage

```tsx
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
```

```tsx
const items = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

<Select items={items}>
  <SelectTrigger>
    <SelectValue placeholder="Select a framework" />
    <SelectIcon />
  </SelectTrigger>
  <SelectPopup>
    <SelectList>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          <SelectItemText>{item.label}</SelectItemText>
          <SelectItemIndicator />
        </SelectItem>
      ))}
    </SelectList>
  </SelectPopup>
</Select>;
```

Pass `items` to `Select` when `SelectValue` should resolve a selected value to its label. Without `items`, the value renders as-is. For a searchable list, use a combobox instead.

## Composition

```tsx
<Select>
  <SelectTrigger>
    <SelectValue />
    <SelectIcon />
  </SelectTrigger>
  <SelectPopup>
    <SelectList>
      <SelectGroup>
        <SelectGroupLabel />
        <SelectItem>
          <SelectItemText />
          <SelectItemIndicator />
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
    </SelectList>
  </SelectPopup>
</Select>
```

## Examples

### Basic

Use `alignItemWithTrigger` when the selected item should align with the trigger value while the popup is open.

### Country

Items can include rich content such as icons or images.

### Formatting Values

Providing `items` lets `SelectValue` display the matching label instead of the raw value.

Pass a function child to `SelectValue` when the trigger needs custom content.

### Object Values

Items can use objects as values. Set `itemToStringValue` so forms and hidden inputs receive a stable string.

### Multiple Selection

Set `multiple` to work with an array of selected values.

### Groups

Use `SelectGroup`, `SelectGroupLabel`, and `SelectSeparator` to organize related options.

### Disabled

Disable the entire control or individual items with the `disabled` prop.

### Controlled

Control the selection with `value` and `onValueChange` when application state owns the current value.

## Popup Animation

Set `animationPreset` on `SelectPopup`. This gallery uses each preset's exact prop value as its trigger label. Set `reduceMotion` to disable popup animation.

## API Reference

`Select` and its parts wrap the corresponding [Base UI Select primitives](https://base-ui.com/react/components/select). Supported Base UI props pass through.

### Props

#### Select

Sets the backdrop rendered while the popup is open.

#### SelectPopup

Sets the popup enter and exit animation.
Disables the popup animation.
>
Mounts the popup inside a specific container. Use this when nesting a Select
in an overlay from another primitive library so its focus and outside-click
handling include the popup.
