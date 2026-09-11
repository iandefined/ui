import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/app-layout";
import { ICON_CATALOG } from "@/icons/catalog";
import { IconCatalog } from "@/shared/components/icon-catalog/icon-catalog";
import { Link } from "@/shared/components/link";
import { ROUTES } from "@/shared/constants/routes";
import { createPageHead } from "@/shared/lib/seo/metadata";

const ICONS_TITLE = "Icons";
const ICONS_DESCRIPTION = `Explore ${ICON_CATALOG.length} alternative visual styles for Lucide icons.`;

export const Route = createFileRoute("/icons")({
  component: IconsRoute,
  head: () =>
    createPageHead({
      description: ICONS_DESCRIPTION,
      path: ROUTES.ICONS,
      title: `${ICONS_TITLE} - Icons`,
    }),
});

function IconsRoute() {
  return (
    <AppLayout>
      <div className="container py-10 md:py-14">
        <div className="mb-8 space-y-2">
          <h1 className="scroll-m-20 text-neutral-800 dark:text-neutral-300 text-3xl font-semibold tracking-tight md:text-4xl">
            {ICONS_TITLE}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Explore {ICON_CATALOG.length} alternative visual styles for{" "}
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
        </div>

        <IconCatalog />
      </div>
    </AppLayout>
  );
}
