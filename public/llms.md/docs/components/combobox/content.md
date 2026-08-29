# Combobox

A filterable input for selecting one or more predefined values.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/combobox.json
```

```bash
npm install @base-ui/react clsx tailwind-merge
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input.json https://ui.iandefined.com/r/label.json https://ui.iandefined.com/r/scroll-area.json
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
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox";
```

```tsx
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

The value passed to `ComboboxItem` must match the item type. When items are objects without a `label` property, provide `itemToStringLabel` so the selected value renders as useful input text.

## Anatomy

```tsx
<Combobox>
  <ComboboxLabel />
  <ComboboxInput />
  <ComboboxPopup>
    <ComboboxEmpty />
    <ComboboxList>
      <ComboboxGroup>
        <ComboboxGroupLabel />
        <ComboboxCollection>
          <ComboboxItem />
        </ComboboxCollection>
      </ComboboxGroup>
      <ComboboxSeparator />
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
```

For multiple selection, replace the standalone input with `ComboboxChips`, render selected `ComboboxChip` values inside `ComboboxValue`, and keep `ComboboxInput` inside the chips container.

## Examples

### Basic

Primitive values can be passed directly. `autoHighlight` highlights the first match while filtering.

### Controlled Object Value

Use `value` and `onValueChange` when application state owns the selection. `itemToStringLabel` controls how an object value appears in the input.

### With Label

Give the input an `id` and connect a visible label with `htmlFor`.

### Multiple Selection

Set `multiple` and render removable selected values as chips.

### Input Inside Popup

Use `ComboboxTrigger` as the form control when the filter input belongs inside the popup. Set `showTrigger={false}` on that input so the combobox has only one trigger.
Keep the trigger icon at the inline end with `ms-auto shrink-0`; its position then remains stable even when no value or placeholder is rendered.

### Clearable Combobox

Set `isClearable` on `ComboboxInput` to replace the toggle icon with a clear action after a value is selected.

### Groups

This color-palette example follows Pure UI's grouped implementation: it derives `{ value, items }` color families, renders each family through `ComboboxCollection`, and shows the selected color's HEX and RGB values.
