import handler from "@tanstack/react-start/server-entry";

type AssetsEnv = {
  ASSETS?: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  };
};

const assetPathPattern =
  /(?:^\/(?:assets|r|llms\.md)\/|^\/\.well-known\/|\/[^/]+\.[^/]+$)/;

const fetchAsset = async (request: Request, env: AssetsEnv) => {
  if (!assetPathPattern.test(new URL(request.url).pathname)) {
    return;
  }

  const response = await env.ASSETS?.fetch(request);

  return response && response.status !== 404 ? response : undefined;
};

export default {
  async fetch(request: Request, env: AssetsEnv) {
    return (await fetchAsset(request, env)) ?? handler.fetch(request);
  },
};
