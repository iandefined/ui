# useFuzzyFilter

Fuzzy matching hook for filtering and sorting items by relevance.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/use-fuzzy-filter.json
```

```bash
npm install match-sorter
```

## Overview

`useFuzzyFilter` provides fuzzy matching capabilities powered by [match-sorter](https://github.com/kentcdodds/match-sorter). It returns reusable filter functions that work with lists, Combobox, Command menus, and custom search inputs.

### When to Use

- **Multi-field search**: Search across title, description, tags, or nested keys simultaneously.
- **Relevance sorting**: Automatically rank best matches first based on character adjacency, word boundaries, and acronyms.
- **Flexible matching**: Match acronyms, prefix queries, partial substrings, and typo-tolerant words.

## Usage

```tsx
import { useFuzzyFilter } from "@/hooks/use-fuzzy-filter";
```

```tsx
const { filter, filterItem } = useFuzzyFilter({
  keys: ["name", "description"],
  threshold: "contains",
});

// Filter and sort an array by relevance
const results = filter(items, query);

// Check if a single item matches
const matches = filterItem(item, query);
```

## Filtering Patterns

### External Filtering with Relevance Sorting

Use `filter` when you want the returned array sorted by relevance:

```tsx
const { filter } = useFuzzyFilter({
  keys: ["name", "description"],
});

const [query, setQuery] = useState("");
const filteredItems = useMemo(() => filter(items, query), [filter, query]);
```

### Internal Filtering (Boolean Check)

Use `filterItem` when integrating with primitives or components that take a boolean filter predicate:

```tsx
const { filterItem } = useFuzzyFilter({
  keys: ["label"],
});

// In a component that expects a boolean filter callback:
const matches = filterItem(item, query);
```

## API Reference

### Options

| Prop        | Type                                                           | Default     | Description                                                     |
| :---------- | :------------------------------------------------------------- | :---------- | :-------------------------------------------------------------- |
| `keys`      | `Array<string \| { key: string; threshold?: FuzzyThreshold }>` | Required    | Property names or key configurations to match against.          |
| `threshold` | `FuzzyThreshold`                                               | `"matches"` | Minimum ranking threshold required to consider an item a match. |

### Threshold Rankings

Thresholds range from strictest to loosest:

- `case-sensitive-equal`: Exact match with matching casing.
- `equal`: Case-insensitive exact match.
- `starts-with`: Must start with the query string.
- `word-starts-with`: Any word in the value starts with the query string.
- `contains`: Value contains the query string anywhere.
- `acronym`: Matches acronym initials (e.g. `tcr` matches `TanStack Router`).
- `matches`: Default loose fuzzy match.

### Return Value

| Property     | Type                                  | Description                                                                                  |
| :----------- | :------------------------------------ | :------------------------------------------------------------------------------------------- |
| `filter`     | `(items: T[], query: string) => T[]`  | Filters and ranks items by relevance. Returns the original array when `query` is empty.      |
| `filterItem` | `(item: T, query: string) => boolean` | Checks if a single item satisfies the filter criteria. Returns `true` when `query` is empty. |
