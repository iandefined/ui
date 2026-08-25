import { createFileRoute } from "@tanstack/react-router";

import { DocsRouteLayout } from "./-docs-layout";

export const Route = createFileRoute("/docs")({
  component: DocsRouteLayout,
});
