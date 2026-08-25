import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { defineConfig } from "vite-plus";

const ignoredPaths = [
  "node_modules",
  ".next",
  ".vercel",
  "dist",
  "public/.well-known/agent-skills/site-skill.md",
  "public/r/**",
  "src/routeTree.gen.ts",
  ".agents/**",
  ".cursor/**",
  ".changeset/**",
  ".claude/**",
];

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const docsDir = join(rootDir, "content", "docs");
const pathPolyfill = join(rootDir, "src", "polyfills", "node-path.ts");

const docsPaths = (dir = docsDir): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return docsPaths(fullPath);
    }

    if (!stats.isFile() || !entry.endsWith(".mdx")) {
      return [];
    }

    const routeSegments = relative(docsDir, fullPath)
      .split(/[\\/]/)
      .map((segment) => segment.replace(/\.mdx$/, ""))
      .filter((segment) => segment !== "(root)" && segment !== "index");

    return [
      `/docs${routeSegments.length ? `/${routeSegments.join("/")}` : ""}`,
    ];
  });

const prerenderPaths = Array.from(new Set(["/", ...docsPaths()])).sort();

export default defineConfig({
  plugins: [
    ...mdx(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    ...tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        retryCount: 2,
      },
      pages: prerenderPaths.map((path) => ({
        path,
        prerender: { enabled: true },
      })),
      spa: {
        enabled: true,
        prerender: {
          crawlLinks: true,
          retryCount: 2,
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: [
      { find: "node:path", replacement: pathPolyfill },
      { find: "path", replacement: pathPolyfill },
    ],
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  staged: {
    "*.{js,jsx,ts,tsx,json,jsonc,css,md,mdx,yml,yaml}": "vp check --fix",
  },
  fmt: {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: "lf",
    ignorePatterns: ignoredPaths,
    jsxSingleQuote: false,
    printWidth: 80,
    quoteProps: "as-needed",
    semi: true,
    singleQuote: false,
    sortImports: {
      groups: [
        "builtin",
        "external",
        ["internal", "subpath"],
        ["parent", "sibling", "index"],
        "style",
        "unknown",
      ],
      internalPattern: ["@/"],
      order: "asc",
      sortSideEffects: true,
    },
    sortPackageJson: true,
    tabWidth: 2,
    trailingComma: "es5",
    useTabs: false,
  },
  lint: {
    env: {
      browser: true,
      builtin: true,
      node: true,
    },
    ignorePatterns: [...ignoredPaths, "*.md"],
    plugins: [
      "eslint",
      "typescript",
      "react",
      "react-perf",
      "jsx-a11y",
      "import",
      "promise",
      "unicorn",
    ],
    rules: {
      "eslint/no-console": ["warn", { allow: ["debug", "error", "warn"] }],
      "typescript/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports", prefer: "type-imports" },
      ],
    },
  },
});
