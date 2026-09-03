# Application Architecture and Platform Conventions

Use this guide when developing application code, routing, layouts, server routes, or shared modules outside the component registry.

For registry items and components, see [registry-components.md](registry-components.md). For interface standards, forms, animations, stacking layers, and SVG sizing, see [interface-and-interaction.md](interface-and-interaction.md). For Cloudflare Workers runtime and deployment, see [cloudflare-workers.md](cloudflare-workers.md).

---

## 1. Application Technology Stack

- **Framework**: TanStack Start with TanStack Router. This repository is **not** a Next.js application. Use TanStack APIs for routing, navigation, loaders, server functions, and head management.
- **Runtime & Bundler**: Vite with React 19 and `@cloudflare/vite-plugin`.
- **Styling**: Tailwind CSS v4 with PostCSS.
- **Documentation**: Fumadocs MDX content layer with static pre-rendering.
- **Deployment**: Cloudflare Workers with Worker Static Assets.

---

## 2. Directory Layout & Module Boundaries

- `src/routes/`: TanStack file-based routes (`__root.tsx`, `index.tsx`, `docs/`, `blocks/`).
- `src/shared/`: Shared application code:
  * `components/`: Shell chrome, navigation, headers, footers, search dialogs, MDX components.
  * `hooks/`: App-level React hooks (`use-config`, `use-copy-to-clipboard`).
  * `lib/`: Registry loaders, Shiki highlighters, route helpers.
  * `constants/`: Route paths, metadata, navigation structures.
- `src/registry/base/`: Installable registry components and hooks (see [registry-components.md](registry-components.md)).
- `content/docs/`: Authored Fumadocs MDX documentation pages (see [documentation.md](documentation.md)).
- `examples/`: Reusable demo components for documentation previews.
- `scripts/`: Build-time generators (`generate-static-assets.mjs`).

---

## 3. CSS Architecture and Stylesheet Separation

To ensure installable components remain portable across different user projects, styling is separated into strict layers under `src/styles/`:

1. **`globals.css`**: Core design system tokens (colors, radii, shadows), `@theme` extensions, and base Tailwind imports. Must remain 100% portable for external registry consumers.
2. **`app.css`**: Application chrome, landing page hero styles, and documentation layout framing.
3. **`utilities.css`**: Generic application-level CSS utility classes.
4. **`components.css`**: Repository-only custom component overrides and Fumadocs layout tweaks.
5. **Registry-specific stylesheets** (e.g. `hitbox.css`): Dedicated stylesheets that travel with registry items. See [Registry CSS Standards in registry-components.md](registry-components.md).

---

## 4. Platform and Runtime Boundaries

- **Client vs Server Imports**: Vite externalizes Node modules (`node:crypto`, `node:fs`, `node:path`) for client bundles. Never import Node built-ins into browser-bundled components.
- **Worker SSR Safety**: Code running on Cloudflare Workers during SSR must avoid `node:fs`, `process.cwd()`, or filesystem scanning.
- **No Request-Time Wasm**: Shiki and syntax highlighting tools must use the JavaScript regex engine in Worker-rendered paths to avoid Wasm compilation at runtime.
- **Icons**: Use `lucide-react` icons with the explicit `Icon` suffix (e.g. `CheckIcon`, `Loader2Icon`, `CopyIcon`). Brand icons come from `react-icons/si`.
- **Shadcn Aliases**: If internal shared directories move, keep `components.json` path aliases synchronized.