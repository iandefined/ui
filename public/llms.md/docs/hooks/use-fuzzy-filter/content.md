# useFuzzyFilter

Fuzzy matching hook for filtering and sorting items by relevance.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`useFuzzyFilter` filters a collection against one or more fields and ranks matching items by relevance. Use it for search inputs that need a sorted result list or a reusable match predicate.

```tsx
"use client";

import { useMemo, useState } from "react";

import { Badge, type BadgeColor } from "@/registry/base/badge";
import { Input } from "@/registry/base/input";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

interface Item {
  id: string;
  name: string;
  category: string;
  color: BadgeColor;
  description: string;
}

const items: Item[] = [
  {
    id: "1",
    name: "React",
    category: "Library",
    color: "violet",
    description: "A JavaScript library for building user interfaces",
  },
  {
    id: "2",
    name: "TanStack Router",
    category: "Routing",
    color: "blue",
    description: "Type-safe routing for modern React applications",
  },
  {
    id: "3",
    name: "Tailwind CSS",
    category: "Styling",
    color: "cyan",
    description: "A utility-first CSS framework for rapid UI development",
  },
  {
    id: "4",
    name: "Base UI",
    category: "Primitives",
    color: "emerald",
    description: "Unstyled UI components with accessible defaults",
  },
  {
    id: "5",
    name: "Vite",
    category: "Build Tool",
    color: "amber",
    description: "Next generation frontend tooling and bundler",
  },
  {
    id: "6",
    name: "TypeScript",
    category: "Language",
    color: "indigo",
    description: "Typed superset of JavaScript that compiles to plain JS",
  },
];

export default function UseFuzzyFilterDefaultDemo() {
  const [query, setQuery] = useState("");

  const { filter } = useFuzzyFilter<Item>({
    keys: ["name", "category", "description"],
  });

  const filteredItems = useMemo(() => filter(items, query), [filter, query]);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Input
        aria-label="Search items"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, category, or description..."
        type="search"
        value={query}
      />
      <div className="divide-border rounded-lg border border-border bg-card divide-y">
        {filteredItems.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No items matching &ldquo;{query}&rdquo;
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              className="flex items-start justify-between gap-3 p-3"
              key={item.id}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-sm text-foreground">
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              </div>
              <Badge
                depth="surface"
                className="shrink-0"
                color={item.color}
                variant="translucent"
              >
                {item.category}
              </Badge>
            </div>
          ))
        )}
      </div>
      <div className="text-right text-xs text-muted-foreground">
        Showing {filteredItems.length} of {items.length} items
      </div>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/use-fuzzy-filter.json
```

## Overview

The hook is powered by [match-sorter](https://github.com/kentcdodds/match-sorter). Configure a global threshold for every key, or set a threshold on an individual key when fields should match with different strictness.

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

## Examples

### Filter and rank a collection

Use `filter` when you want the returned array sorted by relevance:

```tsx
const { filter } = useFuzzyFilter({
  keys: ["name", "description"],
});

const [query, setQuery] = useState("");
const filteredItems = useMemo(() => filter(items, query), [filter, query]);
```

### Provide a match predicate

Use `filterItem` when integrating with primitives or components that take a boolean filter predicate:

```tsx
const { filterItem } = useFuzzyFilter({
  keys: ["label"],
});

// Pass this to a component that expects a boolean filter callback.
const matches = filterItem(item, query);
```

## API Reference

### Options

| Option      | Type                                                           | Default  | Description                                                 |
| :---------- | :------------------------------------------------------------- | :------- | :---------------------------------------------------------- |
| `keys`      | `Array<string \| { key: string; threshold?: FuzzyThreshold }>` | Required | Property names or key configurations to match against.      |
| `threshold` | `FuzzyThreshold`                                               | None     | Optional minimum ranking threshold for all configured keys. |

### Threshold values

Thresholds range from strictest to loosest:

| Value                  | Match behavior                                         |
| :--------------------- | :----------------------------------------------------- |
| `case-sensitive-equal` | Exact match with matching casing.                      |
| `equal`                | Case-insensitive exact match.                          |
| `starts-with`          | Value starts with the query.                           |
| `word-starts-with`     | A word in the value starts with the query.             |
| `contains`             | Value contains the query.                              |
| `acronym`              | Matches initials, such as `tcr` for `TanStack Router`. |
| `matches`              | Loose fuzzy matching.                                  |

### Returns

| Property     | Type                                  | Description                                                                                  |
| :----------- | :------------------------------------ | :------------------------------------------------------------------------------------------- |
| `filter`     | `(items: T[], query: string) => T[]`  | Filters and ranks items by relevance. Returns the original array when `query` is empty.      |
| `filterItem` | `(item: T, query: string) => boolean` | Checks if a single item satisfies the filter criteria. Returns `true` when `query` is empty. |
