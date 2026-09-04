/* eslint-disable no-console */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const docsRoot = path.join(root, "content", "docs");
const examplesRoot = path.join(root, "examples");
const manifest = JSON.parse(
  await readFile(path.join(root, "registry.json"), "utf8")
);
const errors = [];

const normalize = (value) => value.replaceAll("\\", "/");
const report = (file, message) =>
  errors.push(`${normalize(path.relative(root, file))}: ${message}`);

const listFiles = async (directory, extension) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listFiles(file, extension);
      }

      return !extension || entry.name.endsWith(extension) ? [file] : [];
    })
  );

  return files.flat();
};

const mdxFiles = await listFiles(docsRoot, ".mdx");
const exampleFiles = new Set(
  (await listFiles(examplesRoot, ".tsx")).map((file) =>
    normalize(path.relative(examplesRoot, file)).replace(/\.tsx$/, "")
  )
);
const docs = await Promise.all(
  mdxFiles.map(async (file) => ({
    content: await readFile(file, "utf8"),
    file,
    relative: normalize(path.relative(docsRoot, file)),
  }))
);

const routeForDoc = (relative) => {
  const withoutExtension = relative.replace(/\.mdx$/, "");
  const segments = withoutExtension
    .split("/")
    .filter((segment) => !/^\(.+\)$/.test(segment));

  if (segments.at(-1) === "index") {
    segments.pop();
  }

  return `/docs${segments.length ? `/${segments.join("/")}` : ""}`;
};

const routes = new Set(docs.map((doc) => routeForDoc(doc.relative)));
const docsBySlug = new Map();

for (const doc of docs) {
  const slug = path.basename(doc.file, ".mdx");
  docsBySlug.set(slug, [...(docsBySlug.get(slug) ?? []), doc]);
}

const targetToItem = new Map(
  manifest.items.flatMap((item) =>
    (item.files ?? [])
      .filter((file) => file.target)
      .map((file) => [normalize(file.target), item.name])
  )
);
const sourceToItem = new Map(
  manifest.items.flatMap((item) =>
    (item.files ?? []).map((file) => [normalize(file.path), item.name])
  )
);
const dependencyPackage = (specifier) =>
  specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : specifier.split("/")[0];
const frameworkPackages = new Set(["react", "react-dom"]);

for (const item of manifest.items) {
  const expectedDependencies = new Set();
  const expectedRegistryDependencies = new Set();

  for (const file of item.files ?? []) {
    const source = path.join(root, file.path);
    let sourceContent = "";
    try {
      sourceContent = await readFile(source, "utf8");
    } catch {
      report(
        path.join(root, "registry.json"),
        `${item.name} references missing ${file.path}`
      );
    }

    if (!file.target) {
      report(
        path.join(root, "registry.json"),
        `${item.name} file ${file.path} has no consumer target`
      );
    }

    if (!/\.[cm]?[jt]sx?$/.test(file.path)) {
      continue;
    }

    for (const match of sourceContent.matchAll(/from\s+["']([^"']+)["']/g)) {
      const specifier = match[1];

      if (specifier === "@/lib/utils") {
        expectedDependencies.add("clsx");
        expectedDependencies.add("tailwind-merge");
        continue;
      }

      if (specifier.startsWith("@/")) {
        const target = `${specifier.slice(2)}.tsx`;
        const dependencyItem = targetToItem.get(target);
        if (dependencyItem && dependencyItem !== item.name) {
          expectedRegistryDependencies.add(dependencyItem);
        }
        continue;
      }

      if (specifier.startsWith(".")) {
        const importedPath = normalize(
          path.join(path.dirname(file.path), `${specifier}.tsx`)
        );
        const dependencyItem = sourceToItem.get(importedPath);
        if (dependencyItem && dependencyItem !== item.name) {
          expectedRegistryDependencies.add(dependencyItem);
        }
        continue;
      }

      const dependency = dependencyPackage(specifier);
      if (!frameworkPackages.has(dependency)) {
        expectedDependencies.add(dependency);
      }
    }
  }

  const actualDependencies = new Set(item.dependencies ?? []);
  for (const dependency of expectedDependencies) {
    if (!actualDependencies.has(dependency)) {
      report(
        path.join(root, "registry.json"),
        `${item.name} is missing npm dependency ${dependency}`
      );
    }
  }
  for (const dependency of actualDependencies) {
    if (!expectedDependencies.has(dependency)) {
      report(
        path.join(root, "registry.json"),
        `${item.name} has unused npm dependency ${dependency}`
      );
    }
  }

  const localRegistryDependencies = new Set(
    (item.registryDependencies ?? []).flatMap((dependency) => {
      const match = dependency.match(
        /^https:\/\/ui\.iandefined\.com\/r\/([^/]+)\.json$/
      );
      return match ? [match[1]] : [];
    })
  );
  for (const dependency of expectedRegistryDependencies) {
    if (!localRegistryDependencies.has(dependency)) {
      report(
        path.join(root, "registry.json"),
        `${item.name} is missing registry dependency ${dependency}`
      );
    }
  }
  for (const dependency of localRegistryDependencies) {
    if (!expectedRegistryDependencies.has(dependency)) {
      report(
        path.join(root, "registry.json"),
        `${item.name} has unused registry dependency ${dependency}`
      );
    }
    if (!manifest.items.some((candidate) => candidate.name === dependency)) {
      report(
        path.join(root, "registry.json"),
        `${item.name} references unknown registry dependency ${dependency}`
      );
    }
  }

  if (item.type === "registry:block") {
    continue;
  }

  const matches = docsBySlug.get(item.name) ?? [];
  if (matches.length !== 1) {
    report(
      path.join(root, "registry.json"),
      `${item.name} must have exactly one authored documentation page; found ${matches.length}`
    );
  }
}

const headingIndex = (content, heading) =>
  content.search(new RegExp(`^## ${heading}$`, "m"));

const validateOrderedHeadings = (doc, content, headings) => {
  let previous = -1;
  for (const heading of headings) {
    const index = headingIndex(content, heading);
    if (index === -1) {
      report(doc.file, `missing required ## ${heading} section`);
      continue;
    }
    if (index < previous) {
      report(doc.file, `## ${heading} is out of canonical order`);
    }
    previous = Math.max(previous, index);
  }
};

for (const doc of docs) {
  if (!doc.content.startsWith("---\n") && !doc.content.startsWith("---\r\n")) {
    report(doc.file, "must begin with frontmatter (---)");
  }

  const authoredContent = doc.content.replace(/```[\s\S]*?```/g, "");
  const isComponent = doc.relative.startsWith("components/");
  const isRegistryReference =
    isComponent ||
    doc.relative.startsWith("hooks/") ||
    doc.relative.startsWith("utilities/");
  const isIndex = path.basename(doc.file) === "index.mdx";

  if (isComponent && !isIndex) {
    validateOrderedHeadings(doc, authoredContent, [
      "Preview",
      "Installation",
      "Usage",
      "Examples",
      "API Reference",
    ]);
  } else if (isRegistryReference && !isIndex) {
    validateOrderedHeadings(doc, authoredContent, [
      "Installation",
      "Usage",
      "API Reference",
    ]);
  }

  if (isRegistryReference && !isIndex) {
    const slug = path.basename(doc.file, ".mdx");
    const installPattern = new RegExp(
      `<ComponentInstall\\s+name=["']${slug}["']\\s*/>`
    );
    if (!installPattern.test(authoredContent)) {
      report(
        doc.file,
        `must install through <ComponentInstall name="${slug}" />`
      );
    }
    if (authoredContent.includes("<CodeTabs>")) {
      report(doc.file, "contains hand-authored installation tabs");
    }
  }

  if (authoredContent.includes("—")) {
    report(doc.file, "contains an em dash outside a code fence");
  }

  for (const match of authoredContent.matchAll(
    /<ComponentInstall\b([^>]*)\/>/g
  )) {
    const name = match[1].match(/\bname=["']([^"']+)["']/)?.[1];
    if (!name || !manifest.items.some((item) => item.name === name)) {
      report(
        doc.file,
        `references unknown ComponentInstall item ${name ?? "(missing name)"}`
      );
    }
  }

  for (const match of authoredContent.matchAll(
    /<ComponentPreview\b([^>]*)>/g
  )) {
    const attributes = match[1];
    const name = attributes.match(/\bname=["']([^"']+)["']/)?.[1];
    const selfClosing = match[0].endsWith("/>");
    const type = attributes.match(/\btype=["']([^"']+)["']/)?.[1];

    if (!name) {
      report(doc.file, "ComponentPreview is missing a static name");
      continue;
    }

    const isBlock =
      type === "block" &&
      manifest.items.some(
        (item) => item.name === name && item.type === "registry:block"
      );
    if (selfClosing && !exampleFiles.has(name) && !isBlock) {
      report(doc.file, `preview ${name} has no matching example`);
    }
  }

  for (const match of authoredContent.matchAll(
    /\[[^\]]+\]\((\/docs[^)#?]*)(?:#[^)]+)?\)/g
  )) {
    const route = match[1].replace(/\/$/, "") || "/docs";
    if (!routes.has(route)) {
      report(doc.file, `links to missing documentation route ${match[1]}`);
    }
  }
}

const formsMeta = JSON.parse(
  await readFile(path.join(docsRoot, "(root)", "meta.json"), "utf8")
);
const themingIndex = formsMeta.pages?.indexOf("theming") ?? -1;
const formsIndex = formsMeta.pages?.indexOf("forms") ?? -1;
if (formsIndex !== themingIndex + 1) {
  report(
    path.join(docsRoot, "(root)", "meta.json"),
    "forms must appear immediately after theming"
  );
}

if (errors.length > 0) {
  console.error(`Documentation checks failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Documentation checks passed for ${docs.length} pages and ${manifest.items.length} registry items.`
  );
}
