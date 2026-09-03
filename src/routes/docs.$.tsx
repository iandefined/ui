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
  head: ({ params }) => docsPageHead(slugsFromSplat(params._splat)),
  loader: async ({ params }) => {
    if (params._splat === "styling") {
      throw redirect({ href: "/docs/theming" });
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
});

function DocsSplatRoute() {
  const data = Route.useLoaderData();

  return <DocsPage data={data} />;
}
