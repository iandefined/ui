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
