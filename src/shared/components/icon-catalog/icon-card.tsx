import { cn } from "cn";
import { useId } from "react";

import { type IconCatalogItem, type IconVariant } from "@/icons/catalog";

import { IconPreview } from "./icon-preview";

export type IconCardProps = {
  item: IconCatalogItem;
  variant: IconVariant;
  svg: string;
  onClick: () => void;
  onPrefetch?: () => void;
  className?: string;
};

export function IconCard({
  item,
  variant,
  svg,
  onClick,
  onPrefetch,
  className,
}: IconCardProps) {
  const variantLabel = variant === "outline" ? "Stroke" : variant;
  const tooltipId = useId();

  return (
    <div className="group relative aspect-square hover:z-20 focus-within:z-20">
      <button
        type="button"
        onClick={onClick}
        onFocus={onPrefetch}
        onPointerEnter={onPrefetch}
        aria-describedby={tooltipId}
        aria-label={`View ${item.title} ${variantLabel} icon details`}
        className={cn(
          "relative flex size-full items-center justify-center rounded-xl shadow-xs border border-border/70 bg-card p-2 sm:p-2.5",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-hidden",
          "cursor-pointer select-none",
          className
        )}
      >
        <div className="flex size-8 sm:size-9 items-center justify-center">
          <IconPreview svg={svg} className="size-5 sm:size-6 text-foreground" />
        </div>
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        className="invisible pointer-events-none absolute top-[calc(100%-0.625rem)] left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-95 whitespace-nowrap rounded-md border-none bg-primary px-2.5 py-0.5 text-xs font-medium tracking-tight text-primary-foreground opacity-0 shadow-sm transition-[opacity,transform,visibility] duration-100 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
      >
        <span className="block px-2 py-1">{item.name}</span>
      </div>
    </div>
  );
}
