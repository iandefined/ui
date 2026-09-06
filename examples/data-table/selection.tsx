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
