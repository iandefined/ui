"use client";

import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  SearchIcon,
  TagIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { BlockShowcase } from "@/shared/components/blocks/block-showcase";
import { DocsNavLink } from "@/shared/components/docs-nav-link";
import { Link } from "@/shared/components/link";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Input } from "@/shared/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  allBlockCategory,
  blockCategories,
  getBlockCategoryTitle,
  getBlocksForCategory,
} from "@/shared/lib/blocks";
import { cn } from "@/shared/lib/utils";

const INITIAL_BLOCK_COUNT = 5;
const BLOCKS_PER_LOAD = 5;

type CategoryCommandItem = {
  value: string;
  label: string;
};

type CategoryCommandGroup = {
  value: string;
  items: CategoryCommandItem[];
};

const getCategoryHref = (category: string) =>
  `/blocks?category=${encodeURIComponent(category)}`;

export function BlockPreviewList({
  category,
  query,
}: {
  category: string;
  query: string;
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BLOCK_COUNT);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const blocks = getBlocksForCategory(category);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBlocks = blocks.filter((block) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      block.name.toLowerCase().includes(normalizedQuery) ||
      block.title.toLowerCase().includes(normalizedQuery) ||
      block.categories.some((item) =>
        item.toLowerCase().includes(normalizedQuery)
      )
    );
  });

  useEffect(() => {
    setVisibleCount(INITIAL_BLOCK_COUNT);
  }, [category, query]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisibleCount((count) =>
          Math.min(count + BLOCKS_PER_LOAD, filteredBlocks.length)
        );
      }
    });

    const current = loadMoreRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [filteredBlocks.length]);

  const visibleBlocks = filteredBlocks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlocks.length;

  return (
    <div>
      <BlockListFilter
        category={category}
        query={query}
        numberOfBlocks={filteredBlocks.length}
      />

      <div className="mt-6 grid grid-cols-1 gap-10">
        {visibleBlocks.length ? (
          visibleBlocks.map((block) => (
            <BlockShowcase key={block.name} block={block} showTitle />
          ))
        ) : (
          <ResultsNotFound category={category} />
        )}
        {hasMore ? (
          <div
            ref={loadMoreRef}
            className="flex h-20 items-center justify-center"
          >
            <p className="text-sm text-muted-foreground">
              Loading more blocks...
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BlockListFilter({
  category,
  query,
  numberOfBlocks,
}: {
  category: string;
  query: string;
  numberOfBlocks: number;
}) {
  return (
    <div className="flex justify-between gap-2 max-sm:flex-col mb-16">
      <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-muted/50 p-1">
        <CategoryFilter category={category} query={query} />
        <PreviewListSearch category={category} query={query} />
      </div>
      <div className="flex grow items-center gap-2 rounded-xl border border-border/70 bg-muted/50 px-4 max-sm:hidden">
        <p className="ms-auto text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{numberOfBlocks}</span>{" "}
          {numberOfBlocks === 1 ? "block" : "blocks"} found
        </p>
      </div>
    </div>
  );
}

function CategoryFilter({
  category,
  query,
}: {
  category: string;
  query: string;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const options = useMemo(() => [allBlockCategory, ...blockCategories], []);
  const selected =
    options.find((option) => option.name === category) ?? allBlockCategory;
  const commandGroups = useMemo<CategoryCommandGroup[]>(
    () => [
      {
        value: "Categories",
        items: options.map((option) => ({
          value: option.name,
          label: option.title,
        })),
      },
    ],
    [options]
  );

  const handleSelect = (value: string) => {
    const nextQuery = query.trim();

    setOpen(false);
    navigate({
      to: "/blocks",
      search: nextQuery
        ? { category: value, q: nextQuery }
        : { category: value },
    });
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            aria-expanded={open}
            className="w-44 justify-between bg-background"
            variant="outline"
          >
            <span className="flex min-w-0 items-center gap-2">
              <TagIcon className="size-4 shrink-0" />
              <span className="truncate">{selected.title}</span>
            </span>
            <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />
      <PopoverContent align="start" className="p-0">
        <Command items={commandGroups}>
          <CommandInput placeholder="Search category..." />
          <CommandList
            className="max-h-96"
            renderItem={(value) => {
              const group = value as unknown as CategoryCommandGroup;
              return (
                <CommandGroup
                  key={group.value}
                  items={group.items}
                  renderItem={(itemValue) => {
                    const option = itemValue as unknown as CategoryCommandItem;
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => handleSelect(option.value)}
                        value={option}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 size-4",
                            selected.name === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
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

function PreviewListSearch({
  category,
  query,
}: {
  category: string;
  query: string;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextQuery = value.trim();

      if (nextQuery === query) {
        return;
      }

      navigate({
        to: "/blocks",
        search: nextQuery ? { category, q: nextQuery } : { category },
        replace: true,
      });
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [category, navigate, query, value]);

  return (
    <div className="relative w-full max-w-80">
      <Input
        className="w-full rounded-lg bg-background ps-9"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search"
        value={value}
      />
      <SearchIcon className="absolute inset-y-0 left-2 my-auto size-5 text-muted-foreground" />
    </div>
  );
}

function ResultsNotFound({ category }: { category: string }) {
  const navigate = useNavigate();

  const clearQuery = () => {
    navigate({
      to: "/blocks",
      search: { category },
      replace: true,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button type="button" onClick={clearQuery}>
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export function CategoryNavigation({ category }: { category: string }) {
  if (category === allBlockCategory.name) {
    return null;
  }

  const currentIndex = blockCategories.findIndex(
    (item) => item.name === category
  );

  if (currentIndex === -1) {
    return null;
  }

  const previous = currentIndex > 0 ? blockCategories[currentIndex - 1] : null;
  const next =
    currentIndex < blockCategories.length - 1
      ? blockCategories[currentIndex + 1]
      : null;

  if (!(previous || next)) {
    return null;
  }

  return (
    <nav aria-label="Category navigation" className="mt-12">
      <div className="grid w-full grid-cols-1 gap-4 sm:hidden">
        {previous ? (
          <CategoryNavCard direction="previous" category={previous.name} />
        ) : null}
        {next ? (
          <CategoryNavCard direction="next" category={next.name} />
        ) : null}
      </div>
      <div className="hidden h-16 w-full items-center gap-2 sm:flex">
        {previous ? (
          <DocsNavLink
            href={getCategoryHref(previous.name)}
            navDirection="back"
            size="sm"
          >
            {previous.title}
          </DocsNavLink>
        ) : null}
        {next ? (
          <DocsNavLink
            href={getCategoryHref(next.name)}
            navDirection="forward"
            className="ml-auto"
            size="sm"
          >
            {next.title}
          </DocsNavLink>
        ) : null}
      </div>
    </nav>
  );
}

function CategoryNavCard({
  direction,
  category,
}: {
  direction: "previous" | "next";
  category: string;
}) {
  const title = getBlockCategoryTitle(category);
  const blocks = getBlocksForCategory(category);
  const isNext = direction === "next";

  return (
    <Link
      aria-label={`${isNext ? "Next" : "Previous"} category: ${title}`}
      href={getCategoryHref(category)}
      className={cn(
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-ring/50 flex min-w-0 flex-col gap-2 rounded-md p-4 text-sm font-medium shadow-none transition-all outline-none focus-visible:ring-[3px]",
        isNext ? "text-end" : "text-left"
      )}
    >
      <span
        className={cn(
          "inline-flex min-w-0 items-center gap-1.5",
          isNext && "flex-row-reverse"
        )}
      >
        {isNext ? (
          <ArrowRightIcon className="size-4 shrink-0" />
        ) : (
          <ArrowLeftIcon className="size-4 shrink-0" />
        )}
        <span className="truncate">{title}</span>
      </span>
      <span className="truncate text-sm text-muted-foreground">
        {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
      </span>
    </Link>
  );
}
