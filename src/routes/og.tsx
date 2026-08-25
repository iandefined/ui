import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "@/shared/constants/site";
import { createOgImageResponse } from "@/shared/lib/seo/og-image";

export const Route = createFileRoute("/og")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const { searchParams } = new URL(request.url);

        return createOgImageResponse({
          description: searchParams.get("description") ?? SITE.DESCRIPTION.LONG,
          title: searchParams.get("title") ?? SITE.TITLE.SHORT,
        });
      },
    },
  },
} as any);
