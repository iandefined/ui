import { ROUTES } from "@/shared/constants/routes";
import type { PageTreeFolder } from "@/shared/lib/page-tree";
import { formatLabelFromSlug } from "@/shared/lib/utils";

export const DOCS_DIR = `content${ROUTES.DOCS}`;

export const EXCLUDED_SECTIONS = new Set<string>();

export const isComponentsFolder = (folder: PageTreeFolder) =>
  folder.$id === "components" || folder.name === "Components";

const TITLE_OVERRIDES: Record<string, string> = {
  json: "JSON",
  "qr-code": "QR Code",
};

export const formatTitleFromSlug = (slug: string): string =>
  TITLE_OVERRIDES[slug] ?? formatLabelFromSlug(slug);

export const docsContentRoute = `${ROUTES.LLMS_MD}${ROUTES.DOCS}`;
export const docsImageRoute = `${ROUTES.OG}${ROUTES.DOCS}`;
