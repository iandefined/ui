import { cn } from "cn";
import { SearchIcon, XIcon } from "lucide-react";

import type { CategoryInfo, IconCategory } from "@/icons/catalog";
import { Input } from "@/registry/base/input";
import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

import { IconCategoryMobileSelect } from "./icon-category-filter";

export interface IconToolbarProps {
  categories: CategoryInfo[];
  selectedCategory: "all" | IconCategory;
  onSelectCategory: (category: "all" | IconCategory) => void;
  selectedVariant: "all" | "duotone" | "filled";
  onSelectVariant: (variant: "all" | "duotone" | "filled") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function IconToolbar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedVariant,
  onSelectVariant,
  searchQuery,
  onSearchChange,
  className,
}: IconToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {/* Search stays full-width and above the filter row on narrow screens. */}
      <div className="relative min-w-0 flex-1">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2" />
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search icons..."
          aria-label="Search icons"
          className="h-9 pr-8 pl-9 text-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2.5 z-10 -translate-y-1/2 rounded-xs p-0.5 focus-visible:ring-2 focus-visible:outline-hidden"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>

      {/* Category and variant filters share their own row. */}
      <div className="flex min-w-0 items-center justify-between gap-2 sm:flex-none sm:justify-end">
        <div className="min-w-0 flex-1 lg:hidden">
          <IconCategoryMobileSelect
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            className="w-full"
          />
        </div>

        {/* Tabs from registry: All, Duotone */}
        <div className="ml-auto flex shrink-0 items-center">
          <Tabs
            value={selectedVariant}
            onValueChange={(val) =>
              onSelectVariant(val as "all" | "duotone" | "filled")
            }
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="duotone">Duotone</TabsTrigger>
              <TabsTrigger value="filled">Filled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
