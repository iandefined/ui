"use client";

import { cn } from "cn";
import { type Root as PageTreeRoot } from "fumadocs-core/page-tree";
import {
  ArrowRightIcon,
  CornerDownLeftIcon,
  CircleDashedIcon,
  SquareDashedIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/base/command";
import { Kbd } from "@/registry/base/kbd";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { SITE } from "@/shared/constants/site";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import { useIsMac } from "@/shared/hooks/use-is-mac";
import { useRouter } from "@/shared/hooks/use-navigation";
import { type PackageManager } from "@/shared/hooks/use-package-manager";
import { usePackageManager } from "@/shared/hooks/use-package-manager";
import { getDocsNavigationGroups } from "@/shared/lib/docs-navigation";
import { trackEvent } from "@/shared/lib/events";

const getShadcnAddCommand = (pm: PackageManager, url: string) => {
  switch (pm) {
    case "bun":
      return `bunx --bun shadcn@latest add ${url}`;
    case "npm":
      return `npx shadcn@latest add ${url}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${url}`;
    case "pnpm":
    default:
      return `pnpm dlx shadcn@latest add ${url}`;
  }
};

type DocUrlKind =
  | { kind: "theme"; slug: string }
  | { kind: "component"; slug: string }
  | { kind: "template"; slug: string }
  | { kind: "page" };

const getNodeText = (value: ReactNode): string => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }

  return "";
};

type CommandMenuOption = {
  value: string;
  label: string;
  keywords: string[];
  icon: ReactNode;
  trailing?: ReactNode;
  registryItem?: string;
  onSelect: () => void;
};

type CommandMenuGroup = {
  value: string;
  items: CommandMenuOption[];
};

const matchesCommand = (item: CommandMenuOption, search: string) =>
  `${item.label} ${item.keywords.join(" ")}`
    .toLowerCase()
    .includes(search.toLowerCase());

const parseDocPageUrl = (url: string): DocUrlKind => {
  const parts = url.split("/").filter(Boolean);
  const themesIdx = parts.indexOf("themes");
  if (themesIdx !== -1 && parts[themesIdx + 1]) {
    return { kind: "theme", slug: parts[themesIdx + 1] };
  }
  const componentsIdx = parts.indexOf("components");
  if (componentsIdx !== -1 && parts[componentsIdx + 1]) {
    return { kind: "component", slug: parts.at(-1) ?? "" };
  }
  const templatesIdx = parts.indexOf("templates");
  if (templatesIdx !== -1 && parts[templatesIdx + 1]) {
    return { kind: "template", slug: parts.at(-1) ?? "" };
  }
  return { kind: "page" };
};

const searchKeywordsFromUrl = (url: string) => {
  const segments = url.split("/").filter(Boolean);
  return segments.flatMap((segment) =>
    segment.includes("-") ? [segment, ...segment.split("-")] : [segment]
  );
};

const buildDocPageKeywords = (
  parsed: DocUrlKind,
  url: string,
  breadcrumb: string[]
): string[] => [
  ...(parsed.kind === "page" ? [] : [parsed.kind]),
  ...breadcrumb.filter(Boolean).flatMap((s) => [s, s.toLowerCase()]),
  ...searchKeywordsFromUrl(url),
];

const DocPageLeadingIcon = ({ parsed }: { parsed: DocUrlKind }) => {
  // if (parsed.kind === "theme") {
  //   const color = themePrimaryBySlug[parsed.slug];
  //   return (
  //     <span
  //       className="border-border/60 size-4 shrink-0 rounded-sm border"
  //       style={color ? { backgroundColor: color } : undefined}
  //       aria-hidden
  //     />
  //   );
  // }
  if (parsed.kind === "component") {
    return <CircleDashedIcon />;
  }
  if (parsed.kind === "template") {
    return <SquareDashedIcon />;
  }
  return <ArrowRightIcon />;
};

export const CommandMenu = ({
  blocks,
  className,
  navItems,
  tree,
}: {
  blocks?: { name: string; description: string; categories: string[] }[];
  className?: string;
  navItems: { href: string; label: string }[];
  tree: PageTreeRoot;
}) => {
  const { push } = useRouter();
  const isMac = useIsMac();
  const [packageManager] = usePackageManager();
  const [open, setOpen] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState<CommandMenuOption>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copyPayload = highlightedItem?.registryItem
    ? getShadcnAddCommand(
        packageManager,
        `${SITE.REGISTRY}/r/${highlightedItem.registryItem}.json`
      )
    : "";

  const { copyToClipboard } = useCopyToClipboard({
    onCopy: () => {
      if (copyPayload) {
        trackEvent({
          name: "copy_npm_command",
          properties: { command: copyPayload, pm: packageManager },
        });
      }
    },
  });

  const treeGroups = useMemo(
    () =>
      getDocsNavigationGroups(tree).map((group) => {
        return {
          label: getNodeText(group.label),
          pages: group.pages.map((page) => {
            return {
              name: getNodeText(page.name),
              url: page.url,
            };
          }),
        };
      }),
    [tree]
  );

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const commandGroups = useMemo<CommandMenuGroup[]>(() => {
    const groups: CommandMenuGroup[] = [];

    if (navItems.length > 0) {
      groups.push({
        value: "Pages",
        items: navItems.map((item) => {
          return {
            value: `Navigation ${item.label}`,
            label: item.label,
            keywords: ["nav", "navigation", item.label.toLowerCase()],
            icon: <ArrowRightIcon />,
            onSelect: () => runCommand(() => push(item.href)),
          };
        }),
      });
    }

    for (const group of treeGroups) {
      groups.push({
        value: group.label,
        items: group.pages.map((page) => {
          const parsed = parseDocPageUrl(page.url);
          return {
            value: [group.label, page.name].filter(Boolean).join(" "),
            label: page.name,
            keywords: buildDocPageKeywords(parsed, page.url, [group.label]),
            icon: <DocPageLeadingIcon parsed={parsed} />,
            registryItem:
              parsed.kind === "page"
                ? undefined
                : parsed.kind === "theme"
                  ? `theme-${parsed.slug}`
                  : parsed.slug,
            onSelect: () => runCommand(() => push(page.url)),
          };
        }),
      });
    }

    if (blocks?.length) {
      groups.push({
        value: "Blocks",
        items: blocks.map((block) => {
          return {
            value: block.name,
            label: block.description,
            keywords: [
              "block",
              block.name,
              block.description,
              ...block.categories,
            ],
            icon: <SquareDashedIcon />,
            trailing: (
              <span className="text-muted-foreground ml-auto font-mono text-xs font-normal tabular-nums">
                {block.name}
              </span>
            ),
            registryItem: block.name,
            onSelect: () =>
              runCommand(() =>
                push(
                  `/blocks?category=${encodeURIComponent(block.categories[0] ?? "all")}`
                )
              ),
          };
        }),
      });
    }

    return groups;
  }, [blocks, navItems, push, runCommand, treeGroups]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            const metaKeyPressed = e.metaKey ? "cmd+k" : "ctrl+k";
            trackEvent({
              name: "open_command_menu",
              properties: {
                key: e.key === "/" ? "/" : metaKeyPressed,
                method: "keyboard",
              },
            });
          }
          return !prev;
        });
      }

      if (
        open &&
        e.key === "c" &&
        (e.metaKey || e.ctrlKey) &&
        copyPayload.includes("shadcn@latest")
      ) {
        e.preventDefault();
        runCommand(() => {
          void copyToClipboard(copyPayload);
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, runCommand, copyToClipboard, open]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} overlay="brightness">
      <CommandDialogTrigger
        ref={triggerRef}
        render={
          <Button
            variant="secondary"
            className={cn(
              "bg-surface text-surface-foreground/60 dark:bg-card relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64",
              className
            )}
          >
            <span className="hidden lg:inline-flex">
              Search documentation...
            </span>
            <span className="inline-flex lg:hidden">Search...</span>
            <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
              <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
              <Kbd className="aspect-square">K</Kbd>
            </div>
          </Button>
        }
      />
      <CommandDialogPopup
        backdropClassName="data-ending-style:transition-none"
        className="data-ending-style:transition-none"
        description="Search for a command to run."
        finalFocus={triggerRef}
        title="Search documentation"
      >
        <Command<CommandMenuOption>
          items={commandGroups}
          filter={matchesCommand}
          itemToStringValue={(item) => item.label}
          onItemHighlighted={setHighlightedItem}
        >
          <CommandContent>
            <CommandInput
              aria-label="Search documentation"
              placeholder="Search documentation..."
            />
            <CommandList>
              {(group: CommandMenuGroup) => (
                <CommandGroup key={group.value} items={group.items}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: CommandMenuOption) => (
                      <CommandItem
                        key={item.value}
                        value={item}
                        onClick={item.onSelect}
                      >
                        {item.icon}
                        {item.label}
                        {item.trailing}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandContent>
          <CommandFooter className="flex-nowrap gap-2 overflow-hidden">
            <div className="flex items-center gap-2 shrink-0">
              <Kbd className="shrink-0" aria-label="Enter">
                <CornerDownLeftIcon aria-hidden="true" />
              </Kbd>
              {highlightedItem && (
                <span className="min-w-0 truncate">Go to Page</span>
              )}
            </div>
            {copyPayload && (
              <>
                <Separator orientation="vertical" className="h-4!" />
                <div className="flex min-w-0 items-center gap-1">
                  <Kbd className="shrink-0">{isMac ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd className="shrink-0">C</Kbd>
                  <span className="min-w-0 truncate">{copyPayload}</span>
                </div>
              </>
            )}
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
};
