"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

export interface TableProps extends React.ComponentProps<"table"> {
  bordered?: boolean;
  striped?: boolean;
  stripedRows?: boolean;
  hoverable?: boolean;
  rowDividers?: boolean;
  resizable?: boolean;
  roundedInset?: boolean;
  hideScrollbar?: boolean;
  scrollShadow?: "vertical" | "horizontal" | "both" | "none";
  fadeColor?: string;
  viewportClassName?: string;
}

type TableInsetStyle = React.CSSProperties & Record<`--${string}`, string>;

const tableInsetMaskImage = [
  "linear-gradient(#000 0 0)",
  "linear-gradient(#000 0 0)",
  "linear-gradient(#000 0 0)",
  "radial-gradient(circle var(--table-inset-radius) at 100% 100%, #000 calc(100% - 0.5px), transparent 100%)",
  "radial-gradient(circle var(--table-inset-radius) at 0 100%, #000 calc(100% - 0.5px), transparent 100%)",
  "radial-gradient(circle var(--table-inset-radius) at 100% 0, #000 calc(100% - 0.5px), transparent 100%)",
  "radial-gradient(circle var(--table-inset-radius) at 0 0, #000 calc(100% - 0.5px), transparent 100%)",
].join(", ");

const tableInsetMaskPosition = [
  "0 0",
  "var(--table-inset-radius) var(--table-header-height)",
  "0 calc(var(--table-header-height) + var(--table-inset-radius))",
  "0 var(--table-header-height)",
  "100% var(--table-header-height)",
  "0 100%",
  "100% 100%",
].join(", ");

const tableInsetMaskSize = [
  "100% var(--table-header-height)",
  "calc(100% - var(--table-inset-radius) - var(--table-inset-radius)) calc(100% - var(--table-header-height))",
  "100% calc(100% - var(--table-header-height) - var(--table-inset-radius) - var(--table-inset-radius))",
  "var(--table-inset-radius) var(--table-inset-radius)",
  "var(--table-inset-radius) var(--table-inset-radius)",
  "var(--table-inset-radius) var(--table-inset-radius)",
  "var(--table-inset-radius) var(--table-inset-radius)",
].join(", ");

const tableInsetStyle: TableInsetStyle = {
  "--table-inset-radius": "var(--radius-lg)",
  maskImage: tableInsetMaskImage,
  maskPosition: tableInsetMaskPosition,
  maskRepeat: "no-repeat",
  maskSize: tableInsetMaskSize,
  WebkitMaskImage: tableInsetMaskImage,
  WebkitMaskPosition: tableInsetMaskPosition,
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: tableInsetMaskSize,
};

const tableContainerStyle: TableInsetStyle = {
  "--table-header-height": "0px",
};

interface TableContextValue {
  resizable?: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  resizable: false,
});

function Table({
  className,
  bordered = false,
  striped = false,
  stripedRows,
  hoverable = true,
  rowDividers = true,
  resizable = false,
  roundedInset = true,
  hideScrollbar = false,
  scrollShadow,
  fadeColor,
  viewportClassName,
  children,
  ...props
}: TableProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isStriped = Boolean(striped || stripedRows);
  const resolvedScrollShadow = scrollShadow ?? "none";

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !roundedInset) return;

    const table = container.querySelector<HTMLTableElement>(
      'table[data-slot="table"]'
    );
    const header = table?.tHead;
    if (!header) {
      container.style.setProperty("--table-header-height", "0px");
      return;
    }

    const setHeaderHeight = (height: number) => {
      container.style.setProperty("--table-header-height", `${height}px`);
    };

    setHeaderHeight(header.getBoundingClientRect().height);

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setHeaderHeight(
        entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height
      );
    });
    observer.observe(header);

    return () => observer.disconnect();
  });

  return (
    <TableContext.Provider value={{ resizable }}>
      <div
        ref={containerRef}
        data-slot="table-container"
        data-bordered={bordered ? "" : undefined}
        data-striped={isStriped ? "" : undefined}
        data-hoverable={hoverable ? "" : undefined}
        data-row-dividers={rowDividers ? "" : undefined}
        data-resizable={resizable ? "" : undefined}
        data-rounded-inset={roundedInset ? "" : undefined}
        style={tableContainerStyle}
        className={cn(
          "group/table relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-muted dark:bg-card p-1 pt-0 md:max-w-2xl",
          className
        )}
      >
        <div
          data-slot="table-inset"
          className={cn(
            "relative min-h-0 min-w-0 flex flex-1 flex-col overflow-hidden",
            roundedInset && "rounded-lg"
          )}
        >
          <div
            data-slot="table-inset-clip"
            className="min-h-0 min-w-0 flex flex-1 flex-col"
            style={roundedInset ? tableInsetStyle : undefined}
          >
            <ScrollArea
              hideScrollbar={hideScrollbar}
              orientation="both"
              scrollShadow={resolvedScrollShadow}
              fadeColor={fadeColor}
              className="min-h-0 min-w-0 flex-1"
              viewportClassName={cn(
                "!overscroll-none [--scroll-area-fade-size:8px] outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                viewportClassName
              )}
            >
              <table
                data-slot="table"
                className={cn(
                  "w-full caption-bottom text-sm border-separate border-spacing-0",
                  resizable && "table-fixed",
                  bordered && "border-separate border-spacing-0"
                )}
                {...props}
              >
                {children}
              </table>
            </ScrollArea>
          </div>
          {roundedInset ? (
            <div
              aria-hidden="true"
              data-slot="table-inset-border"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 rounded-[inherit] border border-border/70 dark:border-border [top:var(--table-header-height)]"
            />
          ) : null}
        </div>
      </div>
    </TableContext.Provider>
  );
}

export type TableHeaderProps = useRender.ComponentProps<"thead">;

function TableHeader({ className, render, ...props }: TableHeaderProps) {
  const defaultProps = {
    "data-slot": "table-header",
    className: cn(
      "[&_tr]:border-0",
      "[&_tr_th]:bg-muted dark:[&_tr_th]:bg-card",
      "[&_tr_th:has(+_th[data-empty])]:after:hidden",
      "sticky top-0 z-10",
      className
    ),
  };

  return useRender({
    defaultTagName: "thead",
    render,
    props: mergeProps<"thead">(defaultProps, props),
  });
}

export type TableBodyProps = useRender.ComponentProps<"tbody">;

function TableBody({ className, render, ...props }: TableBodyProps) {
  const defaultProps = {
    "data-slot": "table-body",
    className: cn(
      "[&_tr_td]:bg-card dark:[&_tr_td]:bg-background",
      "[&_tr_td]:border-border/70 dark:[&_tr_td]:border-border",
      "[&_tr:first-child_td]:border-t",
      "[&_tr:last-child_td]:border-b",
      "[&_tr:has(+_tr:last-child[hidden])_td]:border-b",
      "[&_tr_td:first-child]:border-l",
      "[&_tr_td:last-child]:border-r",
      "group-data-[row-dividers]/table:[&_tr:not(:last-child)_td]:border-b group-data-[row-dividers]/table:[&_tr_td]:border-border/60",
      "group-data-bordered/table:[&_tr_td]:border-b group-data-bordered/table:[&_tr_td]:border-r group-data-bordered/table:[&_tr_td]:border-border/70 dark:group-data-bordered/table:[&_tr_td]:border-border",
      "group-data-[striped]/table:[&_tr:nth-child(even)_td]:bg-muted/40 dark:group-data-[striped]/table:[&_tr:nth-child(even)_td]:bg-card/30",
      "[@media(hover:hover)]:group-data-hoverable/table:[&_tr:hover_td]:bg-secondary/70 dark:[@media(hover:hover)]:group-data-hoverable/table:[&_tr:hover_td]:bg-muted/50",
      "[@media(hover:hover)]:group-data-hoverable/table:[&_tr:nth-child(even):hover_td]:bg-secondary/70 dark:[@media(hover:hover)]:group-data-hoverable/table:[&_tr:nth-child(even):hover_td]:bg-muted/50",
      className
    ),
  };

  return useRender({
    defaultTagName: "tbody",
    render,
    props: mergeProps<"tbody">(defaultProps, props),
  });
}

export type TableFooterProps = useRender.ComponentProps<"tfoot">;

function TableFooter({ className, render, ...props }: TableFooterProps) {
  const defaultProps = {
    "data-slot": "table-footer",
    className: cn(
      "[&_tr]:border-0",
      "[&_tr_td]:bg-muted dark:[&_tr_td]:bg-card",
      "[&_tr_td]:px-3 [&_tr_td]:pt-2 [&_tr_td]:pb-1",
      "[&_tr_td]:align-middle",
      "text-sm font-medium",
      className
    ),
  };

  return useRender({
    defaultTagName: "tfoot",
    render,
    props: mergeProps<"tfoot">(defaultProps, props),
  });
}

export type TableRowSticky = "top" | "bottom";

export interface TableRowProps extends useRender.ComponentProps<"tr"> {
  selected?: boolean;
  sticky?: TableRowSticky;
}

function TableRow({
  className,
  render,
  selected,
  sticky,
  ...props
}: TableRowProps) {
  const defaultProps = {
    "data-slot": "table-row",
    "data-state": selected ? "selected" : undefined,
    "data-sticky": sticky,
    className: cn(
      "transition-colors duration-100 hover:transition-none",
      sticky === "top" &&
        "[&>th]:sticky [&>th]:top-0 [&>th]:z-20 [&>td]:sticky [&>td]:top-0 [&>td]:z-20",
      sticky === "bottom" &&
        "[&>th]:sticky [&>th]:bottom-0 [&>th]:z-20 [&>td]:sticky [&>td]:bottom-0 [&>td]:z-20",
      className
    ),
  };

  return useRender({
    defaultTagName: "tr",
    render,
    props: mergeProps<"tr">(defaultProps, props),
  });
}

export interface TableColumnResizerProps extends React.ComponentProps<"div"> {
  isResizing?: boolean;
  minWidth?: number;
}

function TableColumnResizer({
  className,
  isResizing: isResizingProp,
  minWidth = 48,
  onMouseDown,
  onTouchStart,
  onKeyDown,
  ...props
}: TableColumnResizerProps) {
  const [internalResizing, setInternalResizing] = React.useState(false);
  const isResizing = isResizingProp ?? internalResizing;
  const selfRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isResizing) {
      const originalCursor = document.body.style.cursor;
      const originalUserSelect = document.body.style.userSelect;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      return () => {
        document.body.style.cursor = originalCursor;
        document.body.style.userSelect = originalUserSelect;
      };
    }
  }, [isResizing]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (onMouseDown || onTouchStart) {
      return;
    }

    const th = e.currentTarget.closest("th");
    if (!th) return;

    e.preventDefault();
    e.stopPropagation();

    const table = th.closest("table");
    const container = table?.parentElement;
    const containerWidth = container
      ? container.getBoundingClientRect().width
      : 0;

    const row = th.parentElement;
    if (row) {
      const cells = Array.from(row.children) as HTMLElement[];
      for (const cell of cells) {
        if (!cell.style.width) {
          const w = Math.round(cell.getBoundingClientRect().width);
          cell.style.width = `${w}px`;
          cell.style.minWidth = `${w}px`;
        }
      }
    }

    const startX = e.clientX;
    const startWidth = th.getBoundingClientRect().width;
    const startTableWidth = table ? table.getBoundingClientRect().width : 0;
    const target = e.currentTarget;

    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture might fail if detached
    }

    setInternalResizing(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(minWidth, Math.round(startWidth + delta));
      th.style.width = `${newWidth}px`;
      th.style.minWidth = `${newWidth}px`;

      if (table && startTableWidth > 0) {
        const deltaWidth = newWidth - startWidth;
        const newTableWidth = Math.max(
          startTableWidth + deltaWidth,
          containerWidth
        );
        table.style.width = `${newTableWidth}px`;
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch {
        // ignore
      }
      setInternalResizing(false);
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerup", onPointerUp);
      target.removeEventListener("pointercancel", onPointerUp);
    };

    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerup", onPointerUp);
    target.addEventListener("pointercancel", onPointerUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const th = e.currentTarget.closest("th");
      if (!th) return;

      const table = th.closest("table");
      const container = table?.parentElement;
      const containerWidth = container
        ? container.getBoundingClientRect().width
        : 0;
      const currentWidth = th.getBoundingClientRect().width;
      const startTableWidth = table ? table.getBoundingClientRect().width : 0;

      const delta = e.key === "ArrowRight" ? 12 : -12;
      const newWidth = Math.max(minWidth, Math.round(currentWidth + delta));
      th.style.width = `${newWidth}px`;
      th.style.minWidth = `${newWidth}px`;

      if (table && startTableWidth > 0) {
        const deltaWidth = newWidth - currentWidth;
        const newTableWidth = Math.max(
          startTableWidth + deltaWidth,
          containerWidth
        );
        table.style.width = `${newTableWidth}px`;
      }
    }
  };

  return (
    <div
      ref={selfRef}
      role="separator"
      tabIndex={0}
      aria-orientation="vertical"
      data-slot="table-column-resizer"
      data-resizing={isResizing ? "" : undefined}
      onPointerDown={handlePointerDown}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/resizer absolute right-0 top-0 z-20 flex h-full w-4 cursor-col-resize touch-none select-none items-center justify-center outline-none [@media(pointer:coarse)]:w-11",
        "focus-visible:[&>div]:bg-[oklch(0.7_0_0)] dark:focus-visible:[&>div]:bg-[oklch(0.5_0_0)]",
        "[[data-slot=table-head]:last-child_&]:hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-px h-4 bg-border transition-colors duration-150",
          "group-hover/resizer:bg-[oklch(0.7_0_0)] dark:group-hover/resizer:bg-[oklch(0.5_0_0)]",
          isResizing && "bg-[oklch(0.7_0_0)] dark:bg-[oklch(0.5_0_0)]"
        )}
      />
    </div>
  );
}

export type TableColumnSticky = "left" | "right";

export interface TableHeadProps extends useRender.ComponentProps<"th"> {
  resizable?: boolean;
  resizer?: React.ReactNode;
  sticky?: TableColumnSticky;
}

function TableHead({
  className,
  render,
  children,
  resizable: resizableProp,
  resizer,
  sticky,
  ...props
}: TableHeadProps) {
  const context = React.useContext(TableContext);
  const isResizable = resizableProp ?? context.resizable;
  const hasResizer = resizer !== undefined ? Boolean(resizer) : isResizable;
  const hasLabel =
    children !== null && children !== undefined && children !== false;

  const defaultProps = {
    "data-slot": "table-head",
    "data-empty": hasLabel ? undefined : "",
    className: cn(
      "text-muted-foreground relative overflow-hidden px-3 py-2 text-left text-ellipsis align-middle text-sm font-medium whitespace-nowrap [[align=center]]:text-center [[align=right]]:text-right",
      "[&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:translate-y-[2px]",
      "after:absolute after:right-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-border after:content-['']",
      "last:after:hidden",
      "group-data-[bordered]/table:after:hidden group-data-bordered/table:after:hidden",
      !hasLabel && "after:hidden",
      hasResizer && "after:hidden select-none",
      sticky === "left" && "sticky left-0 z-20 bg-muted dark:bg-card",
      sticky === "right" && "sticky right-0 z-20 bg-muted dark:bg-card",
      className
    ),
    children: (
      <>
        {children}
        {resizer !== undefined ? (
          resizer
        ) : isResizable ? (
          <TableColumnResizer />
        ) : null}
      </>
    ),
  };

  return useRender({
    defaultTagName: "th",
    render,
    props: mergeProps<"th">(defaultProps, props),
  });
}

export interface TableCellProps extends useRender.ComponentProps<"td"> {
  sticky?: TableColumnSticky;
}

function TableCell({ className, render, sticky, ...props }: TableCellProps) {
  const defaultProps = {
    "data-slot": "table-cell",
    className: cn(
      "bg-card overflow-hidden px-3 py-2.5 text-ellipsis align-middle whitespace-nowrap dark:bg-background [[align=center]]:text-center [[align=right]]:text-right",
      "[&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:translate-y-[2px]",
      "group-data-bordered/table:border-b group-data-bordered/table:border-r group-data-bordered/table:first:border-l group-data-bordered/table:border-border/70 dark:group-data-bordered/table:border-border",
      "[[data-state=selected]_&]:bg-secondary/60 dark:[[data-state=selected]_&]:bg-muted/30 dark:[[data-state=selected]:hover_&]:bg-muted/30",
      sticky === "left" && "sticky left-0 z-[1]",
      sticky === "right" && "sticky right-0 z-[1]",
      className
    ),
  };

  return useRender({
    defaultTagName: "td",
    render,
    props: mergeProps<"td">(defaultProps, props),
  });
}

export type TableCaptionProps = useRender.ComponentProps<"caption">;

function TableCaption({ className, render, ...props }: TableCaptionProps) {
  const defaultProps = {
    "data-slot": "table-caption",
    className: cn("text-muted-foreground px-3 pt-2 pb-1 text-xs", className),
  };

  return useRender({
    defaultTagName: "caption",
    render,
    props: mergeProps<"caption">(defaultProps, props),
  });
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableColumnResizer,
};
