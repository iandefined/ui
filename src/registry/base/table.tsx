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

const tableContainerStyle: TableInsetStyle = {
  "--table-inset-radius": "var(--radius-lg)",
  "--table-scrollbar-bottom": "0px",
  "--table-scrollbar-top": "0px",
};

const tableInsetOverlayStyle: React.CSSProperties = {
  bottom: "var(--table-scrollbar-bottom)",
  top: "var(--table-scrollbar-top)",
};

const tableHorizontalScrollbarStyle: React.CSSProperties = {
  bottom: "var(--table-scrollbar-bottom)",
};

const tableScrollbarCornerStyle: React.CSSProperties = {
  bottom: "var(--table-scrollbar-bottom)",
};

const tableVerticalScrollbarStyle: React.CSSProperties = {
  bottom: "var(--table-scrollbar-bottom)",
  top: "var(--table-scrollbar-top)",
};

const tableInsetCornerStyle: React.CSSProperties = {
  height: "var(--table-inset-radius)",
  width: "var(--table-inset-radius)",
};

const tableInsetCornerBackgrounds = {
  bottomLeft:
    "radial-gradient(circle var(--table-inset-radius) at 100% 0, transparent calc(100% - 0.5px), var(--table-inset-mask) 100%)",
  bottomRight:
    "radial-gradient(circle var(--table-inset-radius) at 0 0, transparent calc(100% - 0.5px), var(--table-inset-mask) 100%)",
  topLeft:
    "radial-gradient(circle var(--table-inset-radius) at 100% 100%, transparent calc(100% - 0.5px), var(--table-inset-mask) 100%)",
  topRight:
    "radial-gradient(circle var(--table-inset-radius) at 0 100%, transparent calc(100% - 0.5px), var(--table-inset-mask) 100%)",
} as const;

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
    if (!container) return;

    const inset = container.querySelector<HTMLElement>(
      '[data-slot="table-inset"]'
    );
    const table = container.querySelector<HTMLTableElement>(
      'table[data-slot="table"]'
    );
    const body = table?.tBodies[0];
    if (!inset || !table || !body) {
      container.style.setProperty("--table-scrollbar-bottom", "100%");
      return;
    }

    const measureBody = () => {
      const insetRect = inset.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      const headerBottom = table.tHead?.getBoundingClientRect().bottom;
      const footerCell = table.tFoot?.querySelector<HTMLElement>("th, td");
      const footerTop = footerCell?.getBoundingClientRect().top;
      const visibleBodyTop = Math.max(
        insetRect.top,
        bodyRect.top,
        headerBottom ?? insetRect.top
      );
      const visibleBodyBottom = Math.min(
        insetRect.bottom,
        bodyRect.bottom,
        footerTop ?? insetRect.bottom
      );
      const clampedBodyBottom = Math.max(visibleBodyTop, visibleBodyBottom);
      container.style.setProperty(
        "--table-scrollbar-top",
        `${Math.max(0, visibleBodyTop - insetRect.top)}px`
      );
      container.style.setProperty(
        "--table-scrollbar-bottom",
        `${Math.max(0, insetRect.bottom - clampedBodyBottom)}px`
      );
    };

    measureBody();

    let frame = 0;
    const scheduleMeasure = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measureBody();
      });
    };

    const viewport = container.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    );
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(inset);
    observer.observe(table);
    observer.observe(body);
    if (table.tHead) observer.observe(table.tHead);
    if (table.tFoot) observer.observe(table.tFoot);
    viewport?.addEventListener("scroll", scheduleMeasure, { passive: true });

    return () => {
      observer.disconnect();
      viewport?.removeEventListener("scroll", scheduleMeasure);
      if (frame) cancelAnimationFrame(frame);
    };
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
        data-rounded-inset={roundedInset}
        style={tableContainerStyle}
        className={cn(
          "group/table relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-muted dark:bg-card p-1 pt-0 md:max-w-2xl [--table-inset-mask:var(--muted)] dark:[--table-inset-mask:var(--card)]",
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
          <ScrollArea
            cornerStyle={tableScrollbarCornerStyle}
            hideScrollbar={hideScrollbar}
            orientation="both"
            scrollShadow={resolvedScrollShadow}
            fadeColor={fadeColor}
            className="min-h-0 min-w-0 flex-1"
            horizontalScrollbarStyle={tableHorizontalScrollbarStyle}
            verticalScrollbarStyle={tableVerticalScrollbarStyle}
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
          {roundedInset ? (
            <div
              aria-hidden="true"
              data-slot="table-inset-overlay"
              className="pointer-events-none absolute inset-x-0 z-20 overflow-hidden"
              style={tableInsetOverlayStyle}
            >
              <div
                className="pointer-events-none absolute top-0 left-0 z-10"
                style={{
                  ...tableInsetCornerStyle,
                  backgroundImage: tableInsetCornerBackgrounds.topLeft,
                }}
              />
              <div
                className="pointer-events-none absolute top-0 right-0 z-10"
                style={{
                  ...tableInsetCornerStyle,
                  backgroundImage: tableInsetCornerBackgrounds.topRight,
                }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 z-10"
                style={{
                  ...tableInsetCornerStyle,
                  backgroundImage: tableInsetCornerBackgrounds.bottomLeft,
                }}
              />
              <div
                className="pointer-events-none absolute right-0 bottom-0 z-10"
                style={{
                  ...tableInsetCornerStyle,
                  backgroundImage: tableInsetCornerBackgrounds.bottomRight,
                }}
              />
              <div
                data-slot="table-inset-border"
                className="pointer-events-none absolute inset-0 z-20 rounded-lg border border-border/70 dark:border-border"
              />
            </div>
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
      "sticky top-0 z-20",
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
      "[&_tr_td]:bg-background",
      "[&_tr_td]:border-border/70 dark:[&_tr_td]:border-border",
      "group-data-[rounded-inset=false]/table:[&_tr:first-child_td]:border-t",
      "group-data-[rounded-inset=false]/table:[&_tr:last-child_td]:border-b",
      "group-data-[rounded-inset=false]/table:[&_tr:has(+_tr:last-child[hidden])_td]:border-b",
      "group-data-[rounded-inset=false]/table:[&_tr_td:first-child]:border-l",
      "group-data-[rounded-inset=false]/table:[&_tr_td:last-child]:border-r",
      "group-data-[row-dividers]/table:[&_tr:not(:last-child)_td]:border-b group-data-[row-dividers]/table:[&_tr_td]:border-border/60",
      "group-data-bordered/table:[&_tr:not(:last-child)_td]:border-b group-data-bordered/table:[&_tr_td:not(:last-child)]:border-r group-data-bordered/table:[&_tr_td]:border-border/70 dark:group-data-bordered/table:[&_tr_td]:border-border",
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
