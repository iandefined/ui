export type IconVariant = "duotone" | "outline";

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
}

export interface CategoryInfo {
  id: "all" | IconCategory;
  label: string;
  count: number;
}

// Vite static raw SVG imports
const svgModules = import.meta.glob("./duotone/*.svg", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

export const ICON_CATALOG: readonly IconCatalogItem[] = [
  {
    name: "house",
    title: "House",
    category: "navigation",
    tags: ["home", "dashboard", "navigation", "building"],
    variant: "duotone",
  },
  {
    name: "map-pin",
    title: "Map Pin",
    category: "navigation",
    tags: ["location", "place", "navigation", "marker"],
    variant: "duotone",
  },
  {
    name: "bell",
    title: "Bell",
    category: "notifications",
    tags: ["alert", "notification", "reminder", "alarm"],
    variant: "duotone",
  },
  {
    name: "folder",
    title: "Folder",
    category: "files",
    tags: ["file", "directory", "storage", "archive"],
    variant: "duotone",
  },
  {
    name: "mail",
    title: "Mail",
    category: "communication",
    tags: ["email", "message", "communication", "inbox", "envelope"],
    variant: "duotone",
  },
] as const;

export function getIconSvg(
  name: string,
  variant: IconVariant = "duotone",
  size = 24
): string {
  const entry = Object.entries(svgModules).find(([path]) =>
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
  items: readonly IconCatalogItem[] = ICON_CATALOG
): CategoryInfo[] {
  const counts: Record<IconCategory, number> = {
    navigation: 0,
    notifications: 0,
    files: 0,
    communication: 0,
  };

  for (const item of items) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }

  return [
    { id: "all", label: CATEGORY_LABELS.all, count: items.length },
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
