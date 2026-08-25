import {
  createFileRoute,
  notFound,
  stripSearchParams,
} from "@tanstack/react-router";
import { z } from "zod";

import { AppLayout } from "@/app-layout";
import { BlockCategoryGrid } from "@/shared/components/blocks/block-category-grid";
import {
  BlockPreviewList,
  CategoryNavigation,
} from "@/shared/components/blocks/block-preview-list";
import {
  allBlockCategory,
  blockCategories,
  normalizeBlockCategorySearch,
} from "@/shared/lib/blocks";

export const Route = createFileRoute("/blocks/")({
  component: BlocksIndexRoute,
  validateSearch: z.object({
    category: z.string().trim().optional().catch(undefined),
    q: z.string().default("").catch(""),
  }),
  search: {
    middlewares: [stripSearchParams({ q: "" })],
  },
  loaderDeps: ({ search }) => ({
    category: normalizeBlockCategorySearch(search.category),
  }),
  loader: ({ deps }) => {
    const category = deps.category;

    if (!category) {
      return;
    }

    const isKnownCategory =
      category === allBlockCategory.name ||
      blockCategories.some((item) => item.name === category);

    if (!isKnownCategory) {
      throw notFound();
    }
  },
});

function BlocksIndexRoute() {
  const search = Route.useSearch();
  const category = normalizeBlockCategorySearch(search.category);

  if (category) {
    return (
      <AppLayout>
        <div className="container py-10 md:py-14">
          <BlockPreviewList category={category} query={search.q} />
          <CategoryNavigation category={category} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <BlockCategoryGrid />
    </AppLayout>
  );
}
