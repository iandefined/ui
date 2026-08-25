import { LINK } from "@/shared/constants/links";
import { ROUTES } from "@/shared/constants/routes";
import { META_THEME_COLORS, SITE } from "@/shared/constants/site";

interface CreatePageMetadataOptions {
  description?: string;
  noIndex?: boolean;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogTitle?: string;
  ogType?: "article" | "website";
  path: string;
  title: string;
}

type HeadMeta =
  | { charSet: string }
  | { content: string; name: string }
  | { content: string; property: string }
  | { title: string };

type HeadLink = {
  href: string;
  rel: string;
  sizes?: string;
  type?: string;
  media?: string;
};

export interface PageHead {
  links?: HeadLink[];
  meta: HeadMeta[];
}

const ogImageSize = {
  height: 630,
  width: 1200,
} as const;

const normalizePath = (path: string) =>
  path.startsWith(ROUTES.HOME) ? path : `${ROUTES.HOME}${path}`;

export const createPageHead = ({
  description,
  noIndex = false,
  ogDescription,
  ogImage,
  ogImageAlt,
  ogTitle,
  ogType = "website",
  path,
  title,
}: CreatePageMetadataOptions): PageHead => {
  const canonical = normalizePath(path);
  const resolvedOgImage = ogImage ?? SITE.OG_IMAGE;
  const isRootPage = canonical === ROUTES.HOME && title === SITE.NAME;
  const resolvedTitle = isRootPage
    ? SITE.TITLE.LONG
    : `${ogTitle ?? title} | ${SITE.TITLE.SHORT}`;
  const fullTitle = isRootPage
    ? SITE.TITLE.LONG
    : `${title} | ${SITE.TITLE.SHORT}`;
  const resolvedDescription = isRootPage
    ? SITE.DESCRIPTION.LONG
    : (ogDescription ?? description ?? SITE.DESCRIPTION.LONG);

  return {
    links: [
      { href: canonical, rel: "canonical" },
      ...(canonical === ROUTES.DOCS || canonical.startsWith(`${ROUTES.DOCS}/`)
        ? [{ href: `${canonical}.md`, rel: "alternate", type: "text/markdown" }]
        : []),
    ],
    meta: [
      { title: fullTitle },
      { content: resolvedDescription, name: "description" },
      { content: resolvedTitle, property: "og:title" },
      { content: resolvedDescription, property: "og:description" },
      { content: `${SITE.URL}${canonical}`, property: "og:url" },
      { content: SITE.NAME, property: "og:site_name" },
      { content: "en_US", property: "og:locale" },
      { content: ogType, property: "og:type" },
      { content: resolvedOgImage, property: "og:image" },
      { content: ogImageAlt ?? title, property: "og:image:alt" },
      { content: String(ogImageSize.width), property: "og:image:width" },
      { content: String(ogImageSize.height), property: "og:image:height" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: SITE.AUTHOR.TWITTER, name: "twitter:creator" },
      { content: SITE.AUTHOR.TWITTER, name: "twitter:site" },
      { content: resolvedTitle, name: "twitter:title" },
      { content: resolvedDescription, name: "twitter:description" },
      { content: resolvedOgImage, name: "twitter:image" },
      ...(noIndex ? [{ content: "noindex,nofollow", name: "robots" }] : []),
    ],
  };
};

export const rootHead: PageHead = {
  links: [
    { href: ROUTES.HOME, rel: "canonical" },
    {
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
      type: "image/png",
    },
    { href: "/favicon.ico", rel: "icon", sizes: "32x32" },
    {
      href: "/favicon-96x96.png",
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
    },
    {
      href: "/favicon.svg",
      media: "(prefers-color-scheme: light)",
      rel: "icon",
      sizes: "any",
      type: "image/svg+xml",
    },
    {
      href: "/favicon-dark.svg",
      media: "(prefers-color-scheme: dark)",
      rel: "icon",
      sizes: "any",
      type: "image/svg+xml",
    },
    { href: ROUTES.MANIFEST, rel: "manifest" },
  ],
  meta: [
    { charSet: "utf-8" },
    { content: "width=device-width, initial-scale=1", name: "viewport" },
    { title: SITE.TITLE.LONG },
    { content: SITE.DESCRIPTION.LONG, name: "description" },
    { content: SITE.NAME, name: "application-name" },
    { content: SITE.AUTHOR.NAME, name: "author" },
    { content: SITE.KEYWORDS.join(", "), name: "keywords" },
    { content: META_THEME_COLORS.light, name: "theme-color" },
    { content: SITE.TITLE.LONG, property: "og:title" },
    { content: SITE.DESCRIPTION.LONG, property: "og:description" },
    { content: SITE.URL, property: "og:url" },
    { content: SITE.NAME, property: "og:site_name" },
    { content: "en_US", property: "og:locale" },
    { content: "website", property: "og:type" },
    { content: SITE.OG_IMAGE, property: "og:image" },
    { content: String(ogImageSize.width), property: "og:image:width" },
    { content: String(ogImageSize.height), property: "og:image:height" },
    { content: "summary_large_image", name: "twitter:card" },
    { content: SITE.AUTHOR.TWITTER, name: "twitter:creator" },
    { content: SITE.AUTHOR.TWITTER, name: "twitter:site" },
    { content: SITE.TITLE.LONG, name: "twitter:title" },
    { content: SITE.DESCRIPTION.LONG, name: "twitter:description" },
    { content: SITE.OG_IMAGE, name: "twitter:image" },
    { content: LINK.PORTFOLIO, name: "creator" },
  ],
};
