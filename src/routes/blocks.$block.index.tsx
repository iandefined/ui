import { createFileRoute, notFound } from "@tanstack/react-router";

import { AppLayout } from "@/app-layout";
import { BlockShowcase } from "@/shared/components/blocks/block-showcase";
import {
  BLOCKS_OG_IMAGE,
  BLOCKS_PAGE_DESCRIPTION,
  BLOCKS_PAGE_TITLE,
  getRegistryBlock,
} from "@/shared/lib/blocks";
import { createPageHead } from "@/shared/lib/seo/metadata";

export const Route = createFileRoute("/blocks/$block/")({
  component: BlockRoute,
  head: ({ params }) => {
    const block = getRegistryBlock(params.block);

    return createPageHead({
      description:
        block?.description ??
        "Preview and install an available block from this registry.",
      ogDescription: BLOCKS_PAGE_DESCRIPTION,
      ogImage: BLOCKS_OG_IMAGE,
      ogImageAlt: BLOCKS_PAGE_TITLE,
      ogTitle: BLOCKS_PAGE_TITLE,
      path: `/blocks/${params.block}`,
      title: block?.title ?? "Block",
    });
  },
  loader: ({ params }) => {
    const block = getRegistryBlock(params.block);

    if (!block) {
      throw notFound();
    }

    return block;
  },
});

function BlockRoute() {
  const { block: blockName } = Route.useParams();
  const block = getRegistryBlock(blockName);

  if (!block) {
    return null;
  }

  return (
    <AppLayout>
      <div className="container py-10 md:py-14">
        <BlockShowcase block={block} showTitle />
      </div>
    </AppLayout>
  );
}
