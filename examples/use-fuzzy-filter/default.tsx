"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/registry/base/badge";
import { Input } from "@/registry/base/input";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
}

const items: Item[] = [
  {
    id: "1",
    name: "React",
    category: "Library",
    description: "A JavaScript library for building user interfaces",
  },
  {
    id: "2",
    name: "TanStack Router",
    category: "Routing",
    description: "Type-safe routing for modern React applications",
  },
  {
    id: "3",
    name: "Tailwind CSS",
    category: "Styling",
    description: "A utility-first CSS framework for rapid UI development",
  },
  {
    id: "4",
    name: "Base UI",
    category: "Primitives",
    description: "Unstyled UI components with accessible defaults",
  },
  {
    id: "5",
    name: "Vite",
    category: "Build Tool",
    description: "Next generation frontend tooling and bundler",
  },
  {
    id: "6",
    name: "TypeScript",
    category: "Language",
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
              <Badge className="shrink-0" variant="secondary">
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
