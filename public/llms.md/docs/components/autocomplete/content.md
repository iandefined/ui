# Autocomplete

A filterable text input that suggests matching options while accepting free-form text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/autocomplete.json
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
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete";
```

```tsx
const tags = ["feature", "fix", "bug", "docs"];

<Autocomplete items={tags}>
  <AutocompleteInput placeholder="Search tags..." />
  <AutocompletePopup>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      {(tag: string) => (
        <AutocompleteItem key={tag} value={tag}>
          {tag}
        </AutocompleteItem>
      )}
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>;
```

## Anatomy

```tsx
<Autocomplete>
  <AutocompleteLabel />
  <AutocompleteInput />
  <AutocompletePopup>
    <AutocompleteEmpty />
    <AutocompleteList>
      <AutocompleteGroup>
        <AutocompleteGroupLabel />
        <AutocompleteCollection>
          <AutocompleteItem />
        </AutocompleteCollection>
      </AutocompleteGroup>
      <AutocompleteSeparator />
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
```

## Examples

### Auto Highlight

Set `autoHighlight` on `AutocompleteRoot` (or `<Autocomplete>`) to automatically highlight the first matching suggestion while typing.

### Clearable Input

Set `showClear` on `AutocompleteInput` to display an inline clear button when text has been entered.

### Trigger and Clear

Set both `showTrigger` and `showClear` on `AutocompleteInput` to display both a dropdown toggle and a clear button.

### Grouped Options

Group related suggestions with `AutocompleteGroup`, `AutocompleteGroupLabel`, and `AutocompleteCollection`.

### Inline Suggestions

Set `mode="both"` on `AutocompleteRoot` to complete the input value inline with the first matching suggestion.

### Limited Results

Set `limit` on `AutocompleteRoot` to constrain the maximum number of suggestions rendered in the popup.

### Async Loading

Filter and fetch results asynchronously with debounce, loading indicator, and custom status messages using `useAutocompleteFilter`.

### Fuzzy Search

Combine with `useFuzzyFilter` from `@/registry/base/use-fuzzy-filter` for loose fuzzy matching across titles, categories, and descriptions.

### Custom Matching Strategy

Use `useAutocompleteFilter` to apply string matching strategies like `startsWith`, `contains`, or `endsWith` with locale-aware sensitivity options.

### Result Counter and Stats

Use `useAutocompleteFilteredItems` inside an Autocomplete component tree to display real-time result counters, match percentages, or contextual summaries.

## API Reference

The Autocomplete component is built on top of [Base UI's Autocomplete](https://base-ui.com/react/components/autocomplete). All Base UI props are supported.

### AutocompleteInput

Text input with optional trigger and clear actions. Wraps Base UI's `Autocomplete.Input` with styled input and action buttons.

| Prop          | Type      | Default | Description                                                   |
| ------------- | --------- | ------- | ------------------------------------------------------------- |
| `showTrigger` | `boolean` | `false` | Shows a toggle button to open or close the suggestions popup. |
| `showClear`   | `boolean` | `false` | Shows a clear button to reset input value when non-empty.     |
| `isClearable` | `boolean` | `false` | Alias for `showClear`.                                        |

### AutocompletePopup

Popup container presenting suggestions with exit and entry animations. Can be used standalone or within `AutocompletePositioner`.

| Prop         | Type                           | Default    | Description                                                  |
| ------------ | ------------------------------ | ---------- | ------------------------------------------------------------ |
| `side`       | `"top" \| "bottom"`            | `"bottom"` | Preferred side relative to anchor.                           |
| `sideOffset` | `number`                       | `0`        | Distance in pixels between the input and the dropdown popup. |
| `align`      | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to anchor.                                |

### AutocompleteList

Scrollable list container wrapping `ScrollArea` and Base UI's `Autocomplete.List`.

| Prop            | Type                                             | Default      | Description                                                       |
| --------------- | ------------------------------------------------ | ------------ | ----------------------------------------------------------------- |
| `scrollShadow`  | `"vertical" \| "horizontal" \| "both" \| "none"` | `"vertical"` | Directional gradient shadow indicating hidden scrollable content. |
| `hideScrollbar` | `boolean`                                        | `false`      | Hides the custom scrollbar while preserving scroll functionality. |

### Hooks

#### `useAutocompleteFilter`

Provides built-in string filter matchers (`contains`, `startsWith`, `endsWith`) from Base UI for custom filtering workflows.

```tsx
import { useAutocompleteFilter } from "@/components/ui/autocomplete";

const { contains, startsWith, endsWith } = useAutocompleteFilter({
  sensitivity: "base",
});
```

#### `useAutocompleteFilteredItems`

Returns the currently filtered items array directly from within an `<AutocompleteRoot>` context.

```tsx
import { useAutocompleteFilteredItems } from "@/components/ui/autocomplete";

function MatchCount() {
  const filteredItems = useAutocompleteFilteredItems<ItemType>();
  return <span>{filteredItems.length} results</span>;
}
```
