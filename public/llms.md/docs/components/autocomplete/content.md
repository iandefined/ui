# Autocomplete

A filterable text input that suggests matching options while accepting free-form text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Autocomplete` when users benefit from suggestions but may enter any text.

## Preview

## Installation

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

## Composition

Place the input and popup inside `Autocomplete`; use groups, collections, and separators to organize suggestions.

## Examples

### Auto Highlight

Highlight the first matching suggestion while typing.

### Clearable Input

Show an inline clear action after text is entered.

### Trigger and Clear

Show both the popup trigger and clear action.

### Grouped Options

Organize related suggestions into groups.

### Inline Suggestions

Complete with the first matching suggestion.

### Limited Results

Constrain the number of rendered suggestions.

### Async Loading

Filter asynchronous results with status feedback.

### Fuzzy Search

Use loose matching across option fields.

### Custom Matching Strategy

Choose a string-matching strategy.

### Result Counter and Stats

Read the filtered item list for contextual summaries.

## API Reference

`Autocomplete` wraps [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete). Supported Base UI props pass through.

### AutocompleteInput Props

Shows a popup toggle button.
Shows a clear action after text is entered.
Alias for `showClear`.

### AutocompletePopup Props

Sets the preferred side of the input.
Sets the distance from the input in pixels.
Sets alignment relative to the input.
Offsets the popup along the alignment axis.

### AutocompleteList Props

Shows gradients for hidden scrollable content.
Hides the scrollbar while preserving scrolling.
