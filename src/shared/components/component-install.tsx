"use client";

import { AlertCircleIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/base/tabs";
import { CodeBlockCommand } from "@/shared/components/code-block-command";
import { ComponentSource } from "@/shared/components/component-source";
import { useConfig } from "@/shared/hooks/use-config";
import { getRegistryItemSync, type RegistryFile } from "@/shared/lib/registry";

export type ComponentInstallProps = {
  name: string;
};

const registryUrl = (name: string) =>
  `https://ui.iandefined.com/r/${name}.json`;

const hasCnImport = (files: RegistryFile[]) =>
  files.some((file) => /from\s*["']@\/lib\/utils["']/.test(file.content ?? ""));

const dependenciesCommand = (dependencies: string[]) => dependencies.join(" ");

const cssImport = (target: string) => `@import "./${target}";`;

const ThemeVariables = ({
  light,
  dark,
}: {
  light?: Record<string, string>;
  dark?: Record<string, string>;
}) => {
  if (!light && !dark) return null;

  const toBlock = (selector: string, variables: Record<string, string>) =>
    `${selector} {\n${Object.entries(variables)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n")}\n}`;
  const code = [
    light ? toBlock(":root", light) : null,
    dark ? toBlock(".dark", dark) : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Add the required theme variables:</p>
      <ComponentSource code={code} language="css" collapsible={false} />
    </div>
  );
};

export function ComponentInstall({ name }: ComponentInstallProps) {
  const [config, setConfig] = useConfig();
  const item = getRegistryItemSync(name);

  if (!item) {
    return (
      <div
        className="not-prose border-destructive/40 bg-destructive/5 text-destructive my-6 flex items-start gap-3 rounded-xl border p-4 text-sm"
        role="alert"
      >
        <AlertCircleIcon className="size-4 shrink-0" aria-hidden="true" />
        <p>
          No registry item named <code>{name}</code> exists. Check the item name
          in <code>registry.json</code> and run <code>pnpm docs:check</code>
          before publishing.
        </p>
      </div>
    );
  }

  const files = item.files ?? [];
  const styleFiles = files.filter((file) => file.type === "registry:style");
  const sourceFiles = files.filter((file) => file.type !== "registry:style");
  const dependencies = item.dependencies ?? [];
  const registryDependencies = item.registryDependencies ?? [];
  const needsCn = hasCnImport(sourceFiles);

  return (
    <div className="not-prose my-6">
      <Tabs
        value={config.installationType}
        onValueChange={(value) =>
          setConfig({
            installationType: value as typeof config.installationType,
          })
        }
      >
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="mt-4">
          <CodeBlockCommand
            __npm__={`npx shadcn@latest add ${registryUrl(item.name)}`}
            __pnpm__={`pnpm dlx shadcn@latest add ${registryUrl(item.name)}`}
            __yarn__={`yarn dlx shadcn@latest add ${registryUrl(item.name)}`}
            __bun__={`bunx --bun shadcn@latest add ${registryUrl(item.name)}`}
          />
        </TabsContent>
        <TabsContent value="manual" className="mt-4 space-y-6">
          {registryDependencies.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Install registry dependencies first:
              </p>
              <CodeBlockCommand
                __npm__={`npx shadcn@latest add ${registryDependencies.join(" ")}`}
                __pnpm__={`pnpm dlx shadcn@latest add ${registryDependencies.join(" ")}`}
                __yarn__={`yarn dlx shadcn@latest add ${registryDependencies.join(" ")}`}
                __bun__={`bunx --bun shadcn@latest add ${registryDependencies.join(" ")}`}
              />
            </div>
          ) : null}
          {dependencies.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Install npm dependencies:</p>
              <CodeBlockCommand
                __npm__={`npm install ${dependenciesCommand(dependencies)}`}
                __pnpm__={`pnpm add ${dependenciesCommand(dependencies)}`}
                __yarn__={`yarn add ${dependenciesCommand(dependencies)}`}
                __bun__={`bun add ${dependenciesCommand(dependencies)}`}
              />
            </div>
          ) : null}
          {needsCn ? (
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                Ensure the <code>cn</code> utility exists at{" "}
                <code>lib/utils.ts</code>.
              </p>
              <ComponentSource
                code={`import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`}
                language="ts"
                title="lib/utils.ts"
                collapsible={false}
              />
            </div>
          ) : null}
          {sourceFiles.length > 0 ? (
            <div className="space-y-4 text-sm">
              <p className="font-medium">
                Copy the source files to these consumer paths:
              </p>
              <ul className="space-y-1">
                {sourceFiles.map((file) => (
                  <li key={file.path} className="flex flex-wrap gap-x-2">
                    <code>{file.path}</code>
                    <span aria-hidden="true">→</span>
                    <code>{file.target ?? file.path}</code>
                  </li>
                ))}
              </ul>
              {sourceFiles.map((file) => (
                <ComponentSource
                  key={file.path}
                  src={file.path}
                  title={file.target ?? file.path}
                />
              ))}
            </div>
          ) : null}
          {styleFiles.length > 0 ? (
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium">
                  Copy and import the stylesheet
                  {styleFiles.length > 1 ? "s" : ""}:
                </p>
                <ul className="space-y-1">
                  {styleFiles.map((file) => (
                    <li key={file.path} className="flex flex-wrap gap-x-2">
                      <code>{file.path}</code>
                      <span aria-hidden="true">→</span>
                      <code>{file.target ?? file.path}</code>
                    </li>
                  ))}
                </ul>
              </div>
              {styleFiles.map((file) => (
                <ComponentSource
                  key={file.path}
                  language="css"
                  src={file.path}
                  title={file.target ?? file.path}
                />
              ))}
              <ComponentSource
                code={styleFiles
                  .map((file) => cssImport(file.target ?? file.path))
                  .join("\n")}
                language="css"
                collapsible={false}
              />
            </div>
          ) : null}
          <ThemeVariables
            light={item.cssVars?.light}
            dark={item.cssVars?.dark}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
