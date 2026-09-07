"use client";

import { cn } from "cn";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";

export type PaginationSize = "default" | "sm" | "lg";

interface PaginationContextValue {
  size: PaginationSize;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  size: "default",
});

export const usePagination = () => React.useContext(PaginationContext);

export interface PaginationProps extends React.ComponentProps<"nav"> {
  size?: PaginationSize;
}

function Pagination({
  className,
  size = "default",
  ...props
}: PaginationProps) {
  return (
    <PaginationContext.Provider value={{ size }}>
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        data-size={size}
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationContext.Provider>
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  const { size } = usePagination();

  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center",
        size === "sm" ? "gap-0.5" : "gap-1",
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

export interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean;
  isDisabled?: boolean;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "icon-xs"
    | "icon-sm"
    | "icon"
    | "icon-lg"
    | "icon-xl";
}

function PaginationLink({
  className,
  isActive,
  isDisabled,
  size: sizeProp,
  children,
  ...props
}: PaginationLinkProps) {
  const { size: contextSize } = usePagination();
  const defaultSize =
    contextSize === "sm"
      ? "icon-sm"
      : contextSize === "lg"
        ? "icon-lg"
        : "icon";
  const resolvedSize = sizeProp ?? defaultSize;
  const isIconOnly =
    resolvedSize === "icon" ||
    resolvedSize === "icon-sm" ||
    resolvedSize === "icon-xs" ||
    resolvedSize === "icon-lg" ||
    resolvedSize === "icon-xl";

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={isDisabled}
      data-slot="pagination-link"
      data-active={isActive ? "" : undefined}
      data-disabled={isDisabled ? "" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size: resolvedSize,
        }),
        contextSize === "sm" && [
          "text-xs [&_svg]:size-3.5",
          isIconOnly ? "size-7 p-0" : "h-7 px-2.5 w-auto",
        ],
        contextSize === "default" && [isIconOnly && "size-9"],
        isDisabled && "pointer-events-none opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function PaginationPrevious({
  className,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { size: contextSize } = usePagination();
  const defaultSize =
    contextSize === "sm" ? "sm" : contextSize === "lg" ? "lg" : "default";
  const resolvedSize = sizeProp ?? defaultSize;

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={resolvedSize}
      data-slot="pagination-previous"
      className={cn(
        "gap-1.5 px-2.5 w-auto shrink-0",
        contextSize === "sm" && "h-7 px-2 text-xs",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon
        className={contextSize === "sm" ? "size-3.5" : "size-4"}
      />
      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { size: contextSize } = usePagination();
  const defaultSize =
    contextSize === "sm" ? "sm" : contextSize === "lg" ? "lg" : "default";
  const resolvedSize = sizeProp ?? defaultSize;

  return (
    <PaginationLink
      aria-label="Go to next page"
      size={resolvedSize}
      data-slot="pagination-next"
      className={cn(
        "gap-1.5 px-2.5 w-auto shrink-0",
        contextSize === "sm" && "h-7 px-2 text-xs",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon
        className={contextSize === "sm" ? "size-3.5" : "size-4"}
      />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { size: contextSize } = usePagination();

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex items-center justify-center",
        contextSize === "sm"
          ? "size-7 text-xs [&_svg]:size-3.5"
          : "size-9 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <EllipsisIcon className={contextSize === "sm" ? "size-3.5" : "size-4"} />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
