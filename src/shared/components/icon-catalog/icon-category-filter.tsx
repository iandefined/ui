import { cn } from "cn";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import type { CategoryInfo, IconCategory } from "@/icons/catalog";
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/base/popover";

export interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: "all" | IconCategory;
  onSelectCategory: (category: "all" | IconCategory) => void;
  className?: string;
}

export function IconCategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Icon categories"
      className={cn("flex flex-col gap-1", className)}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            aria-current={isSelected ? "true" : undefined}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-hidden",
              isSelected
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span>{category.label}</span>
            <span className="tabular-nums text-sm text-muted-foreground">
              {category.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function IconCategoryMobileSelect({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  const currentCategory =
    categories.find((c) => c.id === selectedCategory) ?? categories[0];

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 gap-1.5 text-sm font-medium cursor-pointer",
              className
            )}
          >
            <span>{currentCategory.label}</span>
            <ChevronDownIcon className="text-muted-foreground size-3.5" />
          </Button>
        }
      />
      <PopoverContent align="start" className="w-56 p-1">
        <div className="flex flex-col gap-0.5">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-hidden",
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckIcon
                    className={cn(
                      "size-3.5",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{category.label}</span>
                </div>
                <span className="tabular-nums text-sm text-muted-foreground">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
