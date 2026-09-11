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
  selectedVariant: "all" | "duotone";
  onSelectVariant: (variant: "all" | "duotone") => void;
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
      <div className="flex flex-1 items-center gap-2">
        {/* Mobile category filter */}
        <div className="lg:hidden">
          <IconCategoryMobileSelect
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        {/* Search input */}
        <div className="relative flex-1">
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
      </div>

      {/* Tabs from registry: All, Duotone */}
      <div className="flex items-center self-end sm:self-auto">
        <Tabs
          value={selectedVariant}
          onValueChange={(val) => onSelectVariant(val as "all" | "duotone")}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="duotone">Duotone</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
