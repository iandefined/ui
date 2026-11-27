import { cn } from "cn";
import { CheckIcon, ChevronsUpDownIcon, TagIcon } from "lucide-react";
import { useState } from "react";

import { type CategoryInfo, type IconCategory } from "@/icons/catalog";
import { Button } from "@/registry/base/button";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/base/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/base/popover";

export type CategoryFilterProps = {
  categories: CategoryInfo[];
  selectedCategory: "all" | IconCategory;
  onSelectCategory: (category: "all" | IconCategory) => void;
  onPrefetchCategory?: (category: "all" | IconCategory) => void;
  className?: string;
};

export function IconCategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onPrefetchCategory,
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
          <Button
            key={category.id}
            type="button"
            variant={isSelected ? "default" : "ghost"}
            onClick={() => onSelectCategory(category.id)}
            onFocus={() => onPrefetchCategory?.(category.id)}
            onPointerEnter={() => onPrefetchCategory?.(category.id)}
            aria-current={isSelected ? "true" : undefined}
            className={cn(
              "h-9 w-full justify-between rounded-lg px-3 py-2 text-sm font-medium",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-hidden",
              isSelected
                ? "[--button-bg:var(--accent)] text-accent-foreground shadow-none ring-0"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{category.label}</span>
            <span className="tabular-nums text-sm text-muted-foreground">
              {category.count}
            </span>
          </Button>
        );
      })}
    </nav>
  );
}

export function IconCategoryMobileSelect({
  categories,
  selectedCategory,
  onSelectCategory,
  onPrefetchCategory,
  className,
}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const currentCategory =
    categories.find((c) => c.id === selectedCategory) ?? categories[0];
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 justify-between gap-2 text-sm font-medium cursor-pointer",
              className
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <TagIcon className="size-4 shrink-0" />
              <span className="truncate">{currentCategory.label}</span>
            </span>
            <ChevronsUpDownIcon className="text-muted-foreground size-4 shrink-0 opacity-70" />
          </Button>
        }
      />
      <PopoverContent
        align="start"
        animationPreset="scale"
        transitionPreset="outQuint"
        className="w-56 p-0"
      >
        <Command
          className="rounded-md shadow-none ring-0 dark:bg-popover"
          items={categories}
          itemToStringValue={(category) => category.label}
        >
          <CommandContent>
            <CommandInput
              aria-label="Search icon categories"
              placeholder="Search category..."
            />
            <CommandList
              className="max-h-96"
              emptyMessage="No category found."
              hideScrollbar={false}
            >
              <CommandGroup>
                <CommandCollection>
                  {(category: CategoryInfo) => (
                    <CommandItem
                      key={category.id}
                      onClick={() => {
                        setOpen(false);
                        onSelectCategory(category.id);
                      }}
                      onFocus={() => onPrefetchCategory?.(category.id)}
                      onPointerEnter={() => onPrefetchCategory?.(category.id)}
                      value={category}
                    >
                      <CheckIcon
                        aria-hidden="true"
                        className={cn(
                          "size-4",
                          selectedCategory === category.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="flex-1">{category.label}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {category.count}
                      </span>
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
            </CommandList>
          </CommandContent>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
