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
    NAME: "Ian de Jesus",
    TWITTER: "@iandefined",
  },
  DESCRIPTION: {
    LONG: "Thoughtful components for product engineers.",
    SHORT: "Components for product engineers",
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
    LONG: "Thoughtful Component Registry for Product Engineers | iandefined/ui",
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
