export const FALLBACK_SITE_ORIGIN = "https://tanstartercn.tsu.moe" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    NAME: "tsu!moe",
    TWITTER: "@tsu-moe",
  },
  DESCRIPTION: {
    LONG: "A highly customizable shadcn registry template repository built with TanStack Start. Fork, customize, and deploy free to Cloudflare Workers.",
    SHORT: "Build your own shadcn registry",
  },
  KEYWORDS: [
    "shadcn",
    "shadcn registry",
    "component registry",
    "shadcn components",
    "tanstack start",
    "tailwindcss",
    "npx shadcn add",
  ] as const,
  NAME: "tanstartercn",
  OG_IMAGE: `${baseUrl}/og`,
  REGISTRY: baseUrl,
  TITLE: {
    LONG: "tanstartercn | The Open Source TanStack Start shadcn Registry Template",
    SHORT: "tanstartercn",
  },
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};
