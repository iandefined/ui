import { createFileRoute } from "@tanstack/react-router";

import llmsText from "@/shared/generated/llms.txt?raw";

type AssetFetcher = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

const textResponse = () =>
  new Response(llmsText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });

export const Route = createFileRoute("/llms.txt")({
  preload: false,
  server: {
    handlers: {
      GET: async (context: {
        request: Request;
        env?: { ASSETS?: AssetFetcher };
      }) => {
        const assets = (
          context as typeof context & { env?: { ASSETS?: AssetFetcher } }
        ).env?.ASSETS;

        if (!assets) {
          return textResponse();
        }

        const url = new URL(context.request.url);
        url.pathname = "/llms.txt";
        url.search = "";

        const assetResponse = await assets.fetch(url);

        return assetResponse.ok ? assetResponse : textResponse();
      },
    },
  },
} as any);
