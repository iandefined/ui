export type IconVariant = "duotone" | "outline" | "filled";
export type IconVariantFilter = "all" | IconVariant;

export type IconCategory =
  | "navigation"
  | "notifications"
  | "files"
  | "communication";

export interface IconCatalogItem {
  name: string;
  title: string;
  category: IconCategory;
  tags: string[];
  variant: IconVariant;
  variants: readonly IconVariant[];
}

export interface CategoryInfo {
  id: "all" | IconCategory;
  label: string;
  count: number;
}

// Vite static raw SVG imports
const duotoneSvgModules = import.meta.glob("./duotone/*.svg", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;
const filledSvgModules = import.meta.glob("./filled/*.svg", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const svgModules: Record<"duotone" | "filled", Record<string, string>> = {
  duotone: duotoneSvgModules,
  filled: filledSvgModules,
};

const VARIANT_ORDER: readonly IconVariant[] = ["outline", "duotone", "filled"];

const variantModules: Record<IconVariant, Record<string, string>> = {
  outline: duotoneSvgModules,
  duotone: duotoneSvgModules,
  filled: filledSvgModules,
};

function hasIconSvg(modules: Record<string, string>, name: string) {
  return Object.keys(modules).some((path) => path.endsWith(`/${name}.svg`));
}

export function getIconVariants(name: string): readonly IconVariant[] {
  return VARIANT_ORDER.filter((variant) =>
    hasIconSvg(variantModules[variant], name)
  );
}

function getDefaultIconVariant(name: string): IconVariant {
  const variants = getIconVariants(name);
  return variants.includes("duotone") ? "duotone" : (variants[0] ?? "outline");
}

function getIconVariantCount(
  item: IconCatalogItem,
  variant: IconVariantFilter
) {
  if (variant === "all") {
    // The All filter represents the catalog-visible Duotone and Filled entries.
    return item.variants.filter((itemVariant) => itemVariant !== "outline")
      .length;
  }

  return item.variants.includes(variant) ? 1 : 0;
}

export const ICON_CATALOG: readonly IconCatalogItem[] = [
  {
    name: "house",
    title: "House",
    category: "navigation",
    tags: ["home", "dashboard", "navigation", "building"],
    variant: getDefaultIconVariant("house"),
    variants: getIconVariants("house"),
  },
  {
    name: "map-pin",
    title: "Map Pin",
    category: "navigation",
    tags: ["location", "place", "navigation", "marker"],
    variant: getDefaultIconVariant("map-pin"),
    variants: getIconVariants("map-pin"),
  },
  {
    name: "bell",
    title: "Bell",
    category: "notifications",
    tags: ["alert", "notification", "reminder", "alarm"],
    variant: getDefaultIconVariant("bell"),
    variants: getIconVariants("bell"),
  },
  {
    name: "folder",
    title: "Folder",
    category: "files",
    tags: ["file", "directory", "storage", "archive"],
    variant: getDefaultIconVariant("folder"),
    variants: getIconVariants("folder"),
  },
  {
    name: "mail",
    title: "Mail",
    category: "communication",
    tags: ["email", "message", "communication", "inbox", "envelope"],
    variant: getDefaultIconVariant("mail"),
    variants: getIconVariants("mail"),
  },
] as const;

export function getIconSvg(
  name: string,
  variant: IconVariant = "duotone",
  size = 24
): string {
  const sourceVariant = variant === "outline" ? "duotone" : variant;
  const entry = Object.entries(svgModules[sourceVariant]).find(([path]) =>
    path.endsWith(`/${name}.svg`)
  );
  if (!entry) {
    throw new Error(`Icon SVG for "${name}" not found in catalog.`);
  }

  let svg = entry[1].trim();

  if (variant === "outline") {
    // Strip the closed tint geometry (<path ... fill-opacity="0.33" ... /> or <rect ... />)
    svg = svg.replace(
      /<(path|rect|circle|polygon)[^>]*fill-opacity=[^>]*\/>\s*/gi,
      ""
    );
  }

  if (size !== 24 && size > 0) {
    svg = svg
      .replace(/width="[0-9]+"/, `width="${size}"`)
      .replace(/height="[0-9]+"/, `height="${size}"`);
  }

  return svg;
}

export const CATEGORY_LABELS: Record<"all" | IconCategory, string> = {
  all: "All",
  navigation: "Navigation",
  notifications: "Notifications",
  files: "Files",
  communication: "Communication",
};

export function getCategoryCounts(
  items: readonly IconCatalogItem[] = ICON_CATALOG,
  variant: IconVariantFilter = "all"
): CategoryInfo[] {
  const counts: Record<IconCategory, number> = {
    navigation: 0,
    notifications: 0,
    files: 0,
    communication: 0,
  };
  let total = 0;

  for (const item of items) {
    const itemCount = getIconVariantCount(item, variant);
    counts[item.category] = (counts[item.category] || 0) + itemCount;
    total += itemCount;
  }

  return [
    { id: "all", label: CATEGORY_LABELS.all, count: total },
    {
      id: "navigation",
      label: CATEGORY_LABELS.navigation,
      count: counts.navigation,
    },
    {
      id: "notifications",
      label: CATEGORY_LABELS.notifications,
      count: counts.notifications,
    },
    { id: "files", label: CATEGORY_LABELS.files, count: counts.files },
    {
      id: "communication",
      label: CATEGORY_LABELS.communication,
      count: counts.communication,
    },
  ];
}

export function getIconCount(
  items: readonly IconCatalogItem[] = ICON_CATALOG,
  variant: IconVariantFilter = "all"
): number {
  return items.reduce(
    (total, item) => total + getIconVariantCount(item, variant),
    0
  );
}
