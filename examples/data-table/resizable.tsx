"use client";

import {
  DataTable,
  DataTableBody,
  type DataTableColumnDef,
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

const columns: DataTableColumnDef<Project>[] = [
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
