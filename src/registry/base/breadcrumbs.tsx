"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRightIcon, EllipsisIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BreadcrumbVariant = "default" | "surface";
type BreadcrumbSize = "sm" | "md" | "lg";

type BreadcrumbProps = ComponentProps<"nav"> & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "surface";
};

function Breadcrumb({
  "aria-label": ariaLabel = "Breadcrumb",
  className,
  size = "md",
  variant = "default",
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn("group", className)}
      data-size={size}
      data-slot="breadcrumb"
      data-variant={variant}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "inline-flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        "group-data-[size=sm]:gap-1 group-data-[size=sm]:text-xs group-data-[size=sm]:sm:gap-2",
        "group-data-[size=lg]:gap-2 group-data-[size=lg]:text-base group-data-[size=lg]:sm:gap-3",
        "group-data-[variant=surface]:rounded-lg group-data-[variant=surface]:border group-data-[variant=surface]:border-border/60 group-data-[variant=surface]:bg-muted/60 group-data-[variant=surface]:p-1 group-data-[variant=surface]:shadow-xs",
        className
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

type BreadcrumbLinkProps = useRender.ComponentProps<"a">;

function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  const defaultProps = {
    className: cn(
      "rounded-sm transition-colors hover:text-foreground",
      "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "group-data-[variant=surface]:px-1.5 group-data-[variant=surface]:py-0.5",
      className
    ),
    "data-slot": "breadcrumb-link",
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      className={cn(
        "font-normal text-foreground",
        "group-data-[variant=surface]:rounded-md group-data-[variant=surface]:bg-background group-data-[variant=surface]:px-2 group-data-[variant=surface]:py-1 group-data-[variant=surface]:shadow-xs group-data-[variant=surface]:ring-1 group-data-[variant=surface]:ring-border/60",
        className
      )}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
}

type BreadcrumbSeparatorProps = ComponentProps<"li"> & {
  separator?: ReactNode;
};

function BreadcrumbSeparator({
  children,
  className,
  separator,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center [&>svg]:size-3.5",
        "group-data-[size=sm]:[&>svg]:size-3",
        "group-data-[size=lg]:[&>svg]:size-4",
        className
      )}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? separator ?? <ChevronRightIcon />}
    </li>
  );
}

type BreadcrumbEllipsisProps = ComponentProps<"span"> & {
  "aria-label"?: string;
};

function BreadcrumbEllipsis({
  "aria-label": ariaLabel = "More pages",
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 items-center justify-center",
        "group-data-[size=sm]:size-7",
        "group-data-[size=lg]:size-11",
        className
      )}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <EllipsisIcon className="size-4 group-data-[size=sm]:size-3 group-data-[size=lg]:size-5" />
      <span className="sr-only">{ariaLabel}</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
export type {
  BreadcrumbEllipsisProps,
  BreadcrumbLinkProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
  BreadcrumbSize,
  BreadcrumbVariant,
};
