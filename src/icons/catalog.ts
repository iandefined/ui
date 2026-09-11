export type IconVariant = "duotone" | "outline" | "filled";
export type IconVariantFilter = "all" | IconVariant;

export const ICON_CATEGORIES = [
  "accessibility",
  "account",
  "animals",
  "arrows",
  "buildings",
  "charts",
  "communication",
  "connectivity",
  "cursors",
  "design",
  "development",
  "devices",
  "emoji",
  "files",
  "finance",
  "food-beverage",
  "gaming",
  "home",
  "layout",
  "mail",
  "math",
  "medical",
  "multimedia",
  "nature",
  "navigation",
  "notifications",
  "people",
  "photography",
  "science",
  "seasons",
  "security",
  "shapes",
  "shopping",
  "social",
  "sports",
  "sustainability",
  "text",
  "time",
  "tools",
  "transportation",
  "travel",
  "weather",
] as const;

export type IconCategory = (typeof ICON_CATEGORIES)[number];

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
    category: "buildings",
    tags: ["house","home","living","building","residence","architecture","dashboard","navigation"],
    variant: getDefaultIconVariant("house"),
    variants: getIconVariants("house"),
  },
    {
    name: "map-pin",
    title: "Map Pin",
    category: "navigation",
    tags: ["map-pin","location","waypoint","marker","drop","place","navigation"],
    variant: getDefaultIconVariant("map-pin"),
    variants: getIconVariants("map-pin"),
  },
    {
    name: "bell",
    title: "Bell",
    category: "account",
    tags: ["bell","alarm","notification","sound","reminder","alert"],
    variant: getDefaultIconVariant("bell"),
    variants: getIconVariants("bell"),
  },
    {
    name: "folder",
    title: "Folder",
    category: "files",
    tags: ["folder","directory","file","storage","archive"],
    variant: getDefaultIconVariant("folder"),
    variants: getIconVariants("folder"),
  },
    {
    name: "mail",
    title: "Mail",
    category: "text",
    tags: ["mail","email","message","letter","unread","communication","inbox","envelope"],
    variant: getDefaultIconVariant("mail"),
    variants: getIconVariants("mail"),
  },
    {
    name: "chevron-right",
    title: "Chevron Right",
    category: "arrows",
    tags: ["chevron-right","forward","next","more than","greater","menu","code","coding","command line","terminal","prompt","shell",">","arrow","right","chevron"],
    variant: getDefaultIconVariant("chevron-right"),
    variants: getIconVariants("chevron-right"),
  },
    {
    name: "chevron-down",
    title: "Chevron Down",
    category: "arrows",
    tags: ["chevron-down","backwards","reverse","slow","dropdown","arrow","down","expand","chevron","bottom"],
    variant: getDefaultIconVariant("chevron-down"),
    variants: getIconVariants("chevron-down"),
  },
    {
    name: "check",
    title: "Check",
    category: "notifications",
    tags: ["check","done","todo","tick","complete","task","confirm","success","verify","ok"],
    variant: getDefaultIconVariant("check"),
    variants: getIconVariants("check"),
  },
    {
    name: "x",
    title: "X",
    category: "notifications",
    tags: ["x","cancel","close","cross","delete","ex","remove","times","clear","math","multiply","multiplication","error"],
    variant: getDefaultIconVariant("x"),
    variants: getIconVariants("x"),
  },
    {
    name: "plus",
    title: "Plus",
    category: "math",
    tags: ["plus","add","new","increase","increment","positive","calculate","toolbar","crosshair","aim","target","scope","sight","reticule","maximum","upgrade","extra","+","create","more"],
    variant: getDefaultIconVariant("plus"),
    variants: getIconVariants("plus"),
  },
    {
    name: "search",
    title: "Search",
    category: "text",
    tags: ["search","find","scan","magnifier","magnifying glass","lens","locate","explore","discover","enlarge","zoom","magnifying-glass","lookup","query"],
    variant: getDefaultIconVariant("search"),
    variants: getIconVariants("search"),
  },
    {
    name: "loader-circle",
    title: "Loader Circle",
    category: "cursors",
    tags: ["loader-circle","loading","wait","busy","progress","spinner","spinning","throbber","circle","waiting","status","loader"],
    variant: getDefaultIconVariant("loader-circle"),
    variants: getIconVariants("loader-circle"),
  },
    {
    name: "triangle-alert",
    title: "Triangle Alert",
    category: "notifications",
    tags: ["triangle-alert","warning","alert","danger","exclamation mark","linter","exclamation","caution"],
    variant: getDefaultIconVariant("triangle-alert"),
    variants: getIconVariants("triangle-alert"),
  },
    {
    name: "info",
    title: "Info",
    category: "accessibility",
    tags: ["info","about","advice","clue","details","help","hint","indicator","information","knowledge","notice","status","support","tooltip"],
    variant: getDefaultIconVariant("info"),
    variants: getIconVariants("info"),
  },
    {
    name: "arrow-right",
    title: "Arrow Right",
    category: "arrows",
    tags: ["arrow-right","forward","next","direction","east","->","arrow","right"],
    variant: getDefaultIconVariant("arrow-right"),
    variants: getIconVariants("arrow-right"),
  },
    {
    name: "arrow-big-down-dash",
    title: "Arrow Big Down Dash",
    category: "arrows",
    tags: ["arrow-big-down-dash","backwards","reverse","slow","direction","south","download","navigation","arrow","big","down","dash","directional"],
    variant: getDefaultIconVariant("arrow-big-down-dash"),
    variants: getIconVariants("arrow-big-down-dash"),
  },
    {
    name: "arrow-big-down",
    title: "Arrow Big Down",
    category: "arrows",
    tags: ["arrow-big-down","backwards","reverse","direction","south","navigation","arrow","big","down","directional"],
    variant: getDefaultIconVariant("arrow-big-down"),
    variants: getIconVariants("arrow-big-down"),
  },
    {
    name: "arrow-big-left-dash",
    title: "Arrow Big Left Dash",
    category: "arrows",
    tags: ["arrow-big-left-dash","previous","back","direction","west","turn","corner","navigation","arrow","big","left","dash","directional"],
    variant: getDefaultIconVariant("arrow-big-left-dash"),
    variants: getIconVariants("arrow-big-left-dash"),
  },
    {
    name: "arrow-big-left",
    title: "Arrow Big Left",
    category: "arrows",
    tags: ["arrow-big-left","previous","back","direction","west","indicate turn","navigation","arrow","big","left","directional"],
    variant: getDefaultIconVariant("arrow-big-left"),
    variants: getIconVariants("arrow-big-left"),
  },
    {
    name: "arrow-big-right-dash",
    title: "Arrow Big Right Dash",
    category: "arrows",
    tags: ["arrow-big-right-dash","next","forward","direction","east","turn","corner","navigation","arrow","big","right","dash","directional"],
    variant: getDefaultIconVariant("arrow-big-right-dash"),
    variants: getIconVariants("arrow-big-right-dash"),
  },
    {
    name: "arrow-big-right",
    title: "Arrow Big Right",
    category: "arrows",
    tags: ["arrow-big-right","next","forward","direction","east","indicate turn","navigation","arrow","big","right","directional"],
    variant: getDefaultIconVariant("arrow-big-right"),
    variants: getIconVariants("arrow-big-right"),
  },
    {
    name: "arrow-big-up-dash",
    title: "Arrow Big Up Dash",
    category: "arrows",
    tags: ["arrow-big-up-dash","caps lock","capitals","keyboard","button","mac","forward","direction","north","faster","speed","boost","navigation","arrow","big","up","dash","directional"],
    variant: getDefaultIconVariant("arrow-big-up-dash"),
    variants: getIconVariants("arrow-big-up-dash"),
  },
    {
    name: "arrow-big-up",
    title: "Arrow Big Up",
    category: "arrows",
    tags: ["arrow-big-up","shift","keyboard","button","mac","capitalize","capitalise","forward","direction","north","navigation","arrow","big","up","directional"],
    variant: getDefaultIconVariant("arrow-big-up"),
    variants: getIconVariants("arrow-big-up"),
  },
    {
    name: "arrow-down-0-1",
    title: "Arrow Down 0 1",
    category: "text",
    tags: ["arrow-down-0-1","filter","sort","ascending","descending","increasing","decreasing","rising","falling","numerical","navigation","arrow","down","0","1","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-0-1"),
    variants: getIconVariants("arrow-down-0-1"),
  },
    {
    name: "arrow-down-1-0",
    title: "Arrow Down 1 0",
    category: "text",
    tags: ["arrow-down-1-0","filter","sort","ascending","descending","increasing","decreasing","rising","falling","numerical","navigation","arrow","down","1","0","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-1-0"),
    variants: getIconVariants("arrow-down-1-0"),
  },
    {
    name: "arrow-down-a-z",
    title: "Arrow Down A Z",
    category: "text",
    tags: ["arrow-down-a-z","filter","sort","ascending","descending","increasing","decreasing","rising","falling","alphabetical","navigation","arrow","down","a","z","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-a-z"),
    variants: getIconVariants("arrow-down-a-z"),
  },
    {
    name: "arrow-down-from-line",
    title: "Arrow Down From Line",
    category: "arrows",
    tags: ["arrow-down-from-line","backwards","reverse","direction","south","download","expand","fold","vertical","navigation","arrow","down","from","line","directional"],
    variant: getDefaultIconVariant("arrow-down-from-line"),
    variants: getIconVariants("arrow-down-from-line"),
  },
    {
    name: "arrow-down-left",
    title: "Arrow Down Left",
    category: "arrows",
    tags: ["arrow-down-left","direction","south-west","diagonal","navigation","arrow","down","left","directional"],
    variant: getDefaultIconVariant("arrow-down-left"),
    variants: getIconVariants("arrow-down-left"),
  },
    {
    name: "arrow-down-narrow-wide",
    title: "Arrow Down Narrow Wide",
    category: "text",
    tags: ["arrow-down-narrow-wide","filter","sort","ascending","descending","increasing","decreasing","rising","falling","navigation","arrow","down","narrow","wide","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-narrow-wide"),
    variants: getIconVariants("arrow-down-narrow-wide"),
  },
    {
    name: "arrow-down-right",
    title: "Arrow Down Right",
    category: "arrows",
    tags: ["arrow-down-right","direction","south-east","diagonal","navigation","arrow","down","right","directional"],
    variant: getDefaultIconVariant("arrow-down-right"),
    variants: getIconVariants("arrow-down-right"),
  },
    {
    name: "arrow-down-to-dot",
    title: "Arrow Down To Dot",
    category: "arrows",
    tags: ["arrow-down-to-dot","direction","south","waypoint","location","step","into","navigation","arrow","down","to","dot","directional"],
    variant: getDefaultIconVariant("arrow-down-to-dot"),
    variants: getIconVariants("arrow-down-to-dot"),
  },
    {
    name: "arrow-down-to-line",
    title: "Arrow Down To Line",
    category: "arrows",
    tags: ["arrow-down-to-line","behind","direction","south","download","save","git","version control","pull","collapse","fold","vertical","navigation","arrow","down","to","line","directional"],
    variant: getDefaultIconVariant("arrow-down-to-line"),
    variants: getIconVariants("arrow-down-to-line"),
  },
    {
    name: "arrow-down-up",
    title: "Arrow Down Up",
    category: "arrows",
    tags: ["arrow-down-up","bidirectional","two-way","2-way","swap","switch","network","traffic","flow","mobile data","internet","sort","reorder","move","navigation","arrow","down","up","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-up"),
    variants: getIconVariants("arrow-down-up"),
  },
    {
    name: "arrow-down-wide-narrow",
    title: "Arrow Down Wide Narrow",
    category: "text",
    tags: ["arrow-down-wide-narrow","filter","sort","ascending","descending","increasing","decreasing","rising","falling","navigation","arrow","down","wide","narrow","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-wide-narrow"),
    variants: getIconVariants("arrow-down-wide-narrow"),
  },
    {
    name: "arrow-down-z-a",
    title: "Arrow Down Z A",
    category: "text",
    tags: ["arrow-down-z-a","filter","sort","ascending","descending","increasing","decreasing","rising","falling","alphabetical","reverse","navigation","arrow","down","z","a","direction","directional"],
    variant: getDefaultIconVariant("arrow-down-z-a"),
    variants: getIconVariants("arrow-down-z-a"),
  },
    {
    name: "arrow-down",
    title: "Arrow Down",
    category: "arrows",
    tags: ["arrow-down","backwards","reverse","direction","south","navigation","arrow","down","directional"],
    variant: getDefaultIconVariant("arrow-down"),
    variants: getIconVariants("arrow-down"),
  },
    {
    name: "arrow-left-from-line",
    title: "Arrow Left From Line",
    category: "arrows",
    tags: ["arrow-left-from-line","previous","back","direction","west","expand","fold","horizontal","<-|","navigation","arrow","left","from","line","directional"],
    variant: getDefaultIconVariant("arrow-left-from-line"),
    variants: getIconVariants("arrow-left-from-line"),
  },
    {
    name: "arrow-left-right",
    title: "Arrow Left Right",
    category: "arrows",
    tags: ["arrow-left-right","bidirectional","two-way","2-way","swap","switch","transaction","reorder","move","<-","->","navigation","arrow","left","right","direction","directional"],
    variant: getDefaultIconVariant("arrow-left-right"),
    variants: getIconVariants("arrow-left-right"),
  },
    {
    name: "arrow-left-to-line",
    title: "Arrow Left To Line",
    category: "arrows",
    tags: ["arrow-left-to-line","previous","back","direction","west","collapse","fold","horizontal","|<-","navigation","arrow","left","to","line","directional"],
    variant: getDefaultIconVariant("arrow-left-to-line"),
    variants: getIconVariants("arrow-left-to-line"),
  },
    {
    name: "arrow-left",
    title: "Arrow Left",
    category: "arrows",
    tags: ["arrow-left","previous","back","direction","west","<-","navigation","arrow","left","directional"],
    variant: getDefaultIconVariant("arrow-left"),
    variants: getIconVariants("arrow-left"),
  },
    {
    name: "arrow-right-from-line",
    title: "Arrow Right From Line",
    category: "arrows",
    tags: ["arrow-right-from-line","next","forward","direction","east","export","expand","fold","horizontal","|->","navigation","arrow","right","from","line","directional"],
    variant: getDefaultIconVariant("arrow-right-from-line"),
    variants: getIconVariants("arrow-right-from-line"),
  },
    {
    name: "arrow-right-left",
    title: "Arrow Right Left",
    category: "arrows",
    tags: ["arrow-right-left","bidirectional","two-way","2-way","swap","switch","transaction","reorder","move","<-","->","navigation","arrow","right","left","direction","directional"],
    variant: getDefaultIconVariant("arrow-right-left"),
    variants: getIconVariants("arrow-right-left"),
  },
    {
    name: "arrow-right-to-line",
    title: "Arrow Right To Line",
    category: "arrows",
    tags: ["arrow-right-to-line","next","forward","direction","east","tab","keyboard","mac","indent","collapse","fold","horizontal","->|","navigation","arrow","right","to","line","directional"],
    variant: getDefaultIconVariant("arrow-right-to-line"),
    variants: getIconVariants("arrow-right-to-line"),
  },
    {
    name: "arrow-up-0-1",
    title: "Arrow Up 0 1",
    category: "text",
    tags: ["arrow-up-0-1","filter","sort","ascending","descending","increasing","decreasing","rising","falling","numerical","navigation","arrow","up","0","1","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-0-1"),
    variants: getIconVariants("arrow-up-0-1"),
  },
    {
    name: "arrow-up-1-0",
    title: "Arrow Up 1 0",
    category: "text",
    tags: ["arrow-up-1-0","filter","sort","ascending","descending","increasing","decreasing","rising","falling","numerical","navigation","arrow","up","1","0","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-1-0"),
    variants: getIconVariants("arrow-up-1-0"),
  },
    {
    name: "arrow-up-a-z",
    title: "Arrow Up A Z",
    category: "text",
    tags: ["arrow-up-a-z","filter","sort","ascending","descending","increasing","decreasing","rising","falling","alphabetical","navigation","arrow","up","a","z","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-a-z"),
    variants: getIconVariants("arrow-up-a-z"),
  },
    {
    name: "arrow-up-down",
    title: "Arrow Up Down",
    category: "arrows",
    tags: ["arrow-up-down","bidirectional","two-way","2-way","swap","switch","network","mobile data","internet","sort","reorder","move","navigation","arrow","up","down","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-down"),
    variants: getIconVariants("arrow-up-down"),
  },
    {
    name: "arrow-up-from-dot",
    title: "Arrow Up From Dot",
    category: "arrows",
    tags: ["arrow-up-from-dot","direction","north","step","out","navigation","arrow","up","from","dot","directional"],
    variant: getDefaultIconVariant("arrow-up-from-dot"),
    variants: getIconVariants("arrow-up-from-dot"),
  },
    {
    name: "arrow-up-from-line",
    title: "Arrow Up From Line",
    category: "arrows",
    tags: ["arrow-up-from-line","forward","direction","north","upload","git","version control","push","expand","fold","vertical","navigation","arrow","up","from","line","directional"],
    variant: getDefaultIconVariant("arrow-up-from-line"),
    variants: getIconVariants("arrow-up-from-line"),
  },
    {
    name: "arrow-up-left",
    title: "Arrow Up Left",
    category: "arrows",
    tags: ["arrow-up-left","direction","north-west","diagonal","navigation","arrow","up","left","directional"],
    variant: getDefaultIconVariant("arrow-up-left"),
    variants: getIconVariants("arrow-up-left"),
  },
    {
    name: "arrow-up-narrow-wide",
    title: "Arrow Up Narrow Wide",
    category: "text",
    tags: ["arrow-up-narrow-wide","filter","sort","ascending","descending","increasing","decreasing","rising","falling","navigation","arrow","up","narrow","wide","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-narrow-wide"),
    variants: getIconVariants("arrow-up-narrow-wide"),
  },
    {
    name: "arrow-up-right",
    title: "Arrow Up Right",
    category: "arrows",
    tags: ["arrow-up-right","direction","north-east","diagonal","navigation","arrow","up","right","directional"],
    variant: getDefaultIconVariant("arrow-up-right"),
    variants: getIconVariants("arrow-up-right"),
  },
    {
    name: "arrow-up-to-line",
    title: "Arrow Up To Line",
    category: "arrows",
    tags: ["arrow-up-to-line","forward","direction","north","upload","collapse","fold","vertical","navigation","arrow","up","to","line","directional"],
    variant: getDefaultIconVariant("arrow-up-to-line"),
    variants: getIconVariants("arrow-up-to-line"),
  },
    {
    name: "arrow-up-wide-narrow",
    title: "Arrow Up Wide Narrow",
    category: "text",
    tags: ["arrow-up-wide-narrow","filter","sort","ascending","descending","increasing","decreasing","rising","falling","navigation","arrow","up","wide","narrow","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-wide-narrow"),
    variants: getIconVariants("arrow-up-wide-narrow"),
  },
    {
    name: "arrow-up-z-a",
    title: "Arrow Up Z A",
    category: "text",
    tags: ["arrow-up-z-a","filter","sort","ascending","descending","increasing","decreasing","rising","falling","alphabetical","reverse","navigation","arrow","up","z","a","direction","directional"],
    variant: getDefaultIconVariant("arrow-up-z-a"),
    variants: getIconVariants("arrow-up-z-a"),
  },
    {
    name: "arrow-up",
    title: "Arrow Up",
    category: "arrows",
    tags: ["arrow-up","forward","direction","north","navigation","arrow","up","directional"],
    variant: getDefaultIconVariant("arrow-up"),
    variants: getIconVariants("arrow-up"),
  },
    {
    name: "arrows-up-from-line",
    title: "Arrows Up From Line",
    category: "arrows",
    tags: ["arrows-up-from-line","direction","orientation","this way up","vertical","package","box","fragile","postage","shipping","navigation","arrows","up","from","line","directional"],
    variant: getDefaultIconVariant("arrows-up-from-line"),
    variants: getIconVariants("arrows-up-from-line"),
  },
    {
    name: "chevron-first",
    title: "Chevron First",
    category: "arrows",
    tags: ["chevron-first","previous","music","navigation","chevron","first","arrow"],
    variant: getDefaultIconVariant("chevron-first"),
    variants: getIconVariants("chevron-first"),
  },
    {
    name: "chevron-last",
    title: "Chevron Last",
    category: "arrows",
    tags: ["chevron-last","skip","next","music","navigation","chevron","last","arrow"],
    variant: getDefaultIconVariant("chevron-last"),
    variants: getIconVariants("chevron-last"),
  },
    {
    name: "chevron-left",
    title: "Chevron Left",
    category: "arrows",
    tags: ["chevron-left","back","previous","less than","fewer","menu","<","navigation","chevron","left","arrow","directional"],
    variant: getDefaultIconVariant("chevron-left"),
    variants: getIconVariants("chevron-left"),
  },
    {
    name: "chevron-up",
    title: "Chevron Up",
    category: "arrows",
    tags: ["chevron-up","caret","keyboard","mac","control","ctrl","superscript","exponential","power","ahead","fast","^","dropdown","navigation","chevron","up","arrow","directional"],
    variant: getDefaultIconVariant("chevron-up"),
    variants: getIconVariants("chevron-up"),
  },
    {
    name: "chevrons-down-up",
    title: "Chevrons Down Up",
    category: "arrows",
    tags: ["chevrons-down-up","collapse","fold","vertical","navigation","chevrons","down","up","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-down-up"),
    variants: getIconVariants("chevrons-down-up"),
  },
    {
    name: "chevrons-down",
    title: "Chevrons Down",
    category: "arrows",
    tags: ["chevrons-down","backwards","reverse","slower","navigation","chevrons","down","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-down"),
    variants: getIconVariants("chevrons-down"),
  },
    {
    name: "chevrons-left-right-ellipsis",
    title: "Chevrons Left Right Ellipsis",
    category: "communication",
    tags: ["chevrons-left-right-ellipsis","internet","network","connection","cable","lan","port","router","switch","hub","modem","web","online","networking","communication","socket","plug","slot","controller","connector","interface","console","signal","data","input","output","navigation","chevrons","left","right","ellipsis","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-left-right-ellipsis"),
    variants: getIconVariants("chevrons-left-right-ellipsis"),
  },
    {
    name: "chevrons-left-right",
    title: "Chevrons Left Right",
    category: "arrows",
    tags: ["chevrons-left-right","expand","horizontal","unfold","navigation","chevrons","left","right","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-left-right"),
    variants: getIconVariants("chevrons-left-right"),
  },
    {
    name: "chevrons-left",
    title: "Chevrons Left",
    category: "arrows",
    tags: ["chevrons-left","turn","corner","navigation","chevrons","left","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-left"),
    variants: getIconVariants("chevrons-left"),
  },
    {
    name: "chevrons-right-left",
    title: "Chevrons Right Left",
    category: "arrows",
    tags: ["chevrons-right-left","collapse","fold","horizontal","navigation","chevrons","right","left","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-right-left"),
    variants: getIconVariants("chevrons-right-left"),
  },
    {
    name: "chevrons-right",
    title: "Chevrons Right",
    category: "arrows",
    tags: ["chevrons-right","turn","corner","navigation","chevrons","right","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-right"),
    variants: getIconVariants("chevrons-right"),
  },
    {
    name: "chevrons-up-down",
    title: "Chevrons Up Down",
    category: "arrows",
    tags: ["chevrons-up-down","expand","unfold","vertical","navigation","chevrons","up","down","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-up-down"),
    variants: getIconVariants("chevrons-up-down"),
  },
    {
    name: "chevrons-up",
    title: "Chevrons Up",
    category: "arrows",
    tags: ["chevrons-up","forward","ahead","faster","speed","boost","navigation","chevrons","up","arrow","directional"],
    variant: getDefaultIconVariant("chevrons-up"),
    variants: getIconVariants("chevrons-up"),
  },
    {
    name: "circle-arrow-down",
    title: "Circle Arrow Down",
    category: "arrows",
    tags: ["circle-arrow-down","backwards","reverse","direction","south","sign","button","navigation","circle","arrow","down","directional"],
    variant: getDefaultIconVariant("circle-arrow-down"),
    variants: getIconVariants("circle-arrow-down"),
  },
    {
    name: "circle-arrow-left",
    title: "Circle Arrow Left",
    category: "arrows",
    tags: ["circle-arrow-left","previous","back","direction","west","sign","turn","button","<-","navigation","circle","arrow","left","directional"],
    variant: getDefaultIconVariant("circle-arrow-left"),
    variants: getIconVariants("circle-arrow-left"),
  },
    {
    name: "circle-arrow-out-down-left",
    title: "Circle Arrow Out Down Left",
    category: "arrows",
    tags: ["circle-arrow-out-down-left","outwards","direction","south-west","diagonal","navigation","circle","arrow","out","down","left","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-down-left"),
    variants: getIconVariants("circle-arrow-out-down-left"),
  },
    {
    name: "circle-arrow-out-down-right",
    title: "Circle Arrow Out Down Right",
    category: "arrows",
    tags: ["circle-arrow-out-down-right","outwards","direction","south-east","diagonal","navigation","circle","arrow","out","down","right","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-down-right"),
    variants: getIconVariants("circle-arrow-out-down-right"),
  },
    {
    name: "circle-arrow-out-up-left",
    title: "Circle Arrow Out Up Left",
    category: "arrows",
    tags: ["circle-arrow-out-up-left","outwards","direction","north-west","diagonal","keyboard","button","escape","navigation","circle","arrow","out","up","left","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-up-left"),
    variants: getIconVariants("circle-arrow-out-up-left"),
  },
    {
    name: "circle-arrow-out-up-right",
    title: "Circle Arrow Out Up Right",
    category: "arrows",
    tags: ["circle-arrow-out-up-right","outwards","direction","north-east","diagonal","navigation","circle","arrow","out","up","right","directional"],
    variant: getDefaultIconVariant("circle-arrow-out-up-right"),
    variants: getIconVariants("circle-arrow-out-up-right"),
  },
    {
    name: "circle-arrow-right",
    title: "Circle Arrow Right",
    category: "arrows",
    tags: ["circle-arrow-right","next","forward","direction","east","sign","turn","button","->","navigation","circle","arrow","right","directional"],
    variant: getDefaultIconVariant("circle-arrow-right"),
    variants: getIconVariants("circle-arrow-right"),
  },
    {
    name: "circle-arrow-up",
    title: "Circle Arrow Up",
    category: "arrows",
    tags: ["circle-arrow-up","forward","direction","north","sign","button","navigation","circle","arrow","up","directional"],
    variant: getDefaultIconVariant("circle-arrow-up"),
    variants: getIconVariants("circle-arrow-up"),
  },
    {
    name: "circle-chevron-down",
    title: "Circle Chevron Down",
    category: "arrows",
    tags: ["circle-chevron-down","back","menu","navigation","circle","chevron","down","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-down"),
    variants: getIconVariants("circle-chevron-down"),
  },
    {
    name: "circle-chevron-left",
    title: "Circle Chevron Left",
    category: "arrows",
    tags: ["circle-chevron-left","back","previous","less than","fewer","menu","<","navigation","circle","chevron","left","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-left"),
    variants: getIconVariants("circle-chevron-left"),
  },
    {
    name: "circle-chevron-right",
    title: "Circle Chevron Right",
    category: "arrows",
    tags: ["circle-chevron-right","back","more than","greater","menu",">","navigation","circle","chevron","right","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-right"),
    variants: getIconVariants("circle-chevron-right"),
  },
    {
    name: "circle-chevron-up",
    title: "Circle Chevron Up",
    category: "arrows",
    tags: ["circle-chevron-up","caret","ahead","menu","^","navigation","circle","chevron","up","arrow","directional"],
    variant: getDefaultIconVariant("circle-chevron-up"),
    variants: getIconVariants("circle-chevron-up"),
  },
    {
    name: "square-arrow-down-left",
    title: "Square Arrow Down Left",
    category: "arrows",
    tags: ["square-arrow-down-left","direction","south-west","diagonal","sign","turn","keyboard","button","navigation","square","arrow","down","left","directional"],
    variant: getDefaultIconVariant("square-arrow-down-left"),
    variants: getIconVariants("square-arrow-down-left"),
  },
    {
    name: "square-arrow-down-right",
    title: "Square Arrow Down Right",
    category: "arrows",
    tags: ["square-arrow-down-right","direction","south-east","diagonal","sign","turn","keyboard","button","navigation","square","arrow","down","right","directional"],
    variant: getDefaultIconVariant("square-arrow-down-right"),
    variants: getIconVariants("square-arrow-down-right"),
  },
    {
    name: "square-arrow-down",
    title: "Square Arrow Down",
    category: "arrows",
    tags: ["square-arrow-down","backwards","reverse","direction","south","sign","keyboard","button","navigation","square","arrow","down","directional"],
    variant: getDefaultIconVariant("square-arrow-down"),
    variants: getIconVariants("square-arrow-down"),
  },
    {
    name: "square-arrow-left",
    title: "Square Arrow Left",
    category: "arrows",
    tags: ["square-arrow-left","previous","back","direction","west","sign","keyboard","button","<-","navigation","square","arrow","left","directional"],
    variant: getDefaultIconVariant("square-arrow-left"),
    variants: getIconVariants("square-arrow-left"),
  },
    {
    name: "square-arrow-out-down-left",
    title: "Square Arrow Out Down Left",
    category: "arrows",
    tags: ["square-arrow-out-down-left","outwards","direction","south-west","diagonal","navigation","square","arrow","out","down","left","directional"],
    variant: getDefaultIconVariant("square-arrow-out-down-left"),
    variants: getIconVariants("square-arrow-out-down-left"),
  },
    {
    name: "square-arrow-out-down-right",
    title: "Square Arrow Out Down Right",
    category: "arrows",
    tags: ["square-arrow-out-down-right","outwards","direction","south-east","diagonal","navigation","square","arrow","out","down","right","directional"],
    variant: getDefaultIconVariant("square-arrow-out-down-right"),
    variants: getIconVariants("square-arrow-out-down-right"),
  },
    {
    name: "square-arrow-out-up-left",
    title: "Square Arrow Out Up Left",
    category: "arrows",
    tags: ["square-arrow-out-up-left","outwards","direction","north-west","diagonal","navigation","square","arrow","out","up","left","directional"],
    variant: getDefaultIconVariant("square-arrow-out-up-left"),
    variants: getIconVariants("square-arrow-out-up-left"),
  },
    {
    name: "square-arrow-out-up-right",
    title: "Square Arrow Out Up Right",
    category: "arrows",
    tags: ["square-arrow-out-up-right","outwards","direction","north-east","diagonal","share","open","external","link","navigation","square","arrow","out","up","right","directional"],
    variant: getDefaultIconVariant("square-arrow-out-up-right"),
    variants: getIconVariants("square-arrow-out-up-right"),
  },
    {
    name: "square-arrow-right-enter",
    title: "Square Arrow Right Enter",
    category: "arrows",
    tags: ["square-arrow-right-enter","left","in","inside","input","insert","source","import","place","->","navigation","square","arrow","right","enter","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-right-enter"),
    variants: getIconVariants("square-arrow-right-enter"),
  },
    {
    name: "square-arrow-right-exit",
    title: "Square Arrow Right Exit",
    category: "arrows",
    tags: ["square-arrow-right-exit","out","outside","output","export","->","navigation","square","arrow","right","exit","direction","directional"],
    variant: getDefaultIconVariant("square-arrow-right-exit"),
    variants: getIconVariants("square-arrow-right-exit"),
  },
    {
    name: "square-arrow-right",
    title: "Square Arrow Right",
    category: "arrows",
    tags: ["square-arrow-right","next","forward","direction","west","sign","keyboard","button","->","navigation","square","arrow","right","directional"],
    variant: getDefaultIconVariant("square-arrow-right"),
    variants: getIconVariants("square-arrow-right"),
  },
    {
    name: "square-arrow-up-left",
    title: "Square Arrow Up Left",
    category: "arrows",
    tags: ["square-arrow-up-left","direction","north-west","diagonal","sign","keyboard","button","navigation","square","arrow","up","left","directional"],
    variant: getDefaultIconVariant("square-arrow-up-left"),
    variants: getIconVariants("square-arrow-up-left"),
  },
    {
    name: "square-arrow-up-right",
    title: "Square Arrow Up Right",
    category: "arrows",
    tags: ["square-arrow-up-right","direction","north-east","diagonal","sign","keyboard","button","share","navigation","square","arrow","up","right","directional"],
    variant: getDefaultIconVariant("square-arrow-up-right"),
    variants: getIconVariants("square-arrow-up-right"),
  },
    {
    name: "square-arrow-up",
    title: "Square Arrow Up",
    category: "arrows",
    tags: ["square-arrow-up","forward","direction","north","sign","keyboard","button","navigation","square","arrow","up","directional"],
    variant: getDefaultIconVariant("square-arrow-up"),
    variants: getIconVariants("square-arrow-up"),
  },
    {
    name: "square-chevron-down",
    title: "Square Chevron Down",
    category: "arrows",
    tags: ["square-chevron-down","back","menu","panel","navigation","square","chevron","down","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-down"),
    variants: getIconVariants("square-chevron-down"),
  },
    {
    name: "square-chevron-left",
    title: "Square Chevron Left",
    category: "arrows",
    tags: ["square-chevron-left","back","previous","less than","fewer","menu","panel","button","keyboard","<","navigation","square","chevron","left","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-left"),
    variants: getIconVariants("square-chevron-left"),
  },
    {
    name: "square-chevron-right",
    title: "Square Chevron Right",
    category: "arrows",
    tags: ["square-chevron-right","forward","next","more than","greater","menu","panel","code","coding","command line","terminal","prompt","shell","console",">","navigation","square","chevron","right","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-right"),
    variants: getIconVariants("square-chevron-right"),
  },
    {
    name: "square-chevron-up",
    title: "Square Chevron Up",
    category: "arrows",
    tags: ["square-chevron-up","caret","keyboard","button","mac","control","ctrl","superscript","exponential","power","ahead","menu","panel","^","navigation","square","chevron","up","arrow","directional"],
    variant: getDefaultIconVariant("square-chevron-up"),
    variants: getIconVariants("square-chevron-up"),
  },
    {
    name: "star",
    title: "Star",
    category: "account",
    tags: ["star","bookmark","favorite","like","review","rating","rate","featured"],
    variant: getDefaultIconVariant("star"),
    variants: getIconVariants("star"),
  },
    {
    name: "bookmark",
    title: "Bookmark",
    category: "account",
    tags: ["bookmark","save","favorite","mark","label","attachment","file","stick","pin","read","clip","marker","tag","ribbon","read-later"],
    variant: getDefaultIconVariant("bookmark"),
    variants: getIconVariants("bookmark"),
  },
    {
    name: "copy",
    title: "Copy",
    category: "text",
    tags: ["copy","clone","duplicate","multiple","clipboard","file","document"],
    variant: getDefaultIconVariant("copy"),
    variants: getIconVariants("copy"),
  },
    {
    name: "minus",
    title: "Minus",
    category: "math",
    tags: ["minus","subtract","remove","decrease","decrement","reduce","negative","calculate","line","divider","separator","horizontal rule","hr","html","markup","markdown","---","toolbar","operator","code","coding","minimum","downgrade","dash","zoom-out"],
    variant: getDefaultIconVariant("minus"),
    variants: getIconVariants("minus"),
  },
    {
    name: "file-text",
    title: "File Text",
    category: "files",
    tags: ["file-text","data","txt","pdf","document","page","text","file","doc","article"],
    variant: getDefaultIconVariant("file-text"),
    variants: getIconVariants("file-text"),
  },
    {
    name: "moon",
    title: "Moon",
    category: "accessibility",
    tags: ["moon","dark","night","theme","mode","weather","crescent"],
    variant: getDefaultIconVariant("moon"),
    variants: getIconVariants("moon"),
  },
    {
    name: "user",
    title: "User",
    category: "account",
    tags: ["user","person","account","contact","profile","avatar","member","author"],
    variant: getDefaultIconVariant("user"),
    variants: getIconVariants("user"),
  },
    {
    name: "circle-check",
    title: "Circle Check",
    category: "notifications",
    tags: ["circle-check","done","todo","tick","complete","task","check","success","confirmed","verified"],
    variant: getDefaultIconVariant("circle-check"),
    variants: getIconVariants("circle-check"),
  },
    {
    name: "settings",
    title: "Settings",
    category: "account",
    tags: ["settings","cog","edit","gear","preferences","configuration","options","controls"],
    variant: getDefaultIconVariant("settings"),
    variants: getIconVariants("settings"),
  },
    {
    name: "heart",
    title: "Heart",
    category: "medical",
    tags: ["heart","like","love","emotion","suit","playing","cards","favorite","health","care"],
    variant: getDefaultIconVariant("heart"),
    variants: getIconVariants("heart"),
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
  accessibility: "Accessibility",
  account: "Accounts & access",
  animals: "Animals",
  arrows: "Arrows",
  buildings: "Buildings",
  charts: "Charts",
  communication: "Communication",
  connectivity: "Connectivity",
  cursors: "Cursors",
  design: "Design",
  development: "Coding & development",
  devices: "Devices",
  emoji: "Emoji",
  files: "File icons",
  finance: "Finance",
  "food-beverage": "Food & beverage",
  gaming: "Gaming",
  home: "Home",
  layout: "Layout",
  mail: "Mail",
  math: "Mathematics",
  medical: "Medical",
  multimedia: "Multimedia",
  nature: "Nature",
  navigation: "Navigation & Places",
  notifications: "Notification",
  people: "People",
  photography: "Photography",
  science: "Science",
  seasons: "Seasons",
  security: "Security",
  shapes: "Shapes",
  shopping: "Shopping",
  social: "Social",
  sports: "Sports",
  sustainability: "Sustainability",
  text: "Text formatting",
  time: "Time & calendar",
  tools: "Tools",
  transportation: "Transportation",
  travel: "Travel",
  weather: "Weather",
};

export function getCategoryCounts(
  items: readonly IconCatalogItem[] = ICON_CATALOG,
  variant: IconVariantFilter = "all"
): CategoryInfo[] {
  const counts: Partial<Record<IconCategory, number>> = {};
  let total = 0;

  for (const item of items) {
    const itemCount = getIconVariantCount(item, variant);
    counts[item.category] = (counts[item.category] || 0) + itemCount;
    total += itemCount;
  }

  const categoryInfos: CategoryInfo[] = [
    { id: "all", label: CATEGORY_LABELS.all, count: total },
  ];

  for (const category of ICON_CATEGORIES) {
    const count = counts[category] || 0;
    if (count > 0) {
      categoryInfos.push({
        id: category,
        label: CATEGORY_LABELS[category],
        count,
      });
    }
  }

  return categoryInfos;
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
