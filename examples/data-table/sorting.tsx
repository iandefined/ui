"use client";

import {
  DataTable,
  DataTableBody,
  type DataTableColumnDef,
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

const columns: DataTableColumnDef<User>[] = [
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
