"use client";

import * as React from "react";

import {
  DataTable,
  DataTableBody,
  type DataTableColumnDef,
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

const columns: DataTableColumnDef<Project>[] = [
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
  const { pagination, table } = useDataTable();
  const pageIndex = pagination.pageIndex;
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
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 3,
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      enablePagination
      pagination={pagination}
      onPaginationChange={setPagination}
    >
      <DataTableContent>
        <DataTableHeader />
        <DataTableBody />
      </DataTableContent>
      <DataTablePaginationBar />
    </DataTable>
  );
}
