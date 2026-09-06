# Data Table

A feature-rich data table built with TanStack Table, supporting sorting, filtering, selection, and pagination.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DataTable` to display complex collections of data with built-in column sorting, filtering, row selection, and pagination.

## Preview

## Installation

## Usage

```tsx
import {
  DataTable,
  DataTableBody,
  DataTableColumnToggle,
  DataTableContent,
  DataTableHeader,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
} from "@/components/ui/data-table";

<DataTable
  columns={columns}
  data={data}
  enableSorting
  enableFiltering
  enableRowSelection
  enablePagination
>
  <DataTableToolbar>
    <DataTableSearch placeholder="Search records..." />
    <DataTableColumnToggle />
  </DataTableToolbar>
  <DataTableContent>
    <DataTableHeader enableSorting />
    <DataTableBody />
  </DataTableContent>
  <DataTablePagination />
</DataTable>;
```

## Composition

```tsx
import {
  DataTable,
  DataTableBody,
  DataTableColumnToggle,
  DataTableContent,
  DataTableFooter,
  DataTableHeader,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
  DataTableToolbarSeparator,
} from "@/components/ui/data-table";

<DataTable columns={columns} data={data}>
  <DataTableToolbar>
    <DataTableSearch />
    <DataTableToolbarSeparator />
    <DataTableColumnToggle />
  </DataTableToolbar>
  <DataTableContent>
    <DataTableHeader />
    <DataTableBody />
    <DataTableFooter />
  </DataTableContent>
  <DataTablePagination />
</DataTable>;
```

## Examples

### Sorting

Enable sortable columns with directional indicator icons.

### Selection

Allow selecting individual or all rows with coordinated header and row checkboxes.

### Pagination

Navigate records across discrete pages with page-size bounding.

### Resizable Columns

Enable interactive column resizing with TanStack Table integration. The resizer handle provides a grabable hitbox, two-arrow resize cursor, and highlights the column separator on hover.

## API Reference

`DataTable` integrates `@tanstack/react-table` with the registry `Table`, `InputGroup`, `DropdownMenu`, and `Button` primitives.

### Props

#### DataTable

<ApiProp name="columns" fullType="ColumnDef<TData, TValue>[]" required>
Defines the column schema, accessor keys, headers, and cell renderers.
The array of record objects rendered in table rows.
Enables interactive column resizing across all resizable columns.
Enables column sort toggling on compatible column headers.
defaultValue="false"
>
Enables row selection state tracking and selection checkboxes.
Allows selecting multiple rows simultaneously.
Enables global text filtering across string cell values.
Enables pagination row splitting and page navigation.
Automatically inserts a checkbox selection column as the first column when
row selection is enabled.

#### DataTableHeader

Renders sort trigger buttons with directional icons for sortable columns.

#### DataTableBody

Custom message or component displayed when data contains zero rows.

#### DataTablePagination

Displays the selected rows summary count text alongside page navigation
controls.
