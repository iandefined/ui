import { SearchXIcon } from "lucide-react";
import { useMemo, useState } from "react";

import type { IconCatalogItem, IconCategory } from "@/icons/catalog";
import { getCategoryCounts, getIconSvg, ICON_CATALOG } from "@/icons/catalog";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
} from "@/registry/base/tooltip";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

const iconTooltipHandle = Tooltip.createHandle<string>();
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

import { IconCard } from "./icon-card";
import { IconCategorySidebar } from "./icon-category-filter";
import { IconDetailDialog } from "./icon-detail-dialog";
import { IconToolbar } from "./icon-toolbar";

export function IconCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | IconCategory
  >("all");
  const [selectedVariant, setSelectedVariant] = useState<"all" | "duotone">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<IconCatalogItem | null>(null);

  const { filter } = useFuzzyFilter<IconCatalogItem>({
    keys: ["name", "title", "category", "tags"],
  });

  // Calculate category counts from full catalog
  const categoryCounts = useMemo(() => getCategoryCounts(ICON_CATALOG), []);

  // Filter items by fuzzy search, selected category, and selected variant
  const filteredItems = useMemo(() => {
    const searchFiltered = filter([...ICON_CATALOG], searchQuery);

    return searchFiltered.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesVariant =
        selectedVariant === "all" || item.variant === selectedVariant;
      return matchesCategory && matchesVariant;
    });
  }, [filter, searchQuery, selectedCategory, selectedVariant]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      {/* Desktop Category Sidebar */}
      <aside className="hidden w-48 shrink-0 lg:block">
        <div className="sticky top-20">
          <IconCategorySidebar
            categories={categoryCounts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Toolbar */}
        <IconToolbar
          categories={categoryCounts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedVariant={selectedVariant}
          onSelectVariant={setSelectedVariant}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <TooltipProvider delay={0} closeDelay={100}>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 sm:gap-2.5">
              {filteredItems.map((item) => (
                <IconCard
                  key={item.name}
                  item={item}
                  svg={getIconSvg(item.name)}
                  tooltipHandle={iconTooltipHandle}
                  onClick={() => setActiveItem(item)}
                />
              ))}
            </div>

            <Tooltip handle={iconTooltipHandle}>
              {({ payload }) => (
                <TooltipPopup
                  side="bottom"
                  sideOffset={-10}
                  showArrow={false}
                  className="z-20 rounded-md border-none bg-primary px-2.5 py-0.5 text-xs font-medium tracking-tight text-primary-foreground shadow-sm"
                >
                  {payload}
                </TooltipPopup>
              )}
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Empty className="border border-dashed py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchXIcon />
              </EmptyMedia>
              <EmptyTitle>No icons found</EmptyTitle>
              <EmptyDescription>
                We couldn't find any icons matching &ldquo;{searchQuery}&rdquo;.
                Try searching for something else.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>

      {/* Detail Dialog */}
      <IconDetailDialog
        item={activeItem}
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) setActiveItem(null);
        }}
      />
    </div>
  );
}
