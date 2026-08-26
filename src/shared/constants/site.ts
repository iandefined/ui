export const FALLBACK_SITE_ORIGIN = "https://ui.iandefined.com" as const;

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
    LONG: "A utilitarian component registry for product-oriented engineers. ",
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
  NAME: "iandefined/ui",
  OG_IMAGE: `${baseUrl}/og.png`,
  REGISTRY: baseUrl,
  TITLE: {
    LONG: "Utilitarian Component Registry for Product-oriented Engineers | iandefined/ui",
    SHORT: "iandefined/ui",
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
