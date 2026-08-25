import type { InferPageType } from "fumadocs-core/source";
import { loader, source as createSource } from "fumadocs-core/source";

import { ROUTES } from "@/shared/constants/routes";
import { docsContentRoute, docsImageRoute } from "@/shared/lib/docs";

type DocsFrontmatter = {
  description?: string;
  icon?: string;
  links?: {
    api?: string;
    doc?: string;
  };
  title?: string;
};

type DocsMeta = {
  collapsible?: boolean;
  defaultOpen?: boolean;
  description?: string;
  icon?: string;
  pages?: string[];
  pagesIndex?: string;
  root?: boolean;
  title?: string;
};

type SourceMetaEntry = {
  data: DocsMeta;
  path: string;
  type: "meta";
};

type SourcePageEntry = {
  data: DocsFrontmatter;
  path: string;
  type: "page";
};

const pages = import.meta.glob("../../../content/docs/**/*.mdx", {
  eager: true,
  import: "frontmatter",
  query: {
    collection: "docs",
    only: "frontmatter",
  },
}) as Record<string, DocsFrontmatter>;

const metas = import.meta.glob("../../../content/docs/**/meta.json", {
  eager: true,
  import: "default",
  query: {
    collection: "docs",
  },
}) as Record<string, DocsMeta>;

const toContentPath = (filePath: string) => {
  const normalized = filePath.replaceAll("\\", "/");
  const marker = "content/docs/";
  const markerIndex = normalized.indexOf(marker);

  if (markerIndex !== -1) {
    return normalized.slice(markerIndex + marker.length);
  }

  return normalized.replace(/^(?:\.\.\/)+content\/docs\//, "");
};

const dirname = (value: string) => {
  const normalized = value.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");

  return index === -1 ? "" : normalized.slice(0, index);
};

const pageSlug = (value: string) =>
  value
    .replaceAll("\\", "/")
    .split("/")
    .at(-1)
    ?.replace(/\.mdx$/, "");

const metaFolder = (value: string) =>
  value.replaceAll("\\", "/").replace(/\/?meta\.json$/, "");

const metaPathForFolder = (folder: string) =>
  folder ? `${folder}/meta.json` : "meta.json";

const sortNavEntries = (values: string[]) =>
  values.toSorted((a, b) => {
    if (a === "index") {
      return -1;
    }
    if (b === "index") {
      return 1;
    }

    return a.localeCompare(b);
  });

const unique = (values: string[]) => Array.from(new Set(values));

const pageEntryIsListed = (entry: string, slug: string) => {
  if (entry === slug) {
    return true;
  }

  const match = entry.match(/\]\(([^)]+)\)$/);
  const href = match?.[1];

  if (!href) {
    return false;
  }

  return href.split("/").filter(Boolean).at(-1) === slug;
};

const appendMissingPages = (
  meta: DocsMeta,
  pagesInFolder: string[],
  foldersInFolder: string[]
): DocsMeta => {
  const existingPages = meta.pages ?? [];
  const missingFolders = foldersInFolder.filter(
    (folder) => !existingPages.some((entry) => pageEntryIsListed(entry, folder))
  );
  const missingPages = pagesInFolder.filter(
    (slug) => !existingPages.some((entry) => pageEntryIsListed(entry, slug))
  );

  if (missingFolders.length === 0 && missingPages.length === 0) {
    return meta;
  }

  return {
    ...meta,
    pages: [
      ...existingPages,
      ...sortNavEntries(unique(missingFolders)),
      ...sortNavEntries(unique(missingPages)),
    ],
  };
};

const getSourceMetas = (): SourceMetaEntry[] => {
  const pagesByFolder = new Map<string, string[]>();
  const foldersByFolder = new Map<string, string[]>();
  const folderPaths = new Set([""]);
  const metaByFolder = new Map(
    Object.entries(metas).map(([path, data]) => [
      metaFolder(toContentPath(path)),
      data,
    ])
  );

  for (const folder of metaByFolder.keys()) {
    folderPaths.add(folder);
  }

  for (const path of Object.keys(pages)) {
    const contentPath = toContentPath(path);
    const folder = dirname(contentPath);
    const slug = pageSlug(contentPath);

    if (!slug) {
      continue;
    }

    folderPaths.add(folder);
    pagesByFolder.set(folder, [...(pagesByFolder.get(folder) ?? []), slug]);

    if (folder) {
      const parent = dirname(folder);
      const child = folder.split("/").at(-1);

      if (child) {
        folderPaths.add(parent);
        foldersByFolder.set(parent, [
          ...(foldersByFolder.get(parent) ?? []),
          child,
        ]);
      }
    }
  }

  return Array.from(folderPaths)
    .toSorted()
    .map((folder) => {
      const data = metaByFolder.get(folder) ?? {};
      const folderTitle =
        folder === "(root)" && !data.title ? "Get Started" : data.title;
      const contentPath = metaPathForFolder(folder);

      return {
        data: appendMissingPages(
          {
            ...data,
            ...(folder === "" ? { root: true } : {}),
            ...(folderTitle ? { title: folderTitle } : {}),
          },
          pagesByFolder.get(folder) ?? [],
          foldersByFolder.get(folder) ?? []
        ),
        path: contentPath,
        type: "meta",
      };
    });
};

const getSourcePages = (): SourcePageEntry[] =>
  Object.entries(pages).map(([path, data]) => ({
    data,
    path: toContentPath(path),
    type: "page" as const,
  }));

export const source = loader({
  baseUrl: ROUTES.DOCS,
  source: createSource({
    metas: getSourceMetas(),
    pages: getSourcePages(),
  }),
});

export const getPageImage = (page: InferPageType<typeof source>) => {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join("/")}`,
  };
};

export const getPageMarkdownUrl = (page: InferPageType<typeof source>) => {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
};
