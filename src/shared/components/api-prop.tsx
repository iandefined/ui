"use client";

import { ChevronRightIcon } from "lucide-react";
import * as React from "react";
import type { ReactNode } from "react";

import { Collapsible, CollapsibleContent } from "@/registry/base/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";
import { cn } from "@/shared/lib/utils";

export type ApiPropProps = {
  name: string;
  fullType: string;
  simpleType?: string;
  defaultValue?: string;
  required?: boolean;
  children: ReactNode;
};

export function ApiProp({
  name,
  fullType,
  simpleType,
  defaultValue,
  required = false,
  children,
}: ApiPropProps) {
  const [open, setOpen] = React.useState(false);
  const displayedType = simpleType ?? fullType;
  const displayedDefault = defaultValue ?? "-";

  return (
    <>
      <TableRow
        onClick={() => setOpen((prev) => !prev)}
        className="group/row cursor-pointer transition-colors hover:bg-muted/50"
      >
        <TableCell className="font-mono text-sm font-medium">
          <div className="flex items-center gap-2">
            <span>{name}</span>
            {required ? (
              <span className="bg-destructive/10 text-destructive rounded px-1.5 py-0.5 text-xs font-sans font-medium">
                Required
              </span>
            ) : null}
          </div>
        </TableCell>
        <TableCell className="text-muted-foreground hidden sm:table-cell">
          <code className="text-xs">{displayedType}</code>
        </TableCell>
        <TableCell className="text-muted-foreground hidden md:table-cell">
          <code className="text-xs">{displayedDefault}</code>
        </TableCell>
        <TableCell className="w-8 text-right">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center p-1 rounded cursor-pointer transition-colors"
            aria-label="Toggle details"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className={cn(
                "size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none",
                open && "rotate-90"
              )}
            />
          </button>
        </TableCell>
      </TableRow>
      <TableRow className="[&:not(:has([data-slot=collapsible-content]:not([hidden]))):not(:has([data-slot=collapsible-content][data-ending-style]))]:hidden">
        <TableCell colSpan={4} className="p-0 whitespace-normal">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleContent>
              <div className="bg-muted/40 px-4 py-4 text-sm">
                <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <dt className="text-muted-foreground font-medium">
                    Description
                  </dt>
                  <dd className="min-w-0 leading-relaxed text-foreground whitespace-normal">
                    {children}
                  </dd>
                  <dt className="text-muted-foreground font-medium">Type</dt>
                  <dd className="min-w-0 font-mono text-xs break-words text-foreground">
                    {fullType}
                  </dd>
                  <dt className="text-muted-foreground font-medium md:hidden">
                    Default
                  </dt>
                  <dd className="min-w-0 font-mono text-xs break-words text-foreground md:hidden">
                    {displayedDefault}
                  </dd>
                </dl>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </>
  );
}

export type ApiPropsListProps = {
  children: ReactNode;
};

export function ApiPropsList({ children }: ApiPropsListProps) {
  return (
    <div className="not-prose my-6">
      <Table className="md:max-w-none">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Prop</TableHead>
            <TableHead className="hidden sm:table-cell">Type</TableHead>
            <TableHead className="hidden w-28 md:table-cell">Default</TableHead>
            <TableHead className="w-8 text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}
