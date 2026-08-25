"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CopyButton } from "@/shared/components/copy-button";
import { getIconForPackageManager } from "@/shared/components/icons";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs";
import type { PackageManager } from "@/shared/hooks/use-package-manager";
import { usePackageManager } from "@/shared/hooks/use-package-manager";
import type { Event } from "@/shared/lib/events";
import { highlightCode } from "@/shared/lib/highlight-code";
import { cn } from "@/shared/lib/utils";

export const CodeBlockCommand = ({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
  className,
  copyEvent = "copy_npm_command",
}: {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
  className?: string;
  copyEvent?: Event["name"];
}) => {
  const [packageManager, setPackageManager] = usePackageManager();
  const [highlightedCommands, setHighlightedCommands] = useState<
    Partial<Record<PackageManager, string>>
  >({});

  const commandTabs = useMemo(
    () => ({
      bun: __bun__,
      npm: __npm__,
      pnpm: __pnpm__,
      yarn: __yarn__,
    }),
    [__npm__, __pnpm__, __yarn__, __bun__]
  );

  const handlePackageManagerChange = useCallback(
    (value: string) => setPackageManager(value as PackageManager),
    [setPackageManager]
  );

  const commandEntries = useMemo(
    () =>
      Object.entries(commandTabs) as Array<
        [PackageManager, string | undefined]
      >,
    [commandTabs]
  );

  useEffect(() => {
    let isMounted = true;

    const loadHighlightedCommands = async () => {
      const highlights = await Promise.all(
        commandEntries.map(
          async ([key, command]) =>
            [key, command ? await highlightCode(command, "bash") : ""] as const
        )
      );

      if (!isMounted) {
        return;
      }

      setHighlightedCommands(
        highlights.reduce<Partial<Record<PackageManager, string>>>(
          (commands, [key, highlightedCommand]) => {
            commands[key] = highlightedCommand;
            return commands;
          },
          {}
        )
      );
    };

    void loadHighlightedCommands();

    return () => {
      isMounted = false;
    };
  }, [commandEntries]);

  const copyValue = useMemo(
    () => commandTabs[packageManager] || "",
    [commandTabs, packageManager]
  );

  return (
    <div
      className={cn(
        "bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm",
        className
      )}
    >
      <Tabs
        className="gap-0"
        onValueChange={handlePackageManagerChange}
        value={packageManager}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0 [&_svg]:me-2 [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForPackageManager(packageManager)}

            {commandEntries.map(([key]) => (
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
        <div className="no-scrollbar overflow-x-auto">
          {commandEntries.map(([key, value]) => (
            <TabsContent
              key={key}
              className="mt-0 w-max min-w-full"
              value={key}
            >
              {highlightedCommands[key] ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightedCommands[key],
                  }}
                />
              ) : (
                <pre className="px-4 py-3.5">
                  <code
                    data-slot="code-block"
                    data-language="bash"
                    className="block whitespace-pre font-mono text-sm leading-6 [font-feature-settings:'liga'_0,'calt'_0] [font-variant-ligatures:none]"
                  >
                    {value}
                  </code>
                </pre>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <CopyButton
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        value={copyValue}
        event={copyEvent}
      />
    </div>
  );
};
