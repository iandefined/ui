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
  const groups: DocsNavigationGroup[] = [];

  for (const node of tree.children) {
    if (node.type === "page") {
      const group = makeGroup(node.$id ?? node.url, null, [node]);
      if (group) {
        groups.push(group);
      }
      continue;
    }

    if (node.type === "folder") {
      let currentGroupLabel: ReactNode = node.name;
      let currentGroupId = folderId(node);
      let currentPages: PageTreePage[] = [];

      for (const child of node.children) {
        if (child.type === "separator") {
          if (currentPages.length > 0) {
            const group = makeGroup(
              currentGroupId,
              currentGroupLabel,
              currentPages
            );
            if (group) {
              groups.push(group);
            }
            currentPages = [];
          }
          currentGroupLabel = child.name;
          currentGroupId = `${folderId(node)}-${String(child.name).toLowerCase().replace(/\s+/g, "-")}`;
        } else if (child.type === "page") {
          if (
            child.url !== node.index?.url &&
            child.url !== ROUTES.DOCS_COMPONENTS
          ) {
            currentPages.push(child);
          }
        } else if (child.type === "folder") {
          currentPages.push(...removeFolderIndexPage(child));
        }
      }

      if (currentPages.length > 0) {
        const group = makeGroup(
          currentGroupId,
          currentGroupLabel,
          currentPages
        );
        if (group) {
          groups.push(group);
        }
      }
    }
  }

  return groups;
};
