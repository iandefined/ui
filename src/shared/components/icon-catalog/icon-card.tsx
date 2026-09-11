import { cn } from "cn";

import type { IconCatalogItem } from "@/icons/catalog";
import { type Tooltip, TooltipTrigger } from "@/registry/base/tooltip";

import { IconPreview } from "./icon-preview";

export type IconTooltipHandle = ReturnType<typeof Tooltip.createHandle<string>>;

export interface IconCardProps {
  item: IconCatalogItem;
  svg: string;
  tooltipHandle?: IconTooltipHandle;
  onClick: () => void;
  className?: string;
}

export function IconCard({
  item,
  svg,
  tooltipHandle,
  onClick,
  className,
}: IconCardProps) {
  return (
    <TooltipTrigger
      handle={tooltipHandle}
      payload={item.name}
      delay={0}
      closeDelay={0}
      render={
        <button
          type="button"
          onClick={onClick}
          aria-label={`View ${item.title} icon details`}
          className={cn(
            "group relative flex aspect-square items-center justify-center rounded-xl border border-border/70 bg-card p-2 sm:p-2.5",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-hidden",
            "cursor-pointer select-none",
            className
          )}
        >
          <div className="flex size-8 sm:size-9 items-center justify-center">
            <IconPreview
              svg={svg}
              className="size-5 sm:size-6 text-foreground"
            />
          </div>
        </button>
      }
    />
  );
}
