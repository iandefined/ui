"use client";

import {
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  Loader2Icon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CopyButton } from "@/shared/components/copy-button";
import { Button } from "@/shared/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import type { RegistryBlock } from "@/shared/lib/blocks";
import { formatCode } from "@/shared/lib/format-code";
import { highlightCode } from "@/shared/lib/highlight-code";
import { readOptionalFromRoot } from "@/shared/lib/registry";
import { cn } from "@/shared/lib/utils";

type CodeFile = RegistryBlock["files"][number] & {
  displayPath: string;
};

type TreeFile = {
  kind: "file";
  file: CodeFile;
  name: string;
  path: string;
};

type TreeDirectory = {
  kind: "directory";
  children: TreeItem[];
  name: string;
  path: string;
};

type TreeItem = TreeDirectory | TreeFile;

const getDisplayPath = (
  block: RegistryBlock,
  file: RegistryBlock["files"][number]
) => {
  if (file.target) {
    return file.target;
  }

  const blockPathPart = `/${block.name}/`;
  const [, nestedPath] = file.path.split(blockPathPart);

  return nestedPath ?? file.path.split("/").at(-1) ?? file.path;
};

const getLanguage = (path: string) => path.split(".").at(-1) ?? "tsx";

const buildFileTree = (files: CodeFile[]): TreeItem[] => {
  const root: TreeDirectory = {
    children: [],
    kind: "directory",
    name: "",
    path: "",
  };

  for (const file of files) {
    const parts = file.displayPath.split("/").filter(Boolean);
    let current = root;

    parts.forEach((part, index) => {
      const path = parts.slice(0, index + 1).join("/");
      const isFile = index === parts.length - 1;

      if (isFile) {
        current.children.push({
          file,
          kind: "file",
          name: part,
          path,
        });
        return;
      }

      let directory = current.children.find(
        (item): item is TreeDirectory =>
          item.kind === "directory" && item.path === path
      );

      if (!directory) {
        directory = {
          children: [],
          kind: "directory",
          name: part,
          path,
        };
        current.children.push(directory);
      }

      current = directory;
    });
  }

  const sortItems = (items: TreeItem[]) => {
    items.sort((a, b) => {
      if (a.kind !== b.kind) {
        return a.kind === "directory" ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });

    for (const item of items) {
      if (item.kind === "directory") {
        sortItems(item.children);
      }
    }
  };

  sortItems(root.children);

  return root.children;
};

export function BlockCodeExplorer({ block }: { block: RegistryBlock }) {
  const files = useMemo<CodeFile[]>(
    () =>
      block.files.map((file) => ({
        ...file,
        displayPath: getDisplayPath(block, file),
      })),
    [block]
  );
  const [activePath, setActivePath] = useState(files[0]?.path ?? "");
  const [code, setCode] = useState("");
  const [codeHtml, setCodeHtml] = useState("");
  const [isLoadingCode, setIsLoadingCode] = useState(false);

  const fileTree = useMemo(() => buildFileTree(files), [files]);
  const activeFile = useMemo(
    () => files.find((file) => file.path === activePath) ?? files[0],
    [activePath, files]
  );

  useEffect(() => {
    setActivePath(files[0]?.path ?? "");
  }, [files]);

  useEffect(() => {
    let isMounted = true;

    const loadCode = async () => {
      if (!activeFile) {
        return;
      }

      setIsLoadingCode(true);

      try {
        const rawCode = await readOptionalFromRoot(activeFile.path);
        const formattedCode = await formatCode(rawCode ?? "");
        const highlightedCode = await highlightCode(
          formattedCode,
          getLanguage(activeFile.displayPath)
        );

        if (isMounted) {
          setCode(formattedCode);
          setCodeHtml(highlightedCode);
        }
      } finally {
        if (isMounted) {
          setIsLoadingCode(false);
        }
      }
    };

    loadCode();

    return () => {
      isMounted = false;
    };
  }, [activeFile]);

  if (!activeFile) {
    return null;
  }

  return (
    <div className="flex overflow-hidden rounded-xl border bg-background">
      <div className="hidden w-full max-w-[20rem] shrink-0 border-r md:block">
        <div className="flex h-12 items-center border-b bg-sidebar pr-4 pl-7 font-medium">
          Explorer
        </div>
        <div className="w-full p-2">
          <Tree
            activePath={activeFile.path}
            isLoadingCode={isLoadingCode}
            onSelectFile={setActivePath}
            tree={fileTree}
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between gap-4 border-b bg-sidebar ps-5 pe-2">
          <div className="flex min-w-0 items-center gap-2">
            <FileIcon className="size-4 shrink-0" />
            <p className="truncate font-medium leading-none">
              {activeFile.displayPath}
            </p>
          </div>
          <CopyButton
            className="size-8"
            value={code}
            event="copy_primitive_code"
          >
            <span className="sr-only">Copy code</span>
          </CopyButton>
        </div>
        <CodeBlock codeHtml={codeHtml} isLoadingCode={isLoadingCode} />
      </div>
    </div>
  );
}

function Tree({
  activePath,
  isLoadingCode,
  onSelectFile,
  tree,
}: {
  activePath: string;
  isLoadingCode: boolean;
  onSelectFile: (path: string) => void;
  tree: TreeItem[];
}) {
  return (
    <div className="space-y-1">
      {tree.map((item) => (
        <TreeItem
          activePath={activePath}
          isLoadingCode={isLoadingCode}
          item={item}
          key={item.path}
          onSelectFile={onSelectFile}
        />
      ))}
    </div>
  );
}

function TreeItem({
  activePath,
  isLoadingCode,
  item,
  onSelectFile,
}: {
  activePath: string;
  isLoadingCode: boolean;
  item: TreeItem;
  onSelectFile: (path: string) => void;
}) {
  if (item.kind === "file") {
    const isActive = activePath === item.file.path;

    return (
      <Tooltip>
        <TooltipTrigger
          delay={1000}
          render={
            <Button
              className="h-8 w-full justify-start px-2 text-base font-medium text-foreground/80"
              data-active={isActive || undefined}
              onClick={() => onSelectFile(item.file.path)}
              size="sm"
              type="button"
              variant={isActive ? "secondary" : "ghost"}
            />
          }
        >
          {isLoadingCode && isActive ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <FileIcon className="text-muted-foreground" />
          )}
          <span className="truncate">{item.name}</span>
        </TooltipTrigger>
        <TooltipContent side="right">{item.name}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Collapsible
      className="group/collapsible [&[data-open]>button>svg:first-child]:rotate-90"
      defaultOpen={activePath.includes(item.path)}
    >
      <CollapsibleTrigger
        render={
          <Button
            className="h-8 w-full justify-start px-2 text-base font-medium text-foreground/80"
            size="sm"
            type="button"
            variant="ghost"
          />
        }
      >
        <ChevronRightIcon className="transition-transform" />
        <FolderIcon className="fill-muted-foreground stroke-muted-foreground" />
        <span className="truncate">{item.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden ps-4">
        <Tree
          activePath={activePath}
          isLoadingCode={isLoadingCode}
          onSelectFile={onSelectFile}
          tree={item.children}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

function CodeBlock({
  codeHtml,
  isLoadingCode,
}: {
  codeHtml: string;
  isLoadingCode: boolean;
}) {
  return (
    <div className="relative h-full">
      {isLoadingCode ? (
        <Loader2Icon className="absolute inset-0 z-10 m-auto size-8 animate-spin text-muted-foreground" />
      ) : null}
      <div
        className={cn(
          "h-full max-h-svh overflow-auto text-sm [&>pre]:h-full [&>pre]:overflow-x-auto [&>pre]:pt-4 [&_.line]:leading-[1.7]",
          isLoadingCode && "opacity-40"
        )}
        dangerouslySetInnerHTML={{ __html: codeHtml }}
      />
    </div>
  );
}
