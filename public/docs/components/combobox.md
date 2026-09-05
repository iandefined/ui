# Combobox

A filterable input for selecting one or more predefined values.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Combobox` when users choose from a list and need to filter it first.

## Preview

## Installation

## Usage

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox";

const fruits = ["Apple", "Banana", "Orange"];

<Combobox items={fruits}>
  <ComboboxInput aria-label="Select a fruit" placeholder="Select a fruit..." />
  <ComboboxPopup>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>
      {(fruit: string) => (
        <ComboboxItem key={fruit} value={fruit}>
          {fruit}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>;
```

## Composition

Use `ComboboxChips`, `ComboboxValue`, and `ComboboxChip` for multiple selection; keep `ComboboxInput` inside the chips container.

## Examples

### Basic

Filter primitive values.

### Controlled Object Value

Control object selections with `value` and `onValueChange`.

### With Label

Associate a visible label with the input.

### Multiple Selection

Render selected values as removable chips.

### Input Inside Popup

Move filtering into the popup when the trigger is the form control.

### Clearable Combobox

Replace the toggle with a clear action after selection.

### Groups

Organize option families in collections.

## API Reference

`Combobox` wraps [Base UI Combobox](https://base-ui.com/react/components/combobox). Supported Base UI props pass through.

### ComboboxInput Props

Shows the popup toggle button.
Shows a clear action after selection.

### ComboboxPopup Props

Sets the preferred side of the input.
Sets the distance from the input in pixels.
Sets alignment relative to the input.
Offsets the popup along the alignment axis.

### ComboboxChips Props

Controls chip wrapping and single-line +X overflow compression.
Explicit limit on visible chips before showing the +X overflow badge.
