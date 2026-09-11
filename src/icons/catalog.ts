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
  {
    name: "chevron-right",
    title: "Chevron Right",
    category: "navigation",
    tags: ["arrow", "right", "next", "chevron", "forward"],
    variant: getDefaultIconVariant("chevron-right"),
    variants: getIconVariants("chevron-right"),
  },
  {
    name: "chevron-down",
    title: "Chevron Down",
    category: "navigation",
    tags: ["arrow", "down", "expand", "chevron", "dropdown", "bottom"],
    variant: getDefaultIconVariant("chevron-down"),
    variants: getIconVariants("chevron-down"),
  },
  {
    name: "check",
    title: "Check",
    category: "notifications",
    tags: ["done", "confirm", "tick", "success", "verify", "ok"],
    variant: getDefaultIconVariant("check"),
    variants: getIconVariants("check"),
  },
  {
    name: "x",
    title: "X",
    category: "notifications",
    tags: ["close", "delete", "remove", "cancel", "clear", "error"],
    variant: getDefaultIconVariant("x"),
    variants: getIconVariants("x"),
  },
  {
    name: "plus",
    title: "Plus",
    category: "files",
    tags: ["add", "new", "create", "plus", "more"],
    variant: getDefaultIconVariant("plus"),
    variants: getIconVariants("plus"),
  },
  {
    name: "search",
    title: "Search",
    category: "navigation",
    tags: ["find", "magnifier", "magnifying-glass", "lookup", "explore", "query"],
    variant: getDefaultIconVariant("search"),
    variants: getIconVariants("search"),
  },
  {
    name: "loader-circle",
    title: "Loader Circle",
    category: "notifications",
    tags: ["loading", "spinner", "progress", "waiting", "status", "loader"],
    variant: getDefaultIconVariant("loader-circle"),
    variants: getIconVariants("loader-circle"),
  },
  {
    name: "triangle-alert",
    title: "Triangle Alert",
    category: "notifications",
    tags: ["warning", "alert", "danger", "exclamation", "caution"],
    variant: getDefaultIconVariant("triangle-alert"),
    variants: getIconVariants("triangle-alert"),
  },
  {
    name: "info",
    title: "Info",
    category: "notifications",
    tags: ["information", "help", "details", "about", "hint"],
    variant: getDefaultIconVariant("info"),
    variants: getIconVariants("info"),
  },
  {
    name: "arrow-right",
    title: "Arrow Right",
    category: "navigation",
    tags: ["arrow", "right", "next", "direction", "forward"],
    variant: getDefaultIconVariant("arrow-right"),
    variants: getIconVariants("arrow-right"),
  },
  {
    name: "arrow-big-down-dash",
    title: "Arrow Big Down Dash",
    category: "navigation",
    tags: ["navigation","arrow","big","down","dash","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-down-dash"),
    variants: getIconVariants("arrow-big-down-dash"),
  },
  {
    name: "arrow-big-down",
    title: "Arrow Big Down",
    category: "navigation",
    tags: ["navigation","arrow","big","down","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-down"),
    variants: getIconVariants("arrow-big-down"),
  },
  {
    name: "arrow-big-left-dash",
    title: "Arrow Big Left Dash",
    category: "navigation",
    tags: ["navigation","arrow","big","left","dash","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-left-dash"),
    variants: getIconVariants("arrow-big-left-dash"),
  },
  {
    name: "arrow-big-left",
    title: "Arrow Big Left",
    category: "navigation",
    tags: ["navigation","arrow","big","left","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-left"),
    variants: getIconVariants("arrow-big-left"),
  },
  {
    name: "arrow-big-right-dash",
    title: "Arrow Big Right Dash",
    category: "navigation",
    tags: ["navigation","arrow","big","right","dash","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-right-dash"),
    variants: getIconVariants("arrow-big-right-dash"),
  },
  {
    name: "arrow-big-right",
    title: "Arrow Big Right",
    category: "navigation",
    tags: ["navigation","arrow","big","right","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-right"),
    variants: getIconVariants("arrow-big-right"),
  },
  {
    name: "arrow-big-up-dash",
    title: "Arrow Big Up Dash",
    category: "navigation",
    tags: ["navigation","arrow","big","up","dash","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-up-dash"),
    variants: getIconVariants("arrow-big-up-dash"),
  },
  {
    name: "arrow-big-up",
    title: "Arrow Big Up",
    category: "navigation",
    tags: ["navigation","arrow","big","up","direction","directional"],
    variant: getDefaultIconVariant("arrow-big-up"),
    variants: getIconVariants("arrow-big-up"),
  },
  {
    name: "arrow-down-0-1",
    title: "Arrow Down 0 1",
    category: "navigation",
    tags: ["navigation","arrow","down","0","1","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-0-1"),
    variants: getIconVariants("arrow-down-0-1"),
  },
  {
    name: "arrow-down-1-0",
    title: "Arrow Down 1 0",
    category: "navigation",
    tags: ["navigation","arrow","down","1","0","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-1-0"),
    variants: getIconVariants("arrow-down-1-0"),
  },
  {
    name: "arrow-down-a-z",
    title: "Arrow Down A Z",
    category: "navigation",
    tags: ["navigation","arrow","down","a","z","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-a-z"),
    variants: getIconVariants("arrow-down-a-z"),
  },
  {
    name: "arrow-down-from-line",
    title: "Arrow Down From Line",
    category: "navigation",
    tags: ["navigation","arrow","down","from","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-from-line"),
    variants: getIconVariants("arrow-down-from-line"),
  },
  {
    name: "arrow-down-left",
    title: "Arrow Down Left",
    category: "navigation",
    tags: ["navigation","arrow","down","left","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-left"),
    variants: getIconVariants("arrow-down-left"),
  },
  {
    name: "arrow-down-narrow-wide",
    title: "Arrow Down Narrow Wide",
    category: "navigation",
    tags: ["navigation","arrow","down","narrow","wide","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-narrow-wide"),
    variants: getIconVariants("arrow-down-narrow-wide"),
  },
  {
    name: "arrow-down-right",
    title: "Arrow Down Right",
    category: "navigation",
    tags: ["navigation","arrow","down","right","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-right"),
    variants: getIconVariants("arrow-down-right"),
  },
  {
    name: "arrow-down-to-dot",
    title: "Arrow Down To Dot",
    category: "navigation",
    tags: ["navigation","arrow","down","to","dot","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-to-dot"),
    variants: getIconVariants("arrow-down-to-dot"),
  },
  {
    name: "arrow-down-to-line",
    title: "Arrow Down To Line",
    category: "navigation",
    tags: ["navigation","arrow","down","to","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-to-line"),
    variants: getIconVariants("arrow-down-to-line"),
  },
  {
    name: "arrow-down-up",
    title: "Arrow Down Up",
    category: "navigation",
    tags: ["navigation","arrow","down","up","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-up"),
    variants: getIconVariants("arrow-down-up"),
  },
  {
    name: "arrow-down-wide-narrow",
    title: "Arrow Down Wide Narrow",
    category: "navigation",
    tags: ["navigation","arrow","down","wide","narrow","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-wide-narrow"),
    variants: getIconVariants("arrow-down-wide-narrow"),
  },
  {
    name: "arrow-down-z-a",
    title: "Arrow Down Z A",
    category: "navigation",
    tags: ["navigation","arrow","down","z","a","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-z-a"),
    variants: getIconVariants("arrow-down-z-a"),
  },
  {
    name: "arrow-down",
    title: "Arrow Down",
    category: "navigation",
    tags: ["navigation","arrow","down","direction","directional"],
    variant: getDefaultIconVariant("arrow-down"),
    variants: getIconVariants("arrow-down"),
  },
  {
    name: "arrow-left-from-line",
    title: "Arrow Left From Line",
    category: "navigation",
    tags: ["navigation","arrow","left","from","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-left-from-line"),
    variants: getIconVariants("arrow-left-from-line"),
  },
  {
    name: "arrow-left-right",
    title: "Arrow Left Right",
    category: "navigation",
    tags: ["navigation","arrow","left","right","direction","directional"],
    variant: getDefaultIconVariant("arrow-left-right"),
    variants: getIconVariants("arrow-left-right"),
  },
  {
    name: "arrow-left-to-line",
    title: "Arrow Left To Line",
    category: "navigation",
    tags: ["navigation","arrow","left","to","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-left-to-line"),
    variants: getIconVariants("arrow-left-to-line"),
  },
  {
    name: "arrow-left",
    title: "Arrow Left",
    category: "navigation",
    tags: ["navigation","arrow","left","direction","directional"],
    variant: getDefaultIconVariant("arrow-left"),
    variants: getIconVariants("arrow-left"),
  },
  {
    name: "arrow-right-from-line",
    title: "Arrow Right From Line",
    category: "navigation",
    tags: ["navigation","arrow","right","from","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-right-from-line"),
    variants: getIconVariants("arrow-right-from-line"),
  },
  {
    name: "arrow-right-left",
    title: "Arrow Right Left",
    category: "navigation",
    tags: ["navigation","arrow","right","left","direction","directional"],
    variant: getDefaultIconVariant("arrow-right-left"),
    variants: getIconVariants("arrow-right-left"),
  },
  {
    name: "arrow-right-to-line",
    title: "Arrow Right To Line",
    category: "navigation",
    tags: ["navigation","arrow","right","to","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-right-to-line"),
    variants: getIconVariants("arrow-right-to-line"),
  },
  {
    name: "arrow-up-0-1",
    title: "Arrow Up 0 1",
    category: "navigation",
    tags: ["navigation","arrow","up","0","1","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-0-1"),
    variants: getIconVariants("arrow-up-0-1"),
  },
  {
    name: "arrow-up-1-0",
    title: "Arrow Up 1 0",
    category: "navigation",
    tags: ["navigation","arrow","up","1","0","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-1-0"),
    variants: getIconVariants("arrow-up-1-0"),
  },
  {
    name: "arrow-up-a-z",
    title: "Arrow Up A Z",
    category: "navigation",
    tags: ["navigation","arrow","up","a","z","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-a-z"),
    variants: getIconVariants("arrow-up-a-z"),
  },
  {
    name: "arrow-up-down",
    title: "Arrow Up Down",
    category: "navigation",
    tags: ["navigation","arrow","up","down","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-down"),
    variants: getIconVariants("arrow-up-down"),
  },
  {
    name: "arrow-up-from-dot",
    title: "Arrow Up From Dot",
    category: "navigation",
    tags: ["navigation","arrow","up","from","dot","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-from-dot"),
    variants: getIconVariants("arrow-up-from-dot"),
  },
  {
    name: "arrow-up-from-line",
    title: "Arrow Up From Line",
    category: "navigation",
    tags: ["navigation","arrow","up","from","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-from-line"),
    variants: getIconVariants("arrow-up-from-line"),
  },
  {
    name: "arrow-up-left",
    title: "Arrow Up Left",
    category: "navigation",
    tags: ["navigation","arrow","up","left","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-left"),
    variants: getIconVariants("arrow-up-left"),
  },
  {
    name: "arrow-up-narrow-wide",
    title: "Arrow Up Narrow Wide",
    category: "navigation",
    tags: ["navigation","arrow","up","narrow","wide","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-narrow-wide"),
    variants: getIconVariants("arrow-up-narrow-wide"),
  },
  {
    name: "arrow-up-right",
    title: "Arrow Up Right",
    category: "navigation",
    tags: ["navigation","arrow","up","right","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-right"),
    variants: getIconVariants("arrow-up-right"),
  },
  {
    name: "arrow-up-to-line",
    title: "Arrow Up To Line",
    category: "navigation",
    tags: ["navigation","arrow","up","to","line","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-to-line"),
    variants: getIconVariants("arrow-up-to-line"),
  },
  {
    name: "arrow-up-wide-narrow",
    title: "Arrow Up Wide Narrow",
    category: "navigation",
    tags: ["navigation","arrow","up","wide","narrow","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-wide-narrow"),
    variants: getIconVariants("arrow-up-wide-narrow"),
  },
  {
    name: "arrow-up-z-a",
    title: "Arrow Up Z A",
    category: "navigation",
    tags: ["navigation","arrow","up","z","a","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-z-a"),
    variants: getIconVariants("arrow-up-z-a"),
  },
  {
    name: "arrow-up",
    title: "Arrow Up",
    category: "navigation",
    tags: ["navigation","arrow","up","direction","directional"],
    variant: getDefaultIconVariant("arrow-up"),
    variants: getIconVariants("arrow-up"),
  },
  {
    name: "arrows-up-from-line",
    title: "Arrows Up From Line",
    category: "navigation",
    tags: ["navigation","arrows","up","from","line","direction","directional"],
    variant: getDefaultIconVariant("arrows-up-from-line"),
    variants: getIconVariants("arrows-up-from-line"),
  },
  {
    name: "chevron-first",
    title: "Chevron First",
    category: "navigation",
    tags: ["navigation","chevron","first","arrow"],
    variant: getDefaultIconVariant("chevron-first"),
    variants: getIconVariants("chevron-first"),
  },
  {
    name: "chevron-last",
    title: "Chevron Last",
    category: "navigation",
    tags: ["navigation","chevron","last","arrow"],
    variant: getDefaultIconVariant("chevron-last"),
    variants: getIconVariants("chevron-last"),
  },
  {
    name: "chevron-left",
    title: "Chevron Left",
    category: "navigation",
    tags: ["navigation","chevron","left","arrow","directional"],
    variant: getDefaultIconVariant("chevron-left"),
    variants: getIconVariants("chevron-left"),
  },
  {
    name: "chevron-up",
    title: "Chevron Up",
    category: "navigation",
    tags: ["navigation","chevron","up","arrow","directional"],
    variant: getDefaultIconVariant("chevron-up"),
    variants: getIconVariants("chevron-up"),
  },
  {
    name: "chevrons-down-up",
    title: "Chevrons Down Up",
    category: "navigation",
    tags: ["navigation","chevrons","down","up","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-down-up"),
    variants: getIconVariants("chevrons-down-up"),
  },
  {
    name: "chevrons-down",
    title: "Chevrons Down",
    category: "navigation",
    tags: ["navigation","chevrons","down","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-down"),
    variants: getIconVariants("chevrons-down"),
  },
  {
    name: "chevrons-left-right-ellipsis",
    title: "Chevrons Left Right Ellipsis",
    category: "navigation",
    tags: ["navigation","chevrons","left","right","ellipsis","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-left-right-ellipsis"),
    variants: getIconVariants("chevrons-left-right-ellipsis"),
  },
  {
    name: "chevrons-left-right",
    title: "Chevrons Left Right",
    category: "navigation",
    tags: ["navigation","chevrons","left","right","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-left-right"),
    variants: getIconVariants("chevrons-left-right"),
  },
  {
    name: "chevrons-left",
    title: "Chevrons Left",
    category: "navigation",
    tags: ["navigation","chevrons","left","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-left"),
    variants: getIconVariants("chevrons-left"),
  },
  {
    name: "chevrons-right-left",
    title: "Chevrons Right Left",
    category: "navigation",
    tags: ["navigation","chevrons","right","left","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-right-left"),
    variants: getIconVariants("chevrons-right-left"),
  },
  {
    name: "chevrons-right",
    title: "Chevrons Right",
    category: "navigation",
    tags: ["navigation","chevrons","right","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-right"),
    variants: getIconVariants("chevrons-right"),
  },
  {
    name: "chevrons-up-down",
    title: "Chevrons Up Down",
    category: "navigation",
    tags: ["navigation","chevrons","up","down","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-up-down"),
    variants: getIconVariants("chevrons-up-down"),
  },
  {
    name: "chevrons-up",
    title: "Chevrons Up",
    category: "navigation",
    tags: ["navigation","chevrons","up","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-up"),
    variants: getIconVariants("chevrons-up"),
  },
  {
    name: "circle-arrow-down",
    title: "Circle Arrow Down",
    category: "navigation",
    tags: ["navigation","circle","arrow","down","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-down"),
    variants: getIconVariants("circle-arrow-down"),
  },
  {
    name: "circle-arrow-left",
    title: "Circle Arrow Left",
    category: "navigation",
    tags: ["navigation","circle","arrow","left","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-left"),
    variants: getIconVariants("circle-arrow-left"),
  },
  {
    name: "circle-arrow-out-down-left",
    title: "Circle Arrow Out Down Left",
    category: "navigation",
    tags: ["navigation","circle","arrow","out","down","left","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-down-left"),
    variants: getIconVariants("circle-arrow-out-down-left"),
  },
  {
    name: "circle-arrow-out-down-right",
    title: "Circle Arrow Out Down Right",
    category: "navigation",
    tags: ["navigation","circle","arrow","out","down","right","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-down-right"),
    variants: getIconVariants("circle-arrow-out-down-right"),
  },
  {
    name: "circle-arrow-out-up-left",
    title: "Circle Arrow Out Up Left",
    category: "navigation",
    tags: ["navigation","circle","arrow","out","up","left","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-up-left"),
    variants: getIconVariants("circle-arrow-out-up-left"),
  },
  {
    name: "circle-arrow-out-up-right",
    title: "Circle Arrow Out Up Right",
    category: "navigation",
    tags: ["navigation","circle","arrow","out","up","right","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-up-right"),
    variants: getIconVariants("circle-arrow-out-up-right"),
  },
  {
    name: "circle-arrow-right",
    title: "Circle Arrow Right",
    category: "navigation",
    tags: ["navigation","circle","arrow","right","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-right"),
    variants: getIconVariants("circle-arrow-right"),
  },
  {
    name: "circle-arrow-up",
    title: "Circle Arrow Up",
    category: "navigation",
    tags: ["navigation","circle","arrow","up","direction","directional"],
    variant: getDefaultIconVariant("circle-arrow-up"),
    variants: getIconVariants("circle-arrow-up"),
  },
  {
    name: "circle-chevron-down",
    title: "Circle Chevron Down",
    category: "navigation",
    tags: ["navigation","circle","chevron","down","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-down"),
    variants: getIconVariants("circle-chevron-down"),
  },
  {
    name: "circle-chevron-left",
    title: "Circle Chevron Left",
    category: "navigation",
    tags: ["navigation","circle","chevron","left","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-left"),
    variants: getIconVariants("circle-chevron-left"),
  },
  {
    name: "circle-chevron-right",
    title: "Circle Chevron Right",
    category: "navigation",
    tags: ["navigation","circle","chevron","right","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-right"),
    variants: getIconVariants("circle-chevron-right"),
  },
  {
    name: "circle-chevron-up",
    title: "Circle Chevron Up",
    category: "navigation",
    tags: ["navigation","circle","chevron","up","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-up"),
    variants: getIconVariants("circle-chevron-up"),
  },
  {
    name: "square-arrow-down-left",
    title: "Square Arrow Down Left",
    category: "navigation",
    tags: ["navigation","square","arrow","down","left","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-down-left"),
    variants: getIconVariants("square-arrow-down-left"),
  },
  {
    name: "square-arrow-down-right",
    title: "Square Arrow Down Right",
    category: "navigation",
    tags: ["navigation","square","arrow","down","right","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-down-right"),
    variants: getIconVariants("square-arrow-down-right"),
  },
  {
    name: "square-arrow-down",
    title: "Square Arrow Down",
    category: "navigation",
    tags: ["navigation","square","arrow","down","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-down"),
    variants: getIconVariants("square-arrow-down"),
  },
  {
    name: "square-arrow-left",
    title: "Square Arrow Left",
    category: "navigation",
    tags: ["navigation","square","arrow","left","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-left"),
    variants: getIconVariants("square-arrow-left"),
  },
  {
    name: "square-arrow-out-down-left",
    title: "Square Arrow Out Down Left",
    category: "navigation",
    tags: ["navigation","square","arrow","out","down","left","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-out-down-left"),
    variants: getIconVariants("square-arrow-out-down-left"),
  },
  {
    name: "square-arrow-out-down-right",
    title: "Square Arrow Out Down Right",
    category: "navigation",
    tags: ["navigation","square","arrow","out","down","right","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-out-down-right"),
    variants: getIconVariants("square-arrow-out-down-right"),
  },
  {
    name: "square-arrow-out-up-left",
    title: "Square Arrow Out Up Left",
    category: "navigation",
    tags: ["navigation","square","arrow","out","up","left","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-out-up-left"),
    variants: getIconVariants("square-arrow-out-up-left"),
  },
  {
    name: "square-arrow-out-up-right",
    title: "Square Arrow Out Up Right",
    category: "navigation",
    tags: ["navigation","square","arrow","out","up","right","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-out-up-right"),
    variants: getIconVariants("square-arrow-out-up-right"),
  },
  {
    name: "square-arrow-right-enter",
    title: "Square Arrow Right Enter",
    category: "navigation",
    tags: ["navigation","square","arrow","right","enter","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-right-enter"),
    variants: getIconVariants("square-arrow-right-enter"),
  },
  {
    name: "square-arrow-right-exit",
    title: "Square Arrow Right Exit",
    category: "navigation",
    tags: ["navigation","square","arrow","right","exit","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-right-exit"),
    variants: getIconVariants("square-arrow-right-exit"),
  },
  {
    name: "square-arrow-right",
    title: "Square Arrow Right",
    category: "navigation",
    tags: ["navigation","square","arrow","right","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-right"),
    variants: getIconVariants("square-arrow-right"),
  },
  {
    name: "square-arrow-up-left",
    title: "Square Arrow Up Left",
    category: "navigation",
    tags: ["navigation","square","arrow","up","left","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-up-left"),
    variants: getIconVariants("square-arrow-up-left"),
  },
  {
    name: "square-arrow-up-right",
    title: "Square Arrow Up Right",
    category: "navigation",
    tags: ["navigation","square","arrow","up","right","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-up-right"),
    variants: getIconVariants("square-arrow-up-right"),
  },
  {
    name: "square-arrow-up",
    title: "Square Arrow Up",
    category: "navigation",
    tags: ["navigation","square","arrow","up","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-up"),
    variants: getIconVariants("square-arrow-up"),
  },
  {
    name: "square-chevron-down",
    title: "Square Chevron Down",
    category: "navigation",
    tags: ["navigation","square","chevron","down","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-down"),
    variants: getIconVariants("square-chevron-down"),
  },
  {
    name: "square-chevron-left",
    title: "Square Chevron Left",
    category: "navigation",
    tags: ["navigation","square","chevron","left","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-left"),
    variants: getIconVariants("square-chevron-left"),
  },
  {
    name: "square-chevron-right",
    title: "Square Chevron Right",
    category: "navigation",
    tags: ["navigation","square","chevron","right","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-right"),
    variants: getIconVariants("square-chevron-right"),
  },
  {
    name: "square-chevron-up",
    title: "Square Chevron Up",
    category: "navigation",
    tags: ["navigation","square","chevron","up","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-up"),
    variants: getIconVariants("square-chevron-up"),
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
