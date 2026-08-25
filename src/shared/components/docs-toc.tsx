"use client";

import { MenuIcon, TextAlignStart } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

const headingById = (id: string): Element | null =>
  document.querySelector(`#${CSS.escape(id)}`);

const useActiveItem = (itemIds: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    for (const id of itemIds ?? []) {
      if (!id) {
        continue;
      }
      const element = headingById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        if (!id) {
          continue;
        }
        const element = headingById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
};

export const DocsTableOfContents = ({
  toc,
  variant = "list",
  className,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  variant?: "dropdown" | "list";
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className={cn("h-8 md:h-7 text-[0.8rem]", className)}
            />
          }
        >
          <MenuIcon /> On This Page
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh]"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              render={(props) => (
                <a {...props} href={item.url}>
                  {props.children}
                </a>
              )}
              onClick={handleClose}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 pl-0 text-sm", className)}>
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs [&_svg]:size-3 flex gap-1.5 items-center">
        <TextAlignStart /> On This Page
      </p>
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className="text-muted-foreground ms-4 hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] data-[active=true]:font-medium no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6"
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
};
