import * as React from "react";

import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
  AutocompleteValue,
} from "@/registry/base/autocomplete";
import { Label } from "@/registry/base/label";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

interface Documentation {
  title: string;
  description: string;
  category: string;
}

const documentationItems: Documentation[] = [
  {
    title: "React Hooks Guide",
    description:
      "Learn how to use React Hooks like useState, useEffect, and custom hooks",
    category: "React",
  },
  {
    title: "JavaScript Array Methods",
    description:
      "Master array methods like map, filter, reduce, and forEach in JavaScript",
    category: "JavaScript",
  },
  {
    title: "CSS Flexbox Layout",
    description: "Complete guide to CSS Flexbox for responsive web design",
    category: "CSS",
  },
  {
    title: "TypeScript Interfaces",
    description: "Understanding TypeScript interfaces and type definitions",
    category: "TypeScript",
  },
  {
    title: "React Performance Optimization",
    description:
      "Tips and techniques for optimizing React application performance",
    category: "React",
  },
  {
    title: "HTML Semantic Elements",
    description:
      "Using semantic HTML elements for better accessibility and SEO",
    category: "HTML",
  },
  {
    title: "Node.js Express Server",
    description: "Building RESTful APIs with Node.js and Express framework",
    category: "Node.js",
  },
  {
    title: "Vue Composition API",
    description: "Modern Vue.js development using the Composition API",
    category: "Vue.js",
  },
  {
    title: "Angular Components",
    description: "Creating reusable Angular components with TypeScript",
    category: "Angular",
  },
  {
    title: "Python Django Framework",
    description: "Web development with Python Django framework",
    category: "Python",
  },
  {
    title: "CSS Grid Layout",
    description: "Advanced CSS Grid techniques for complex layouts",
    category: "CSS",
  },
  {
    title: "React Testing Library",
    description: "Testing React components with React Testing Library",
    category: "React",
  },
  {
    title: "MongoDB Queries",
    description: "Advanced MongoDB queries and aggregation pipelines",
    category: "Database",
  },
  {
    title: "Webpack Configuration",
    description: "Optimizing Webpack configuration for production builds",
    category: "Build Tools",
  },
  {
    title: "SASS/SCSS Guide",
    description: "Writing maintainable CSS with SASS and SCSS",
    category: "CSS",
  },
];

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const escaped = query.replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        className="bg-primary/20 text-foreground font-semibold rounded-xs px-0.5"
        key={i}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function AutocompleteFuzzy() {
  const { filterItem } = useFuzzyFilter<Documentation>({
    keys: [
      { key: "title", threshold: "contains" },
      { key: "description", threshold: "word-starts-with" },
      "category",
    ],
  });

  return (
    <AutocompleteRoot
      filter={filterItem}
      items={documentationItems}
      itemToStringValue={(item) => item.title}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="fuzzy-docs">Fuzzy search documentation</Label>
        <AutocompleteInput
          id="fuzzy-docs"
          placeholder="e.g. React, hooks, css grid"
        />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>
              No results found for &quot;
              <AutocompleteValue />
              &quot;
            </AutocompleteEmpty>

            <AutocompleteList>
              {(item: Documentation) => (
                <AutocompleteItem key={item.title} value={item}>
                  <AutocompleteValue>
                    {(value) => (
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 font-medium leading-5">
                            {highlightMatch(item.title, value)}
                          </div>
                          <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-muted-foreground text-xs leading-4">
                          {highlightMatch(item.description, value)}
                        </div>
                      </div>
                    )}
                  </AutocompleteValue>
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
