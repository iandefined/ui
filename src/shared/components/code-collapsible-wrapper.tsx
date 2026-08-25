"use client";

import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";

export const CodeCollapsibleWrapper = ({
  className,
  children,
  navTriggerClassName,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  navTriggerClassName?: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <div
        data-slot="collapsible-content"
        data-open={isOpened ? "" : undefined}
        data-closed={isOpened ? undefined : ""}
        className="relative mt-6 overflow-hidden rounded-b-lg data-closed:max-h-64 [&>figure]:mt-0 [&>figure]:md:mx-0!"
      >
        <div
          className={cn(
            "absolute top-1.5 right-11 z-10 flex h-7 items-center",
            navTriggerClassName
          )}
        >
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-7 rounded-md px-2"
              />
            }
          >
            {isOpened ? "Collapse" : "Expand"}
          </CollapsibleTrigger>
          <Separator orientation="vertical" className="mx-1.5 h-4!" />
        </div>
        {children}
        <div className="absolute inset-x-0 bottom-0 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b from-code/70 to-code group-data-open/collapsible:hidden">
          <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
            Expand
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
};
