import { createFileRoute, notFound } from "@tanstack/react-router";

import { getRegistryBlock } from "@/shared/lib/blocks";
import { getRegistryComponent } from "@/shared/lib/registry";

export const Route = createFileRoute("/blocks/$block/preview")({
  component: BlockPreviewRoute,
  loader: ({ params }) => {
    const block = getRegistryBlock(params.block);

    if (!block) {
      throw notFound();
    }

    return block;
  },
});

function BlockPreviewRoute() {
  const block = Route.useLoaderData();
  const Component = getRegistryComponent(block.name);

  if (!Component) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background p-6 text-foreground">
        <p className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
          Block {block.name} not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background text-foreground">
      <Component />
    </main>
  );
}
