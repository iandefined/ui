import { SITE } from "@/shared/constants/site";

import registryManifest from "../../../registry.json";

type RegistryFile = {
  path: string;
  type: string;
  target?: string;
};

export type RegistryBlock = {
  name: string;
  type: "registry:block";
  title: string;
  description?: string;
  categories: string[];
  files: RegistryFile[];
};

export type BlockCategory = {
  name: string;
  title: string;
  totalBlocks: number;
};

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  categories?: string[];
  files?: RegistryFile[];
};

export const BLOCKS_PAGE_TITLE = "Blocks";
export const BLOCKS_PAGE_DESCRIPTION =
  "Browse production-ready registry blocks and copy them directly to your project.";
export const BLOCKS_OG_IMAGE = `${SITE.URL}/og?${new URLSearchParams({
  description: BLOCKS_PAGE_DESCRIPTION,
  title: BLOCKS_PAGE_TITLE,
}).toString()}`;

const categoryTitles: Record<string, string> = {
  sidebar: "Sidebar",
};

const toTitle = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const normalizeBlockCategorySearch = (category?: string) => {
  const normalized = category?.trim().replace(/^\/+|\/+$/g, "");

  return normalized || undefined;
};

const normalizeBlock = (item: RegistryItem): RegistryBlock | null => {
  if (item.type !== "registry:block" || !item.files?.length) {
    return null;
  }

  return {
    name: item.name,
    type: "registry:block",
    title: item.title ?? toTitle(item.name),
    description: item.description,
    categories: item.categories?.length ? item.categories : ["uncategorized"],
    files: item.files,
  };
};

export const registryBlocks = (registryManifest.items as RegistryItem[])
  .map(normalizeBlock)
  .filter((block): block is RegistryBlock => Boolean(block));

export const categorizedBlocks = registryBlocks.reduce<
  Record<string, RegistryBlock[]>
>((acc, block) => {
  for (const category of block.categories) {
    acc[category] ??= [];
    acc[category].push(block);
  }

  return acc;
}, {});

export const blockCategories: BlockCategory[] = Object.entries(
  categorizedBlocks
)
  .map(([name, blocks]) => ({
    name,
    title: categoryTitles[name] ?? toTitle(name),
    totalBlocks: blocks.length,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const allBlockCategory: BlockCategory = {
  name: "all",
  title: "All",
  totalBlocks: registryBlocks.length,
};

export const getBlockCategoryTitle = (category: string) =>
  category === allBlockCategory.name
    ? allBlockCategory.title
    : (blockCategories.find((item) => item.name === category)?.title ??
      toTitle(category));

export const getBlocksForCategory = (category: string) =>
  category === allBlockCategory.name
    ? registryBlocks
    : (categorizedBlocks[category] ?? []);

export const getRegistryBlock = (name: string) =>
  registryBlocks.find((block) => block.name === name) ?? null;
