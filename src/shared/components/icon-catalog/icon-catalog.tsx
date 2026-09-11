import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchXIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type {
  IconCatalogItem,
  IconCategory,
  IconVariant,
} from "@/icons/catalog";
import { getCategoryCounts, getIconSvg, ICON_CATALOG } from "@/icons/catalog";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
} from "@/registry/base/tooltip";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";
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

const iconTooltipHandle = Tooltip.createHandle<string>();

interface IconDisplayItem {
  item: IconCatalogItem;
  variant: IconVariant;
}

export function IconCatalog() {
  const search = useSearch({ from: "/icons" });
  const navigate = useNavigate({ from: "/icons" });
  const [dialogItem, setDialogItem] = useState<IconCatalogItem | null>(null);

  const activeItem = useMemo(
    () =>
      search.icon
        ? (ICON_CATALOG.find((item) => item.name === search.icon) ?? null)
        : null,
    [search.icon]
  );

  useEffect(() => {
    if (activeItem) {
      setDialogItem(activeItem);
    }
  }, [activeItem]);

  const { filter } = useFuzzyFilter<IconCatalogItem>({
    keys: ["name", "title", "category", "tags"],
  });

  // Calculate category counts from the active variant's available icons.
  const categoryCounts = useMemo(
    () => getCategoryCounts(ICON_CATALOG, search.variant),
    [search.variant]
  );

  // Filter items by fuzzy search, selected category, and selected variant
  const filteredItems = useMemo(() => {
    const searchFiltered = filter([...ICON_CATALOG], search.q);

    return searchFiltered.filter((item) => {
      const matchesCategory =
        search.category === "all" || item.category === search.category;
      const matchesVariant =
        search.variant === "all" || item.variants.includes(search.variant);
      return matchesCategory && matchesVariant;
    });
  }, [filter, search.category, search.q, search.variant]);

  const displayItems = useMemo<IconDisplayItem[]>(
    () =>
      filteredItems.flatMap((item) => {
        const variants =
          search.variant === "all"
            ? item.variants.filter((variant) => variant !== "outline")
            : item.variants.filter((variant) => variant === search.variant);

        return variants.map((variant) => ({ item, variant }));
      }),
    [filteredItems, search.variant]
  );

  const updateCatalogSearch = (next: {
    q?: string;
    category?: "all" | IconCategory;
    variant?: "all" | "duotone" | "filled";
  }) => {
    navigate({
      replace: true,
      search: (previous) => ({ ...previous, ...next }),
    });
  };

  const openIcon = (item: IconCatalogItem, variant: IconVariant) => {
    setDialogItem(item);
    navigate({
      search: (previous) => ({
        ...previous,
        icon: item.name,
        iconVariant: variant,
        size: "24",
      }),
    });
  };

  const closeIcon = () => {
    navigate({
      replace: true,
      search: (previous) => ({ ...previous, icon: undefined }),
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      {/* Desktop Category Sidebar */}
      <aside className="hidden w-48 shrink-0 lg:block">
        <div className="sticky top-20">
          <IconCategorySidebar
            categories={categoryCounts}
            selectedCategory={search.category}
            onSelectCategory={(category) => updateCatalogSearch({ category })}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Toolbar */}
        <IconToolbar
          categories={categoryCounts}
          selectedCategory={search.category}
          onSelectCategory={(category) => updateCatalogSearch({ category })}
          selectedVariant={search.variant}
          onSelectVariant={(variant) => updateCatalogSearch({ variant })}
          searchQuery={search.q}
          onSearchChange={(q) => updateCatalogSearch({ q })}
        />

        {/* Grid or Empty State */}
        {displayItems.length > 0 ? (
          <TooltipProvider delay={0} closeDelay={100}>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 sm:gap-2.5">
              {displayItems.map(({ item, variant }) => (
                <IconCard
                  key={`${item.name}-${variant}`}
                  item={item}
                  variant={variant}
                  svg={getIconSvg(item.name, variant)}
                  tooltipHandle={iconTooltipHandle}
                  onClick={() => openIcon(item, variant)}
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
                We couldn't find any icons matching &ldquo;{search.q}&rdquo;.
                Try searching for something else.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>

      {/* Detail Dialog */}
      <IconDetailDialog
        item={dialogItem}
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) closeIcon();
        }}
      />
    </div>
  );
}
