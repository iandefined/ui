import { createFileRoute } from "@tanstack/react-router";

import { createOgImageResponse } from "@/shared/lib/seo/og-image";
import { source } from "@/shared/lib/source";

export const Route = createFileRoute("/og/docs/$")({
  server: {
    handlers: {
      GET: async ({ params }: { params: { _splat?: string } }) => {
        const slugs = params._splat?.split("/").filter(Boolean) ?? [];
        const imageFile = slugs.at(-1);
        const pageSlugs =
          imageFile === "image.png" ? slugs.slice(0, -1) : slugs;
        const page = source.getPage(pageSlugs);

        if (!page) {
          return new Response("Not found", { status: 404 });
        }

        return createOgImageResponse({
          description: page.data.description,
          title: page.data.title,
        });
      },
    },
  },
} as any);
