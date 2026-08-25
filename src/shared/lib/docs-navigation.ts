import type { ReactNode } from "react";

import { ROUTES } from "@/shared/constants/routes";
import type { PageTreeFolder, PageTreePage } from "@/shared/lib/page-tree";
import {
  getAllPagesFromFolder,
  type PageTreeRoot,
} from "@/shared/lib/page-tree";

export type DocsNavigationGroup = {
  id: string;
  label: ReactNode;
  pages: PageTreePage[];
};

const folderId = (folder: PageTreeFolder) => folder.$id ?? String(folder.name);

const makeGroup = (
  id: string,
  label: ReactNode,
  pages: PageTreePage[]
): DocsNavigationGroup | null =>
  pages.length > 0 ? { id, label, pages } : null;

const removeFolderIndexPage = (folder: PageTreeFolder) =>
  getAllPagesFromFolder(folder).filter(
    (page) =>
      page.url !== folder.index?.url && page.url !== ROUTES.DOCS_COMPONENTS
  );

export const getDocsNavigationGroups = (
  tree: PageTreeRoot
): DocsNavigationGroup[] => {
  return tree.children
    .map((node, index) => {
      if (node.type === "page") {
        return makeGroup(`page-${index}`, null, [node]);
      }

      if (node.type === "folder") {
        return makeGroup(
          folderId(node),
          node.name,
          removeFolderIndexPage(node)
        );
      }

      return null;
    })
    .filter((group): group is DocsNavigationGroup => Boolean(group));
};
