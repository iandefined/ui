"use client";

import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table as ReactTableInstance,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumnResizer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableContextValue<TData> {
  table: ReactTableInstance<TData>;
  isResizable: boolean;
}

// biome-ignore lint/suspicious/noExplicitAny: generic context requires any; consumer types are enforced via useDataTable<TData>()
const DataTableContext = React.createContext<DataTableContextValue<any> | null>(
  null
);

function useDataTable<TData>() {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTable");
  }
  return context as DataTableContextValue<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: React.ReactNode;
  className?: string;

  resizable?: boolean;
  enableColumnResizing?: boolean;
  columnResizeMode?: ColumnResizeMode;

  enableSorting?: boolean;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;

  showSelectionColumn?: boolean;

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  globalFilter?: string;
  onGlobalFilterChange?: OnChangeFn<string>;

  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
}

function DataTable<TData, TValue>({
  columns: userColumns,
  data,
  children,
  className,
  resizable = false,
  enableColumnResizing,
  columnResizeMode = "onChange",
  enableSorting = false,
  enableRowSelection = false,
  enableMultiRowSelection = true,
  enableFiltering = false,
  enablePagination = false,
  showSelectionColumn = true,
  sorting: controlledSorting,
  onSortingChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,
  pagination: controlledPagination,
  onPaginationChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  globalFilter: controlledGlobalFilter,
  onGlobalFilterChange,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const isResizable = Boolean(resizable || enableColumnResizing);
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    []
  );
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({});
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState("");
  const [internalColumnVisibility, setInternalColumnVisibility] =
    React.useState<VisibilityState>({});

  const sorting = controlledSorting ?? internalSorting;
  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const columnFilters = controlledColumnFilters ?? internalColumnFilters;
  const pagination = controlledPagination ?? internalPagination;
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter;
  const columnVisibility =
    controlledColumnVisibility ?? internalColumnVisibility;

  const columns = React.useMemo(() => {
    if (!enableRowSelection || !showSelectionColumn) {
      return userColumns;
    }

    const selectionColumn: ColumnDef<TData, unknown> = {
      id: "__select__",
      size: 40,
      minSize: 40,
      maxSize: 40,
      enableResizing: false,
      header: ({ table }) =>
        enableMultiRowSelection ? (
          <div className="flex items-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={
                table.getIsSomePageRowsSelected() &&
                !table.getIsAllPageRowsSelected()
              }
              onCheckedChange={(value: boolean) =>
                table.toggleAllPageRowsSelected(Boolean(value))
              }
              aria-label="Select all"
            />
          </div>
        ) : null,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={(value: boolean) =>
              row.toggleSelected(Boolean(value))
            }
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    };

    return [selectionColumn, ...userColumns];
  }, [
    userColumns,
    enableRowSelection,
    enableMultiRowSelection,
    showSelectionColumn,
  ]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 48,
    },
    getRowId,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
      columnVisibility,
    },
    onSortingChange: onSortingChange ?? setInternalSorting,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    onGlobalFilterChange: onGlobalFilterChange ?? setInternalGlobalFilter,
    onColumnVisibilityChange:
      onColumnVisibilityChange ?? setInternalColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enableFiltering && { getFilteredRowModel: getFilteredRowModel() }),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    enableRowSelection,
    enableMultiRowSelection,
    enableColumnResizing: isResizable,
    columnResizeMode,
    globalFilterFn: "includesString",
  });

  return (
    <DataTableContext.Provider value={{ table, isResizable }}>
      <div
        data-slot="data-table"
        className={cn(
          "@container relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-muted dark:bg-card p-1 md:max-w-2xl",
          className
        )}
      >
        {children}
      </div>
    </DataTableContext.Provider>
  );
}

export type DataTableToolbarProps = React.ComponentProps<"div">;

function DataTableToolbar({ className, ...props }: DataTableToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      data-slot="data-table-toolbar"
      className={cn(
        "flex flex-wrap items-center justify-between gap-2.5 px-3 py-2",
        className
      )}
      {...props}
    />
  );
}

function DataTableToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="data-table-toolbar-separator"
      className={cn("bg-border h-4 w-px shrink-0", className)}
      {...props}
    />
  );
}

export interface DataTableSearchProps extends Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange"
> {
  placeholder?: string;
}

function DataTableSearch({
  placeholder = "Search...",
  size = "sm",
  className,
  ...props
}: DataTableSearchProps) {
  const { table } = useDataTable();

  return (
    <Input
      placeholder={placeholder}
      size={size}
      value={table.getState().globalFilter ?? ""}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      className={cn("w-full sm:w-auto sm:max-w-xs flex-1", className)}
      {...props}
    />
  );
}

function DataTableColumnToggle() {
  const { table } = useDataTable();

  const toggleableColumns = table
    .getAllColumns()
    .filter((col) => col.id !== "__select__" && col.getCanHide());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="text-muted-foreground hover:text-foreground"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle columns"
          />
        }
      >
        <SlidersHorizontalIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {toggleableColumns.map((column) => {
            const label =
              typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : column.id;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(checked) =>
                  column.toggleVisibility(Boolean(checked))
                }
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataTableContentProps = Omit<TableProps, "children"> & {
  children: React.ReactNode;
  resizable?: boolean;
};

function DataTableContent({
  bordered,
  hoverable,
  rowDividers = true,
  resizable: resizableProp,
  className,
  children,
  style,
  ...tableProps
}: DataTableContentProps) {
  const { table, isResizable: contextResizable } = useDataTable();
  const isResizable = resizableProp ?? contextResizable;

  return (
    <Table
      bordered={bordered}
      hoverable={hoverable}
      rowDividers={rowDividers}
      resizable={isResizable}
      className={cn(
        "rounded-none border-0 bg-transparent p-0 shadow-none md:max-w-none overflow-hidden",
        isResizable && "table-fixed",
        className
      )}
      style={{
        ...(isResizable
          ? { width: table.getTotalSize(), minWidth: "100%" }
          : {}),
        ...style,
      }}
      {...(tableProps as TableProps)}
    >
      {children}
    </Table>
  );
}

function SortableHeader<TData>({
  column,
  children,
  align,
}: {
  column: Column<TData, unknown>;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <button
      type="button"
      className="group hover:text-foreground -my-2 flex w-full min-w-0 cursor-pointer items-center gap-1.5 py-2 transition-colors overflow-hidden"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span
        className={cn(
          "flex min-w-0 flex-1 items-center truncate",
          align === "right" && "justify-end",
          align === "center" && "justify-center"
        )}
      >
        {children}
      </span>
      {column.getIsSorted() === "asc" ? (
        <ArrowUpIcon className="size-4 shrink-0" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDownIcon className="size-4 shrink-0" />
      ) : (
        <ArrowUpDownIcon className="size-4 opacity-0 group-hover:opacity-50 shrink-0" />
      )}
    </button>
  );
}

export interface DataTableHeaderProps extends React.ComponentProps<
  typeof TableHeader
> {
  enableSorting?: boolean;
  resizable?: boolean;
}

function DataTableHeader({
  enableSorting = false,
  resizable: resizableProp,
  className,
  ...props
}: DataTableHeaderProps) {
  const { table, isResizable: contextResizable } = useDataTable();
  const isResizable = resizableProp ?? contextResizable;

  const renderHeader = (
    header: ReturnType<typeof table.getHeaderGroups>[0]["headers"][0],
    index: number,
    totalHeaders: number
  ) => {
    if (header.isPlaceholder) return null;

    const headerDef = header.column.columnDef.header;
    const canSort = header.column.getCanSort();
    const meta = header.column.columnDef.meta as
      | { align?: "left" | "center" | "right" }
      | undefined;

    if (typeof headerDef === "string" && enableSorting && canSort) {
      return (
        <SortableHeader
          column={header.column}
          align={meta?.align}
          isFirst={index === 0}
          isLast={index === totalHeaders - 1}
        >
          {headerDef}
        </SortableHeader>
      );
    }

    if (typeof headerDef === "function") {
      return (
        <div className="min-w-0 max-w-full truncate">
          {flexRender(headerDef, header.getContext())}
        </div>
      );
    }

    return headerDef === undefined || headerDef === null ? null : (
      <div className="min-w-0 max-w-full truncate">{headerDef}</div>
    );
  };

  return (
    <TableHeader className={className} {...props}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            const isLast = index === headerGroup.headers.length - 1;
            const canResize = header.column.getCanResize();

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                style={isResizable ? { width: header.getSize() } : undefined}
                className={cn(
                  isResizable &&
                    "relative hover:z-20 [&:has([data-resizing])]:z-20",
                  isResizable && canResize && "select-none"
                )}
                resizable={false}
                resizer={
                  isResizable && canResize && !isLast ? (
                    <TableColumnResizer
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      isResizing={header.column.getIsResizing()}
                    />
                  ) : null
                }
              >
                {renderHeader(header, index, headerGroup.headers.length)}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export interface DataTableBodyProps extends React.ComponentProps<
  typeof TableBody
> {
  emptyState?: React.ReactNode;
}

function DataTableBody({
  emptyState,
  className,
  ...props
}: DataTableBodyProps) {
  const { table, isResizable } = useDataTable();
  const totalColumns = table.getAllColumns().length;

  return (
    <TableBody className={className} {...props}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} selected={row.getIsSelected()}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={
                  isResizable ? { width: cell.column.getSize() } : undefined
                }
              >
                <div
                  data-slot="data-table-cell-content"
                  className="min-w-0 max-w-full truncate"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={totalColumns} className="h-24 text-center">
            {emptyState ?? "No results."}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export type DataTableFooterProps = React.ComponentProps<typeof TableFooter>;

function DataTableFooter({
  className,
  children,
  ...props
}: DataTableFooterProps) {
  return (
    <TableFooter className={className} {...props}>
      {children}
    </TableFooter>
  );
}

export interface DataTablePaginationProps {
  className?: string;
  showSelectedCount?: boolean;
  size?: "default" | "sm";
}

function DataTablePagination({
  className,
  showSelectedCount = true,
  size = "sm",
}: DataTablePaginationProps) {
  const { table } = useDataTable();

  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-2.5 px-3 py-2",
        className
      )}
    >
      {showSelectedCount ? (
        <span className="text-muted-foreground text-xs whitespace-nowrap shrink-0">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </span>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <Button
          variant="outline"
          size={size}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size={size}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export {
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
  useDataTable,
};

export type {
  ColumnDef,
  ColumnFiltersState,
  ColumnResizeMode,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
};
