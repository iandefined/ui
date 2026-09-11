import {
  createFileRoute,
  stripSearchParams,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";

import { AppLayout } from "@/app-layout";
import { getIconCount, ICON_CATALOG } from "@/icons/catalog";
import { IconCatalog } from "@/shared/components/icon-catalog/icon-catalog";
import { Link } from "@/shared/components/link";
import { ROUTES } from "@/shared/constants/routes";
import { createPageHead } from "@/shared/lib/seo/metadata";

const ICONS_TITLE = "Icons";
const ICONS_DESCRIPTION = `Explore ${ICON_CATALOG.length} alternative visual styles for Lucide icons.`;

export const Route = createFileRoute("/icons")({
  component: IconsRoute,
  validateSearch: z.object({
    q: z.string().trim().default("").catch(""),
    category: z
      .enum(["all", "navigation", "notifications", "files", "communication"])
      .default("all")
      .catch("all"),
    variant: z.enum(["all", "duotone", "filled"]).default("all").catch("all"),
    icon: z.string().trim().optional().catch(undefined),
    iconVariant: z
      .enum(["duotone", "outline", "filled"])
      .default("duotone")
      .catch("duotone"),
    size: z
      .enum(["16", "20", "24", "32", "40", "48", "64", "80"])
      .default("24")
      .catch("24"),
    syntax: z.enum(["svg", "react"]).default("svg").catch("svg"),
  }),
  search: {
    middlewares: [
      stripSearchParams({ q: "", category: "all", variant: "all" }),
    ],
  },
  head: () =>
    createPageHead({
      description: ICONS_DESCRIPTION,
      path: ROUTES.ICONS,
      title: `${ICONS_TITLE} - Icons`,
    }),
});

function IconsRoute() {
  const search = useSearch({ from: "/icons" });
  const iconCount = getIconCount(ICON_CATALOG, search.variant);

  return (
    <AppLayout>
      <div className="container py-10 md:py-14">
        <div className="mb-8 space-y-2">
          <h1 className="scroll-m-20 text-neutral-800 dark:text-neutral-300 text-3xl font-semibold tracking-tight md:text-4xl">
            {ICONS_TITLE}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Explore {iconCount} alternative visual styles for{" "}
            <Link
              href="https://lucide.dev"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              Lucide
            </Link>{" "}
            icons.
          </p>
          <span className="sr-only" role="status" aria-live="polite">
            {iconCount} {iconCount === 1 ? "icon" : "icons"} available for the
            selected variant.
          </span>
        </div>

        <IconCatalog />
      </div>
    </AppLayout>
  );
}
