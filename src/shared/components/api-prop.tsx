"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

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
  const displayedType = simpleType ?? fullType;
  const displayedDefault = defaultValue ?? "—";

  return (
    <Collapsible.Root className="border-b last:border-b-0">
      <Collapsible.Trigger
        className={cn(
          "group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60",
          "focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-[3px]"
        )}
      >
        <span className="min-w-0 flex-1 font-mono text-sm font-medium">
          {name}
        </span>
        {required ? (
          <span className="bg-destructive/10 text-destructive rounded px-1.5 py-0.5 text-xs font-medium">
            Required
          </span>
        ) : null}
        <code className="text-muted-foreground hidden min-w-0 flex-1 truncate text-sm sm:block">
          {displayedType}
        </code>
        <code className="text-muted-foreground hidden w-28 shrink-0 truncate text-sm md:block">
          {displayedDefault}
        </code>
        <ChevronRightIcon
          aria-hidden="true"
          className="text-muted-foreground size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none group-data-panel-open:rotate-90"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-150 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none">
        <div className="border-t bg-muted/40 px-4 py-4 text-sm">
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[7rem_minmax(0,1fr)]">
            <dt className="text-muted-foreground font-medium">Description</dt>
            <dd className="min-w-0 leading-relaxed">{children}</dd>
            <dt className="text-muted-foreground font-medium">Type</dt>
            <dd className="min-w-0 font-mono text-xs break-words">
              {fullType}
            </dd>
            <dt className="text-muted-foreground font-medium md:hidden">
              Default
            </dt>
            <dd className="min-w-0 font-mono text-xs break-words md:hidden">
              {displayedDefault}
            </dd>
          </dl>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

export type ApiPropsListProps = {
  children: ReactNode;
};

export function ApiPropsList({ children }: ApiPropsListProps) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-xl border"
      aria-label="Props"
    >
      <div className="bg-muted/50 border-b border-border flex items-center gap-3 px-4 py-2.5 text-sm font-medium">
        <span className="flex-1 text-muted-foreground">Prop</span>
        <span className="text-muted-foreground hidden flex-1 sm:block">
          Type
        </span>
        <span className="text-muted-foreground hidden w-28 md:block">
          Default
        </span>
        <span className="size-4" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
