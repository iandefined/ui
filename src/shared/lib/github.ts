import { GITHUB } from "@/shared/constants/links";

const CACHE_TTL_MS = 86_400_000;

let stargazerCountCache: { expires: number; value: number } | null = null;

const isFresh = (entry: { expires: number } | null) =>
  entry !== null && entry.expires > Date.now();

export const getStargazerCount = async () => {
  const cached = stargazerCountCache;
  if (cached && isFresh(cached)) {
    return cached.value;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB.org}/${GITHUB.repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      return stargazerCountCache?.value ?? 0;
    }

    const json = (await response.json()) as { stargazers_count?: number };
    const value = Number(json.stargazers_count) || 0;
    stargazerCountCache = { expires: Date.now() + CACHE_TTL_MS, value };
    return value;
  } catch {
    return stargazerCountCache?.value ?? 0;
  }
};
