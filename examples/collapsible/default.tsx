"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/base/collapsible";

export default function CollapsibleDefaultDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full max-w-sm rounded-xl border border-border bg-muted/40 p-4 space-y-2 dark:bg-card/40"
    >
      <div className="flex items-center justify-between gap-3 pb-1">
        <h4 className="text-sm font-semibold tracking-tight">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Toggle repositories"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <ChevronsUpDownIcon className="size-4" />
            </Button>
          }
        />
      </div>
      <div className="rounded-lg border border-border/80 bg-card px-3.5 py-2 font-mono text-xs shadow-xs dark:bg-background">
        @base-ui/react
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-lg border border-border/80 bg-card px-3.5 py-2 font-mono text-xs shadow-xs dark:bg-background">
          @tanstack/react-table
        </div>
        <div className="rounded-lg border border-border/80 bg-card px-3.5 py-2 font-mono text-xs shadow-xs dark:bg-background">
          fumadocs-core
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
