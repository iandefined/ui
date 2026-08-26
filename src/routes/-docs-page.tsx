import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { isValidElement, Suspense, type ReactNode } from "react";

import { DocsCopyPage } from "@/shared/components/docs-copy-page";
import { DocsKeyboardShortcuts } from "@/shared/components/docs-keyboard-shortcuts";
import { DocsNavLink } from "@/shared/components/docs-nav-link";
import { DocsShareMenu } from "@/shared/components/docs-share-menu";
import { DocsTableOfContents } from "@/shared/components/docs-toc";
import { DocsTocFooter } from "@/shared/components/docs-toc-footer";
import { Link } from "@/shared/components/link";
import { PageTransition } from "@/shared/components/page-transition";
import { Badge } from "@/shared/components/ui/badge";
import { ROUTES } from "@/shared/constants/routes";
import { formatTitleFromSlug } from "@/shared/lib/docs";
import {
  docsContentLoader,
  preloadDocsComponentSources,
} from "@/shared/lib/docs-content";
import { BreadcrumbJsonLd } from "@/shared/lib/seo/json-ld";
import { createPageHead } from "@/shared/lib/seo/metadata";
import { getPageImage, getPageMarkdownUrl, source } from "@/shared/lib/source";
import { absoluteUrl } from "@/shared/lib/utils";

export const slugsFromSplat = (splat?: string) =>
  splat?.split("/").filter(Boolean) ?? [];

export const docsPageExists = (slugs: string[]) =>
  Boolean(source.getPage(slugs));

export const docsPageHead = (slugs: string[]) => {
  const page = source.getPage(slugs);

  if (!page) {
    return createPageHead({
      noIndex: true,
      path: `${ROUTES.DOCS}/${slugs.join("/")}`,
      title: "Documentation not found",
    });
  }

  const doc = page.data;

  return createPageHead({
    description: doc.description,
    // Social crawlers fetch this URL outside the app, so it must be absolute.
    ogImage: absoluteUrl(getPageImage(page).url),
    ogType: "article",
    path: page.url,
    title: doc.title ?? "Docs",
  });
};

const buildBreadcrumbs = (
  slugs: string[],
  pageTitle: string,
  pageUrl: string
) => {
  const items: { name: string; path: string }[] = [{ name: "Home", path: "/" }];

  if (slugs.length === 0) {
    items.push({ name: pageTitle, path: pageUrl });
    return items;
  }

  items.push({ name: "Docs", path: ROUTES.DOCS });

  let currentPath = ROUTES.DOCS;
  for (let i = 0; i < slugs.length - 1; i += 1) {
    currentPath += `/${slugs[i]}`;
    items.push({ name: formatTitleFromSlug(slugs[i]), path: currentPath });
  }

  items.push({ name: pageTitle, path: pageUrl });
  return items;
};

const navLabelFromUrl = (url: string) =>
  formatTitleFromSlug(url.split("/").filter(Boolean).at(-1) ?? "Docs");

const slugsFromDocsUrl = (url: string) =>
  url
    .replace(/^\/docs\/?/, "")
    .split("/")
    .filter(Boolean);

const getNeighbourDetails = (neighbour: { name: ReactNode; url: string }) => {
  const page = source.getPage(slugsFromDocsUrl(neighbour.url));
  const fallbackTitle = navLabelFromUrl(neighbour.url);

  return {
    description: page?.data.description ?? "",
    name: serializeReactNode(neighbour.name, fallbackTitle),
    title:
      page?.data.title ?? serializeReactNode(neighbour.name, fallbackTitle),
    url: neighbour.url,
  };
};

const serializeReactNode = (node: ReactNode, fallback: string): string => {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    const text = node
      .map((child) => serializeReactNode(child, ""))
      .join("")
      .trim();

    return text || fallback;
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return serializeReactNode(node.props.children, fallback);
  }

  return fallback;
};

export const loadDocsPage = async (slugs: string[]) => {
  const page = source.getPage(slugs);

  if (!page) {
    return null;
  }

  const content = await docsContentLoader.preload(page.path);
  await preloadDocsComponentSources(content);
  const frontmatter = content.frontmatter as {
    description?: string;
    links?: { api?: string; doc?: string };
    title?: string;
  };
  const title = content.frontmatter.title ?? page.data.title ?? "Docs";
  const neighbours = findNeighbour(source.pageTree, page.url);

  return {
    breadcrumbs: buildBreadcrumbs(slugs, title, page.url),
    doc: {
      description: frontmatter.description ?? page.data.description,
      links: frontmatter.links,
      title,
      toc: content.toc.map((item) => ({
        ...item,
        title: serializeReactNode(item.title, navLabelFromUrl(item.url)),
      })),
    },
    markdownUrl: getPageMarkdownUrl(page).url,
    neighbours: {
      next: neighbours.next ? getNeighbourDetails(neighbours.next) : null,
      previous: neighbours.previous
        ? getNeighbourDetails(neighbours.previous)
        : null,
    },
    page: {
      path: page.path,
      url: page.url,
    },
  };
};

export type DocsPageData = Awaited<ReturnType<typeof loadDocsPage>>;

export const DocsPage = ({ data }: { data: DocsPageData | undefined }) => {
  if (!data) {
    return null;
  }

  const { doc, markdownUrl, neighbours, page } = data;
  const showFooterNavigation = page.url !== `${ROUTES.DOCS}/components`;

  return (
    <>
      <BreadcrumbJsonLd items={data.breadcrumbs} />

      <DocsKeyboardShortcuts
        previous={neighbours.previous?.url ?? null}
        next={neighbours.next?.url ?? null}
      />

      <PageTransition>
        <div
          data-slot="docs"
          className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="h-(--top-spacing) shrink-0" />
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                      {doc.title}
                    </h1>
                    <div className="docs-nav flex items-center gap-2">
                      <div className="hidden sm:block">
                        <DocsCopyPage
                          markdownUrl={absoluteUrl(markdownUrl)}
                          url={absoluteUrl(page.url)}
                        />
                      </div>
                      <div className="ml-auto flex gap-2">
                        <div className="hidden sm:block">
                          <DocsShareMenu
                            title={doc.title}
                            url={absoluteUrl(page.url)}
                          />
                        </div>
                        {neighbours.previous && (
                          <DocsNavLink
                            href={neighbours.previous.url}
                            navDirection="back"
                            className="extend-touch-target size-8 md:size-7"
                            tooltip={{
                              icon: <ArrowLeftIcon />,
                              title: "Previous Page",
                            }}
                          >
                            <span className="sr-only">Previous</span>
                          </DocsNavLink>
                        )}
                        {neighbours.next && (
                          <DocsNavLink
                            href={neighbours.next.url}
                            navDirection="forward"
                            className="extend-touch-target size-8 md:size-7"
                            tooltip={{
                              icon: <ArrowRightIcon />,
                              title: "Next Page",
                            }}
                          >
                            <span className="sr-only">Next</span>
                          </DocsNavLink>
                        )}
                      </div>
                    </div>
                  </div>
                  {doc.description && (
                    <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                      {doc.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 sm:hidden">
                    <DocsCopyPage
                      markdownUrl={absoluteUrl(markdownUrl)}
                      url={absoluteUrl(page.url)}
                    />
                    <DocsShareMenu
                      title={doc.title}
                      url={absoluteUrl(page.url)}
                    />
                  </div>
                </div>
                {doc.links ? (
                  <div className="flex items-center space-x-2 pt-4">
                    {doc.links.doc && (
                      <Badge
                        render={(props) => (
                          <a
                            {...props}
                            href={doc.links?.doc}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {props.children}
                          </a>
                        )}
                        variant="secondary"
                      >
                        Docs <ArrowUpRightIcon />
                      </Badge>
                    )}
                    {doc.links.api && (
                      <Badge
                        render={(props) => (
                          <a
                            {...props}
                            href={doc.links?.api}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {props.children}
                          </a>
                        )}
                        variant="secondary"
                      >
                        API Reference <ArrowUpRightIcon />
                      </Badge>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                <Suspense fallback={null}>
                  {docsContentLoader.useContent(data.page.path)}
                </Suspense>
              </div>
            </div>
            {showFooterNavigation && (
              <>
                <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 px-4 pb-8 sm:hidden">
                  {neighbours.previous && (
                    <Link
                      href={neighbours.previous.url}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-ring/50 flex min-w-0 flex-col gap-2 rounded-md p-4 text-left text-sm font-medium shadow-none transition-all outline-none focus-visible:ring-[3px]"
                      aria-label={`Previous page: ${neighbours.previous.title}`}
                    >
                      <span className="inline-flex min-w-0 items-center gap-1.5">
                        <ArrowLeftIcon className="size-4 shrink-0" />
                        <span className="truncate">
                          {neighbours.previous.title}
                        </span>
                      </span>
                      <span className="text-muted-foreground truncate text-sm">
                        {neighbours.previous.description}
                      </span>
                    </Link>
                  )}
                  {neighbours.next && (
                    <Link
                      href={neighbours.next.url}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-ring/50 flex min-w-0 flex-col gap-2 rounded-md p-4 text-end text-sm font-medium shadow-none transition-all outline-none focus-visible:ring-[3px]"
                      aria-label={`Next page: ${neighbours.next.title}`}
                    >
                      <span className="inline-flex min-w-0 flex-row-reverse items-center gap-1.5">
                        <ArrowRightIcon className="size-4 shrink-0" />
                        <span className="truncate">
                          {neighbours.next.title}
                        </span>
                      </span>
                      <span className="text-muted-foreground truncate text-sm">
                        {neighbours.next.description}
                      </span>
                    </Link>
                  )}
                </div>
                <div className="mx-auto hidden w-full max-w-2xl pb-16 items-start gap-2 px-4 sm:flex md:px-0">
                  {neighbours.previous && (
                    <DocsNavLink
                      href={neighbours.previous.url}
                      navDirection="back"
                      size="sm"
                    >
                      {neighbours.previous.name}
                    </DocsNavLink>
                  )}
                  {neighbours.next && (
                    <DocsNavLink
                      href={neighbours.next.url}
                      navDirection="forward"
                      className="ml-auto"
                      size="sm"
                    >
                      {neighbours.next.name}
                    </DocsNavLink>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
            <div className="h-(--top-spacing) shrink-0" />
            {doc.toc?.length ? (
              <div className="no-scrollbar overflow-y-auto mx-8 border-b">
                <DocsTableOfContents toc={doc.toc} />
              </div>
            ) : null}
            <DocsTocFooter docId={page.path} className="mx-8" />
          </div>
        </div>
      </PageTransition>
    </>
  );
};
