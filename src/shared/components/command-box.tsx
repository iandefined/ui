"use client";

import { useEffect, useRef, useState } from "react";

import { TextMorph } from "@/registry/base/text-morph";
import { CopyButton } from "@/shared/components/copy-button";
import { getIconForPackageManager } from "@/shared/components/icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { SITE } from "@/shared/constants/site";
import type { PackageManager } from "@/shared/hooks/use-package-manager";
import { usePackageManager } from "@/shared/hooks/use-package-manager";
import { cn } from "@/shared/lib/utils";

import registry from "../../../registry.json";

const pmCommands = {
  bun: "bunx --bun shadcn@latest",
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "yarn dlx shadcn@latest",
};

const registryItemNames = registry.items
  .map((item) => item.name)
  .toSorted((a, b) =>
    a.localeCompare(b, "en", {
      sensitivity: "base",
    })
  );

export const CommandBox = ({ className }: { className?: string }) => {
  const [packageManager, setPackageManager] = usePackageManager();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const currentItem = registryItemNames[currentItemIndex] ?? "";

  const currentItemRef = useRef(currentItem);

  useEffect(() => {
    currentItemRef.current = currentItem;
  }, [currentItem]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentItemIndex((index) => (index + 1) % registryItemNames.length);
    }, 1500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm",
        className
      )}
    >
      <Tabs
        className="gap-0"
        onValueChange={(value: string) => {
          setPackageManager(value as PackageManager);
        }}
        value={packageManager}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0 [&_svg]:me-2 [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForPackageManager(packageManager)}

            {Object.entries(pmCommands).map(([key]) => (
              <TabsTrigger
                key={key}
                className="data-active:border-input h-7 border border-transparent pt-0.5 data-active:shadow-none"
                value={key}
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <pre className="no-scrollbar -translate-y-px overflow-x-auto px-4 py-3.5 overscroll-x-contain">
          <code
            data-language="bash"
            className="block min-w-full w-max whitespace-nowrap text-left font-mono text-sm text-muted-foreground"
          >
            {Object.entries(pmCommands).map(([key, command]) => (
              <TabsContent
                key={key}
                value={key}
                render={<span className="inline-block" />}
              >
                <span className="select-none">$ </span>
                {command} add
              </TabsContent>
            ))}{" "}
            <span>{SITE.REGISTRY}/r/</span>
            <TextMorph
              animation="snappy"
              className="text-foreground"
              trend={-1}
            >
              {currentItem}
            </TextMorph>
            <span className="text-muted-foreground">.json</span>
          </code>
        </pre>
      </Tabs>

      <CopyButton
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        value={() =>
          `${pmCommands[packageManager]} add ${SITE.REGISTRY}/r/${currentItemRef.current}.json`
        }
        event="copy_npm_command"
      />
    </div>
  );
};
