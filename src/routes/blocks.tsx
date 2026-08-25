import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ROUTES } from "@/shared/constants/routes";
import {
  BLOCKS_OG_IMAGE,
  BLOCKS_PAGE_DESCRIPTION,
  BLOCKS_PAGE_TITLE,
} from "@/shared/lib/blocks";
import { createPageHead } from "@/shared/lib/seo/metadata";

export const Route = createFileRoute("/blocks")({
  component: BlocksLayoutRoute,
  head: () =>
    createPageHead({
      description: BLOCKS_PAGE_DESCRIPTION,
      ogDescription: BLOCKS_PAGE_DESCRIPTION,
      ogImage: BLOCKS_OG_IMAGE,
      ogImageAlt: BLOCKS_PAGE_TITLE,
      ogTitle: BLOCKS_PAGE_TITLE,
      path: ROUTES.BLOCKS,
      title: BLOCKS_PAGE_TITLE,
    }),
});

function BlocksLayoutRoute() {
  return <Outlet />;
}
