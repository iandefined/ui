import type { ComponentType } from "react";

import { Button as BaseButton } from "@/registry/base/button";
import Sidebar01Page from "@/registry/base/sidebar-01/page";
import { YourComponent } from "@/registry/base/your-component";

import registryManifest from "../../../registry.json";

type RegistryFile = {
  path: string;
  type: string;
  target?: string;
  content?: string;
};

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  categories?: string[];
  files?: RegistryFile[];
};

type RegistryComponent = ComponentType<Record<string, never>>;

type DemoModule = {
  default?: RegistryComponent;
};

const registrySources = import.meta.glob("../../registry/**/*.tsx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const exampleSources = import.meta.glob("../../../examples/*.tsx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const exampleModules = import.meta.glob("../../../examples/*.tsx", {
  eager: true,
}) as Record<string, DemoModule>;

const normalizePath = (value: string) => value.replaceAll("\\", "/");

const toDemoName = (filePath: string) =>
  normalizePath(filePath)
    .split("/")
    .at(-1)
    ?.replace(/\.tsx$/, "");

const toRootPath = (filePath: string) =>
  normalizePath(filePath)
    .replace(/^\.\.\/\.\.\/registry\//, "src/registry/")
    .replace(/^\.\.\/\.\.\/\.\.\/examples\//, "examples/");

const sourceByRootPath = new Map<string, string>(
  [...Object.entries(registrySources), ...Object.entries(exampleSources)].map(
    ([filePath, source]) => [toRootPath(filePath), source]
  )
);

const manifestItems = registryManifest.items as RegistryItem[];

const allRegistryItems = Object.fromEntries(
  manifestItems.map((item) => [item.name, item])
) as Record<string, RegistryItem>;

const registryComponents: Record<string, RegistryComponent> = {
  button: BaseButton as RegistryComponent,
  "sidebar-01": Sidebar01Page as RegistryComponent,
  "your-component": YourComponent as RegistryComponent,
};

const demoComponentsByName = Object.fromEntries(
  Object.entries(exampleModules).flatMap(([filePath, mod]) => {
    const name = toDemoName(filePath);

    return name && mod.default ? [[name, mod.default]] : [];
  })
) as Record<string, RegistryComponent>;

const withFileContent = (item: RegistryItem): RegistryItem => ({
  ...item,
  files: item.files?.map((file) => ({
    ...file,
    content: sourceByRootPath.get(normalizePath(file.path)),
  })),
});

export const readOptionalFromRoot = async (
  relativePath: string
): Promise<string | null> => {
  return sourceByRootPath.get(normalizePath(relativePath)) ?? null;
};

const getDemoComponent = (name: string) => demoComponentsByName[name] ?? null;

export const getDemoItem = async (
  name: string
): Promise<RegistryItem | null> => {
  const demo = getDemoComponent(name);

  if (!demo) {
    return null;
  }

  const path = `examples/${name}.tsx`;
  const content = await readOptionalFromRoot(path);

  if (!content) {
    return null;
  }

  return {
    name,
    title: name,
    type: "registry:example",
    files: [{ path, type: "registry:example", content }],
  };
};

export const getRegistryComponent = (name: string) => {
  const demo = getDemoComponent(name);

  if (demo) {
    return demo;
  }

  return registryComponents[name] ?? null;
};

export const getRegistryItem = async (
  name: string
): Promise<RegistryItem | null> => {
  const item = allRegistryItems[name];

  return item ? withFileContent(item) : null;
};
