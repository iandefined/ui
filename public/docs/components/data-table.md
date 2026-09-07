# Data Table

A feature-rich data table built with TanStack Table, supporting sorting, filtering, selection, and pagination.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DataTable` to display complex collections of data with built-in column sorting, filtering, row selection, and pagination.

## Preview

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/registry/base/badge";
import {
  DataTable,
  DataTableBody,
  DataTableColumnToggle,
  DataTableContent,
  DataTableHeader,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
} from "@/registry/base/data-table";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

const data: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "abe45@gmail.com" },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "monserrat@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "p0d8a1x3",
    amount: 450,
    status: "pending",
    email: "elena@example.com",
  },
  {
    id: "l3k9j8h7",
    amount: 125,
    status: "success",
    email: "marcus@example.com",
  },
];

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Payment["status"];
      return (
        <Badge
          variant={
            status === "success"
              ? "success"
              : status === "processing" || status === "pending"
                ? "warning"
                : "error"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right tabular-nums">{formatted}</div>;
    },
    meta: {
      align: "right",
    },
  },
];

export default function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={data}
      enableSorting
      enableFiltering
      enableRowSelection
      enablePagination
    >
      <DataTableToolbar>
        <DataTableSearch placeholder="Filter emails..." />
        <DataTableColumnToggle />
      </DataTableToolbar>
      <DataTableContent>
        <DataTableHeader enableSorting />
        <DataTableBody />
      </DataTableContent>
      <DataTablePagination />
    </DataTable>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/data-table.json
```

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

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHeader,
} from "@/registry/base/data-table";

interface User {
  name: string;
  department: string;
  score: number;
}

const data: User[] = [
  { name: "Sophia Martinez", department: "Engineering", score: 94 },
  { name: "Liam Johnson", department: "Product", score: 88 },
  { name: "Ava Williams", department: "Design", score: 96 },
  { name: "Noah Brown", department: "Marketing", score: 82 },
  { name: "Emma Jones", department: "Sales", score: 90 },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.getValue("score")}</div>
    ),
    meta: {
      align: "right",
    },
  },
];

export default function DataTableSortingDemo() {
  return (
    <DataTable columns={columns} data={data} enableSorting>
      <DataTableContent>
        <DataTableHeader enableSorting />
        <DataTableBody />
      </DataTableContent>
    </DataTable>
  );
}
```

### Selection

Allow selecting individual or all rows with coordinated header and row checkboxes.

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHeader,
  DataTablePagination,
} from "@/registry/base/data-table";

interface Employee {
  id: string;
  name: string;
  role: string;
}

const data: Employee[] = [
  { id: "EMP-01", name: "Alexander Wright", role: "Software Architect" },
  { id: "EMP-02", name: "Elena Rostova", role: "UX Researcher" },
  { id: "EMP-03", name: "Julian Vance", role: "DevOps Engineer" },
  { id: "EMP-04", name: "Maya Patel", role: "Engineering Manager" },
];

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="tabular-nums text-xs font-medium">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("role")}</span>
    ),
  },
];

export default function DataTableSelectionDemo() {
  return (
    <DataTable
      columns={columns}
      data={data}
      enableRowSelection
      showSelectionColumn
    >
      <DataTableContent>
        <DataTableHeader />
        <DataTableBody />
      </DataTableContent>
      <DataTablePagination showSelectedCount />
    </DataTable>
  );
}
```

### Pagination

Navigate records across discrete pages with page-size bounding.

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHeader,
  useDataTable,
} from "@/registry/base/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/base/pagination";

interface Project {
  code: string;
  name: string;
  budget: string;
  status: string;
}

const data: Project[] = [
  {
    code: "PRJ-01",
    name: "Alpha Redesign",
    budget: "$12,000",
    status: "Active",
  },
  {
    code: "PRJ-02",
    name: "Cloud Migration",
    budget: "$45,000",
    status: "Completed",
  },
  {
    code: "PRJ-03",
    name: "Security Audit",
    budget: "$18,500",
    status: "Active",
  },
  { code: "PRJ-04", name: "Mobile SDK", budget: "$28,000", status: "Pending" },
  {
    code: "PRJ-05",
    name: "Design System",
    budget: "$35,000",
    status: "Active",
  },
  {
    code: "PRJ-06",
    name: "Analytics Pipeline",
    budget: "$22,000",
    status: "Active",
  },
  {
    code: "PRJ-07",
    name: "Payment Gateway",
    budget: "$19,000",
    status: "Completed",
  },
  {
    code: "PRJ-08",
    name: "Customer Portal",
    budget: "$31,000",
    status: "Active",
  },
];

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="tabular-nums text-xs font-medium">
        {row.getValue("code")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Project",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.getValue("budget")}</div>
    ),
    meta: {
      align: "right",
    },
  },
];

function DataTablePaginationBar() {
  const { table } = useDataTable();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 py-2.5">
      <span className="text-muted-foreground text-xs tabular-nums whitespace-nowrap shrink-0">
        Page {pageIndex + 1} of {pageCount}
      </span>
      <Pagination size="sm" className="mx-0 w-auto shrink-0">
        <PaginationContent className="gap-0.5">
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }}
              isDisabled={!table.getCanPreviousPage()}
              className="cursor-pointer"
            />
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={pageIndex === i}
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(i);
                }}
                className="cursor-pointer tabular-nums"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                table.nextPage();
              }}
              isDisabled={!table.getCanNextPage()}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default function DataTablePaginationDemo() {
  return (
    <DataTable
      columns={columns}
      data={data}
      enablePagination
      pagination={{ pageIndex: 0, pageSize: 3 }}
    >
      <DataTableContent>
        <DataTableHeader />
        <DataTableBody />
      </DataTableContent>
      <DataTablePaginationBar />
    </DataTable>
  );
}
```

### Resizable Columns

Enable interactive column resizing with TanStack Table integration. The resizer handle provides a grabable hitbox, two-arrow resize cursor, and highlights the column separator on hover. Cell and header content truncates within its column instead of overlapping adjacent columns.

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHeader,
} from "@/registry/base/data-table";

interface Project {
  title: string;
  lead: string;
  category: string;
  budget: string;
}

const data: Project[] = [
  {
    title: "Design System Revamp",
    lead: "Sophia Martinez",
    category: "Design",
    budget: "$45,000",
  },
  {
    title: "Realtime Sync Service",
    lead: "Liam Johnson",
    category: "Engineering",
    budget: "$120,000",
  },
  {
    title: "User Research Sprint",
    lead: "Ava Williams",
    category: "Product",
    budget: "$18,500",
  },
  {
    title: "Q4 Marketing Campaign",
    lead: "Noah Brown",
    category: "Marketing",
    budget: "$32,000",
  },
  {
    title: "Enterprise Onboarding Flow",
    lead: "Emma Jones",
    category: "Sales",
    budget: "$28,000",
  },
];

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Project",
    size: 220,
  },
  {
    accessorKey: "lead",
    header: "Lead",
    size: 160,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 140,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    size: 120,
    cell: ({ row }) => (
      <div className="text-right tabular-nums font-medium">
        {row.getValue("budget")}
      </div>
    ),
    meta: {
      align: "right",
    },
  },
];

export default function DataTableResizableDemo() {
  return (
    <DataTable columns={columns} data={data} resizable enableSorting>
      <DataTableContent>
        <DataTableHeader enableSorting />
        <DataTableBody />
      </DataTableContent>
    </DataTable>
  );
}
```

## API Reference

`DataTable` integrates `@tanstack/react-table` with the registry `Table`, `InputGroup`, `DropdownMenu`, and `Button` primitives.

### Props

#### DataTable

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `columns` | `ColumnDef<TData, TValue>[]` | `-` | Defines the column schema, accessor keys, headers, and cell renderers. |
| `data` | `TData[]` | `-` | The array of record objects rendered in table rows. |
| `resizable` | `boolean` | `false` | Enables interactive column resizing across all resizable columns. |
| `enableSorting` | `boolean` | `false` | Enables column sort toggling on compatible column headers. |
| `enableRowSelection` | `boolean \| ((row: Row<TData>) => boolean)` | `false` | Enables row selection state tracking and selection checkboxes. |
| `enableMultiRowSelection` | `boolean` | `true` | Allows selecting multiple rows simultaneously. |
| `enableFiltering` | `boolean` | `false` | Enables global text filtering across string cell values. |
| `enablePagination` | `boolean` | `false` | Enables pagination row splitting and page navigation. |
| `showSelectionColumn` | `boolean` | `true` | Automatically inserts a checkbox selection column as the first column when row selection is enabled. |

#### DataTableHeader

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enableSorting` | `boolean` | `false` | Renders sort trigger buttons with directional icons for sortable columns. |

#### DataTableBody

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `emptyState` | `React.ReactNode` | `No results.` | Custom message or component displayed when data contains zero rows. |

#### DataTablePagination

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showSelectedCount` | `boolean` | `true` | Displays the selected rows summary count text alongside page navigation controls. |
