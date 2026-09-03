import type { ComponentType } from "react";

import { Badge as BaseBadge } from "@/registry/base/badge";
import { Button as BaseButton } from "@/registry/base/button";
import { Checkbox as BaseCheckbox } from "@/registry/base/checkbox";
import { DropdownMenu as BaseDropdownMenu } from "@/registry/base/dropdown-menu";
import { Input as BaseInput } from "@/registry/base/input";
import { InputGroup as BaseInputGroup } from "@/registry/base/input-group";
import { RadioGroup as BaseRadioGroup } from "@/registry/base/radio-group";
import { Separator as BaseSeparator } from "@/registry/base/separator";
import Sidebar01Page from "@/registry/base/sidebar-01/page";
import { Skeleton as BaseSkeleton } from "@/registry/base/skeleton";
import { Spinner as BaseSpinner } from "@/registry/base/spinner";
import { Textarea as BaseTextarea } from "@/registry/base/textarea";
import { Tooltip as BaseTooltip } from "@/registry/base/tooltip";

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

const registrySources = import.meta.glob(
  ["../../registry/**/*.tsx", "../../registry/**/*.ts"],
  {
    eager: true,
    import: "default",
    query: "?raw",
  }
) as Record<string, string>;

const exampleSources = import.meta.glob("../../../examples/**/*.tsx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const exampleModules = import.meta.glob("../../../examples/**/*.tsx", {
  eager: true,
}) as Record<string, DemoModule>;

const normalizePath = (value: string) => value.replaceAll("\\", "/");

const toDemoName = (filePath: string) =>
  normalizePath(filePath)
    .replace(/^.*\/examples\//, "")
    .replace(/\.tsx$/, "");

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
  badge: BaseBadge as RegistryComponent,
  button: BaseButton as RegistryComponent,
  checkbox: BaseCheckbox as RegistryComponent,
  "dropdown-menu": BaseDropdownMenu as RegistryComponent,
  input: BaseInput as RegistryComponent,
  "input-group": BaseInputGroup as RegistryComponent,
  "radio-group": BaseRadioGroup as RegistryComponent,
  separator: BaseSeparator as RegistryComponent,
  skeleton: BaseSkeleton as RegistryComponent,
  spinner: BaseSpinner as RegistryComponent,
  textarea: BaseTextarea as RegistryComponent,
  tooltip: BaseTooltip as RegistryComponent,
  "sidebar-01": Sidebar01Page as RegistryComponent,
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
