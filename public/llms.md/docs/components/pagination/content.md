# Pagination

Accessible pagination navigation with page links, next and previous triggers, and ellipsis disclosure.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Pagination` to divide large sets of records across multiple discrete views and navigate between pages.

## Preview

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/base/pagination";

export default function PaginationDemo() {
  return (
    <Pagination size="sm">
      <PaginationContent className="gap-0.5">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/pagination.json
```

## Usage

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>;
```

## Composition

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink />
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext />
    </PaginationItem>
  </PaginationContent>
</Pagination>;
```

## Examples

### Controlled

Manage the active page state and conditionally disable boundary controls.

```tsx
"use client";

import * as React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/base/pagination";

export default function PaginationControlledDemo() {
  const [currentPage, setCurrentPage] = React.useState(2);
  const totalPages = 5;

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination size="sm">
        <PaginationContent className="gap-0.5">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              isDisabled={currentPage <= 1}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage((p) => p - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              isDisabled={currentPage >= totalPages}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage((p) => p + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-muted-foreground text-xs">
        Current page:{" "}
        <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        {totalPages}
      </p>
    </div>
  );
}
```

### Compact

Present minimal navigation with previous and next controls flanking current page indicator text.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/base/pagination";

export default function PaginationCompactDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <span className="text-muted-foreground shrink-0 whitespace-nowrap px-2 text-sm">
            Page 2 of 10
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## API Reference

`Pagination` renders a semantic navigation landmark with `aria-label="pagination"`. Pagination links render native anchor elements styled with the button variant recipe to preserve keyboard navigation and screen reader semantics.

### Props

#### PaginationLink

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isActive` | `boolean` | `-` | Marks the link as the current page using `aria-current="page"` and applies the active outline visual treatment. |
| `isDisabled` | `boolean` | `-` | Disables click interaction and dims link opacity using `aria-disabled="true"`. |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "xl" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg" \| "icon-xl"` | `icon` | Sets the button size variant applied to the link. |
