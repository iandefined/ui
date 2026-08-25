"use client";

import type { Root as PageTreeRoot } from "fumadocs-core/page-tree";
import {
  ArrowRightIcon,
  CornerDownLeftIcon,
  CircleDashedIcon,
  SquareDashedIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Kbd } from "@/shared/components/ui/kbd";
import { Separator } from "@/shared/components/ui/separator";
import { SITE } from "@/shared/constants/site";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import { useIsMac } from "@/shared/hooks/use-is-mac";
import { useRouter } from "@/shared/hooks/use-navigation";
import { usePackageManager } from "@/shared/hooks/use-package-manager";
import { getDocsNavigationGroups } from "@/shared/lib/docs-navigation";
import { trackEvent } from "@/shared/lib/events";
import { cn } from "@/shared/lib/utils";

type DocUrlKind =
  | { kind: "theme"; slug: string }
  | { kind: "component"; slug: string }
  | { kind: "template"; slug: string }
  | { kind: "page" };

const GROUP_HEADING_CLS =
  "!p-0 [&_[data-slot=command-group-heading]]:scroll-mt-16 [&_[data-slot=command-group-heading]]:!p-3 [&_[data-slot=command-group-heading]]:!pb-1";

type CommandMenuOption = {
  value: string;
  label: string;
  keywords: string[];
  icon: ReactNode;
  trailing?: ReactNode;
  onHighlight?: () => void;
  onSelect: () => void;
};

type CommandMenuGroup = {
  value: string;
  items: CommandMenuOption[];
  className?: string;
};

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
  navItems,
  tree,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  blocks?: { name: string; description: string; categories: string[] }[];
  navItems: { href: string; label: string }[];
  tree: PageTreeRoot;
}) => {
  const router = useRouter();
  const isMac = useIsMac();
  const [packageManager] = usePackageManager();
  const [open, setOpen] = useState(false);
  const [showGoToPage, setShowGoToPage] = useState(false);
  const [copyPayload, setCopyPayload] = useState("");

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

  const treeGroups = useMemo(() => {
    return getDocsNavigationGroups(tree).map((group) => ({
      label:
        typeof group.label === "string" ? group.label : String(group.label),
      pages: group.pages.map((page) => ({
        name: typeof page.name === "string" ? page.name : String(page.name),
        url: page.url,
      })),
    }));
  }, [tree]);

  const handleDocPageHighlight = useCallback(
    (item: { url: string; name?: string }) => {
      setShowGoToPage(true);
      const parsed = parseDocPageUrl(item.url);
      if (parsed.kind === "theme") {
        setCopyPayload(
          `${packageManager} dlx shadcn@latest add ${SITE.REGISTRY}/theme-${parsed.slug}`
        );
        return;
      }
      if (parsed.kind === "component" || parsed.kind === "template") {
        setCopyPayload(
          `${packageManager} dlx shadcn@latest add ${SITE.REGISTRY}/${parsed.slug}`
        );
        return;
      }
      setCopyPayload("");
    },
    [packageManager]
  );

  const handleBlockHighlight = useCallback(
    (block: { name: string; description: string; categories: string[] }) => {
      setShowGoToPage(true);
      setCopyPayload(`${packageManager} dlx shadcn@latest add ${block.name}`);
    },
    [packageManager]
  );

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const handleOpenClick = useCallback(() => setOpen(true), []);

  const handleFilter = useCallback(
    (value: string, search: string, keywords?: string[]) => {
      const extendValue = `${value} ${keywords?.join(" ") || ""}`;
      if (extendValue.toLowerCase().includes(search.toLowerCase())) {
        return 1;
      }
      return 0;
    },
    []
  );

  const commandGroups = useMemo<CommandMenuGroup[]>(() => {
    const groups: CommandMenuGroup[] = [];

    if (navItems.length > 0) {
      groups.push({
        value: "Pages",
        items: navItems.map((item) => ({
          value: `Navigation ${item.label}`,
          label: item.label,
          keywords: ["nav", "navigation", item.label.toLowerCase()],
          icon: <ArrowRightIcon />,
          onHighlight: () => {
            setShowGoToPage(true);
            setCopyPayload("");
          },
          onSelect: () => runCommand(() => router.push(item.href)),
        })),
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
            onHighlight: () =>
              handleDocPageHighlight({ name: page.name, url: page.url }),
            onSelect: () => runCommand(() => router.push(page.url)),
          };
        }),
        className: GROUP_HEADING_CLS,
      });
    }

    if (blocks?.length) {
      groups.push({
        value: "Blocks",
        className: "p-0! [&_[data-slot=command-group-heading]]:p-3!",
        items: blocks.map((block) => ({
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
          onHighlight: () => handleBlockHighlight(block),
          onSelect: () =>
            runCommand(() =>
              router.push(
                `/blocks?category=${encodeURIComponent(block.categories[0] ?? "all")}`
              )
            ),
        })),
      });
    }

    return groups;
  }, [
    blocks,
    handleBlockHighlight,
    handleDocPageHighlight,
    navItems,
    router,
    runCommand,
    treeGroups,
  ]);

  const handleItemHighlighted = useCallback((item: unknown) => {
    if (item && typeof item === "object") {
      (item as CommandMenuOption).onHighlight?.();
    }
  }, []);

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
        e.key === "c" &&
        (e.metaKey || e.ctrlKey) &&
        copyPayload.includes("shadcn@latest")
      ) {
        runCommand(() => {
          copyToClipboard(copyPayload);
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, runCommand, copyToClipboard]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="secondary"
            className={cn(
              "bg-surface text-surface-foreground/60 dark:bg-card relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
            )}
            onClick={handleOpenClick}
            {...props}
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
      <DialogContent
        showCloseButton={false}
        className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command
          className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:h-9! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border"
          items={commandGroups}
          filter={handleFilter}
          onItemHighlighted={handleItemHighlighted}
        >
          <CommandInput placeholder="Search documentation..." />
          <CommandList
            className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5"
            renderItem={(value) => {
              const group = value as unknown as CommandMenuGroup;
              return (
                <CommandGroup
                  key={group.value}
                  className={group.className}
                  heading={group.value}
                  items={group.items}
                  renderItem={(itemValue) => {
                    const item = itemValue as unknown as CommandMenuOption;
                    return (
                      <CommandItem
                        key={item.value}
                        className="data-highlighted:border-input data-highlighted:bg-input/50 h-9 rounded-md border border-transparent px-3! font-medium"
                        value={item}
                        onSelect={item.onSelect}
                      >
                        {item.icon}
                        {item.label}
                        {item.trailing}
                      </CommandItem>
                    );
                  }}
                />
              );
            }}
          >
            <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
              No results found.
            </CommandEmpty>
          </CommandList>
        </Command>
        <div className="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 overflow-hidden rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2 shrink-0">
            <Kbd className="shrink-0">
              <CornerDownLeftIcon />
            </Kbd>{" "}
            {showGoToPage ? (
              <span className="min-w-0 truncate">Go to Page</span>
            ) : null}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
