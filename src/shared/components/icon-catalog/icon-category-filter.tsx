import { cn } from "cn";
import { CheckIcon, ChevronsUpDownIcon, TagIcon } from "lucide-react";
import { useState } from "react";

import type { CategoryInfo, IconCategory } from "@/icons/catalog";
import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/base/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";

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
  const [open, setOpen] = useState(false);
  const currentCategory =
    categories.find((c) => c.id === selectedCategory) ?? categories[0];
  const categoryGroup = [
    {
      value: "Categories",
      items: categories.map((category) => ({
        value: category.id,
        label: category.label,
      })),
    },
  ];

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
        <Command items={categoryGroup}>
          <CommandInput placeholder="Search category..." />
          <CommandList
            className="max-h-96"
            renderItem={(groupValue) => {
              const group = groupValue as (typeof categoryGroup)[number];

              return (
                <CommandGroup
                  key={group.value}
                  items={group.items}
                  renderItem={(itemValue) => {
                    const category = itemValue as {
                      value: "all" | IconCategory;
                      label: string;
                    };
                    const isSelected = selectedCategory === category.value;

                    return (
                      <CommandItem
                        key={category.value}
                        onSelect={() => {
                          setOpen(false);
                          onSelectCategory(category.value);
                        }}
                        value={category}
                      >
                        <CheckIcon
                          className={cn(
                            "size-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="flex-1">{category.label}</span>
                        <span className="tabular-nums text-muted-foreground">
                          {categories.find((item) => item.id === category.value)
                            ?.count ?? 0}
                        </span>
                      </CommandItem>
                    );
                  }}
                />
              );
            }}
          >
            <CommandEmpty>No category found.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
