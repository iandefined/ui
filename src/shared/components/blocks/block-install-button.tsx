"use client";

import { useMemo } from "react";

import { CopyButton } from "@/shared/components/copy-button";
import { getIconForPackageManager } from "@/shared/components/icons";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { SITE } from "@/shared/constants/site";
import type { PackageManager } from "@/shared/hooks/use-package-manager";
import { usePackageManager } from "@/shared/hooks/use-package-manager";

export function BlockInstallButton({ name }: { name: string }) {
  const [packageManager, setPackageManager] = usePackageManager();
  const registryUrl = `${SITE.REGISTRY}/r/${name}.json`;

  const commands = useMemo(
    () => ({
      bun: `bunx --bun shadcn@latest add ${registryUrl}`,
      npm: `npx shadcn@latest add ${registryUrl}`,
      pnpm: `pnpm dlx shadcn@latest add ${registryUrl}`,
      yarn: `yarn shadcn@latest add ${registryUrl}`,
    }),
    [registryUrl]
  );
  const displayCommands = useMemo(
    () => ({
      bun: `bunx --bun shadcn@latest add ${name}`,
      npm: `npx shadcn@latest add ${name}`,
      pnpm: `pnpm dlx shadcn@latest add ${name}`,
      yarn: `yarn shadcn@latest add ${name}`,
    }),
    [name]
  );
  const command = commands[packageManager];
  const displayCommand = displayCommands[packageManager];

  return (
    <div className="inline-flex h-8 overflow-hidden rounded-md border bg-background shadow-xs dark:border-input">
      <CopyButton
        className="h-8 rounded-none border-0 px-2 text-sm font-normal shadow-none"
        event="copy_registry_command"
        value={command}
        variant="outline"
      >
        <span className="ms-0.5 hidden font-normal lg:inline">
          {displayCommand}
        </span>
        <span className="inline font-normal lg:hidden">Copy</span>
      </CopyButton>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    className="h-8 rounded-none border-y-0 border-r-0 px-2.5 shadow-none"
                    size="icon-sm"
                    variant="outline"
                  />
                }
              />
            }
          >
            {getIconForPackageManager(packageManager)}
            <span className="sr-only">Select package manager</span>
          </TooltipTrigger>
          <TooltipContent>Select package manager</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="min-w-32">
          {(Object.keys(commands) as PackageManager[]).map((manager) => (
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              key={manager}
              onClick={() => setPackageManager(manager)}
            >
              <span className="[&_svg]:size-4">
                {getIconForPackageManager(manager)}
              </span>
              <span className="flex-1">{manager}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
