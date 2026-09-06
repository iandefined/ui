# Table

A responsive data table with sticky headers, scroll area containment, row dividers, and inset card elevation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Table` to present tabular data in rows and columns within a contained, elevated frame.

## Preview

## Installation

## Usage

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableCaption>A list of recent transactions.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

## Composition

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead />
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell />
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell />
    </TableRow>
  </TableFooter>
  <TableCaption />
</Table>;
```

## Examples

### Bordered

Add cell dividing borders to column and row boundaries.

### Striped

Alternate row background colors to increase readability across wide data sets.

### With Footer

Display summary rows or column aggregations at the base of the table.

### Expandable Rows

Compose `Collapsible` with table rows to reveal nested metadata, order items, or additional context on demand.

### Resizable Columns

Enable column resizing by setting `resizable` on `Table`. An expanded interactive hitbox lets users drag column borders, highlighting the separator line on hover with a two-arrow resize cursor.

## API Reference

`Table` parts compose standard HTML table elements through Base UI `useRender` and `mergeProps`. Standard HTML attributes and event handlers pass through to the underlying elements.

### Props

#### Table

Renders outer and column borders between table cells.
Alternates background shading on even rows to increase readability across
wide data sets.
Highlights rows on pointer hover, matching hover styles across striped and
non-striped cells.
Renders horizontal dividing borders between body rows.
Enables draggable column resizing with interactive hitboxes and animated
separators.
Hides the scrollbar track and thumb while retaining horizontal scroll
capability.
Renders gradient shadow fades at the scroll container boundaries.
Sets the custom CSS color used for edge shadow fades.

#### TableHead

Overrides column resizing behavior for this specific column header.
Custom resizer element rendered on the column boundary.

#### TableRow

Applies the selected background color and state attribute to the row.
