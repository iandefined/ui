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
  "public/docs/**",
  "public/llms.md/**",
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
      `/docs${routeSegments.length > 0 ? `/${routeSegments.join("/")}` : ""}`,
    ];
  });

const prerenderPaths = Array.from(new Set(["/", ...docsPaths()])).toSorted();

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
      pages: prerenderPaths.map((path) => {
        return {
          path,
          prerender: { enabled: true },
        };
      }),
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
  run: {
    tasks: {
      "build:site": {
        command: ["pnpm registry:build", "pnpm static:build", "vp build"],
        env: [
          "NODE_ENV",
          "SITE_URL",
          "VITE_UMAMI_SCRIPT_URL",
          "VITE_UMAMI_WEBSITE_ID",
        ],
      },
    },
  },
  server: {
    port: 3000,
  },
  staged: {
    "*.{js,jsx,ts,tsx,json,jsonc,css,md,mdx,yml,yaml}": "vp run fix",
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
    ignorePatterns: [...ignoredPaths, "scripts/", "*.md"],
    overrides: [
      {
        files: ["src/router.tsx"],
        rules: {
          "typescript/consistent-type-definitions": "off",
        },
      },
    ],
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "react-hooks-js", specifier: "eslint-plugin-react-hooks" },
      {
        name: "eslint-tanstack-router",
        specifier: "@tanstack/eslint-plugin-router",
      },
      {
        name: "eslint-tanstack-query",
        specifier: "@tanstack/eslint-plugin-query",
      },
    ],
    options: { typeAware: true, typeCheck: true },
    plugins: [
      "eslint",
      "react",
      "react-perf",
      "jsx-a11y",
      "typescript",
      "import",
      "promise",
      "jest",
      "unicorn",
    ],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
      "eslint-tanstack-router/create-route-property-order": "error",
      "eslint-tanstack-query/exhaustive-deps": "error",
      "eslint-tanstack-query/no-rest-destructuring": "error",
      "eslint-tanstack-query/stable-query-client": "error",
      "eslint-tanstack-query/no-unstable-deps": "error",
      "eslint-tanstack-query/infinite-query-property-order": "error",
      "eslint-tanstack-query/no-void-query-fn": "warn",
      "eslint-tanstack-query/mutation-property-order": "error",
      "eslint-tanstack-query/prefer-query-options": "warn",
      "react-hooks-js/component-hook-factories": "error",
      "react-hooks-js/config": "error",
      "react-hooks-js/error-boundaries": "error",
      "react-hooks-js/gating": "error",
      "react-hooks-js/globals": "error",
      "react-hooks-js/immutability": "error",
      "react-hooks-js/incompatible-library": "error",
      "react-hooks-js/preserve-manual-memoization": "error",
      "react-hooks-js/purity": "error",
      "react-hooks-js/refs": "error",
      "react-hooks-js/set-state-in-effect": "warn",
      "react-hooks-js/set-state-in-render": "error",
      "react-hooks-js/static-components": "error",
      "react-hooks-js/unsupported-syntax": "error",
      "react-hooks-js/use-memo": "error",
      "react-hooks-js/void-use-memo": "error",
      "eslint/arrow-body-style": [
        "error",
        "as-needed",
        { requireReturnForObjectLiteral: true },
      ],
      "typescript/ban-ts-comment": "error",
      "typescript/consistent-indexed-object-style": ["error", "record"],
      "typescript/consistent-type-definitions": ["error", "type"],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "eslint/curly": ["error", "multi-line"],
      "unicorn/escape-case": "warn",
      "unicorn/explicit-length-check": "warn",
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-props-no-spread-multi": "error",
      "jsx-a11y/no-aria-hidden-on-focusable": "error",
      "unicorn/no-array-reverse": "warn",
      "unicorn/no-array-sort": "warn",
      "eslint/no-console": ["warn", { allow: ["debug"] }],
      "eslint/no-else-return": "error",
      "typescript/no-explicit-any": [
        "error",
        { fixToUnknown: true, ignoreRestArgs: true },
      ],
      "promise/no-new-statics": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "import/no-relative-parent-imports": "error",
      "eslint/no-var": "warn",
      "unicorn/prefer-array-flat-map": "error",
      "eslint/prefer-const": "warn",
      "typescript/prefer-nullish-coalescing": "error",
      "eslint/prefer-object-spread": "error",
      "eslint/prefer-spread": "warn",
      "unicorn/switch-case-braces": ["error", "avoid"],
      "typescript/switch-exhaustiveness-check": "error",
      "unicorn/throw-new-error": "error",
      "jest/valid-title": "error",
      "eslint/yoda": "warn",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/prefer-tag-over-role": "off",
      "typescript/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports", prefer: "type-imports" },
      ],
    },
  },
});
