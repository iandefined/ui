# Pagination

Accessible pagination navigation with page links, next and previous triggers, and ellipsis disclosure.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Pagination` to divide large sets of records across multiple discrete views and navigate between pages.

## Preview

## Installation

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

### Compact

Present minimal navigation with previous and next controls flanking current page indicator text.

## API Reference

`Pagination` renders a semantic navigation landmark with `aria-label="pagination"`. Pagination links render native anchor elements styled with the button variant recipe to preserve keyboard navigation and screen reader semantics.

### Props

#### PaginationLink

Marks the link as the current page using `aria-current="page"` and applies
the active outline visual treatment.
Disables click interaction and dims link opacity using
`aria-disabled="true"`.
Sets the button size variant applied to the link.
