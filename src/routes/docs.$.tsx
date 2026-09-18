import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import {
  DocsPage,
  docsPageExists,
  docsPageHead,
  loadDocsPage,
  slugsFromSplat,
} from "./-docs-page";

export const Route = createFileRoute("/docs/$")({
  component: DocsSplatRoute,
  loader: async ({ params }) => {
    if (params._splat === "styling") {
      throw redirect({ href: "/docs/theming" });
    }

    if (params._splat === "overlays") {
      throw redirect({ href: "/docs/pitfalls" });
    }

    const slugs = slugsFromSplat(params._splat);

    if (!docsPageExists(slugs)) {
      throw notFound();
    }

    const data = await loadDocsPage(slugs);
    if (!data) {
      throw notFound();
    }

    return data;
  },
  head: ({ params }) => docsPageHead(slugsFromSplat(params._splat)),
});

function DocsSplatRoute() {
  const data = Route.useLoaderData();

  return <DocsPage data={data} />;
}
