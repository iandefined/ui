import { createFileRoute, notFound } from "@tanstack/react-router";

import {
  DocsPage,
  docsPageExists,
  docsPageHead,
  loadDocsPage,
} from "./-docs-page";

export const Route = createFileRoute("/docs/")({
  component: DocsIndexRoute,
  head: () => docsPageHead([]),
  loader: async () => {
    if (!docsPageExists([])) {
      throw notFound();
    }

    const data = await loadDocsPage([]);
    if (!data) {
      throw notFound();
    }

    return data;
  },
});

function DocsIndexRoute() {
  const data = Route.useLoaderData();

  return <DocsPage data={data} />;
}
