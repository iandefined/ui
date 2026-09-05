# Registry System

Use this guide when adding or changing an installable registry item, its `registry.json` entry, its consumer targets, registry dependencies, blocks, or published registry artifacts.

For component source contracts, see [component-implementation.md](component-implementation.md). For MDX pages and installation presentation, see [docs-writing.md](docs-writing.md) and [mdx-authoring.md](mdx-authoring.md). For generation and verification, see [docs-and-static-assets.md](docs-and-static-assets.md) and [verification.md](verification.md).

## Source, manifest, and publication

- Installable source belongs in the single `src/registry/base/` namespace. Do not add style namespaces.
- Every public item has one `registry.json` entry with an accurate `name`, `type`, `title`, `description`, dependencies, and `files` mapping.
- `files[].path` names an authored source file; `files[].target` is the consumer destination. UI items normally install to `components/ui/<name>.tsx`.
- Use `registry:ui` for components, `registry:hook` for hooks, `registry:style` for portable CSS utilities, and `registry:block` for multi-file layouts.
- The canonical install endpoint is `https://ui.iandefined.com/r/<name>.json`. Do not edit generated `public/r/*`; change the source or manifest and run the relevant generator.
- `src/shared/lib/registry.ts` is the build-time registry and demo loader. Keep it Worker-safe: bundled manifest data and `import.meta.glob` are allowed; request-time filesystem access is not.

## Dependencies and files

- `dependencies` lists only npm packages imported by the installable source.
- `registryDependencies` lists only registry items imported by the installable source, using canonical registry URLs.
- Never add dependencies solely because an example, docs page, or block preview uses them.
- A hook or style item may target `hooks/` or `styles/` rather than `components/ui/`; make the target match the documented consumer import or CSS import.
- Keep every declared file portable: no imports of application shell code, preview-only modules, or repository-only styles.

## CSS-backed items

- Put installable explicit CSS in `src/styles/<name>.css` and include it in that item's manifest `files` with a consumer target.
- The stylesheet must be self-contained. Record required theme variables in `cssVars` when the registry schema supports them.
- Installation documentation must cover copying the stylesheet, importing it from the consumer CSS entrypoint, required dependencies, and any theme configuration. The generated installation UI is the canonical presentation; do not hand-maintain divergent dependency lists.

## Examples and blocks

- Reusable demos live in `examples/<item>/<example>.tsx`, default-export a component, and import from `@/registry/base/*` so previews exercise publishable code.
- Blocks are multi-file, full-feature UI layouts or page compositions (e.g., sidebars, dashboards, authentication screens) exposed on `/blocks`.
- Register a component in `registryComponents` only when it needs lookup by registry item name. Examples are discovered automatically.

## Adding and Categorizing Blocks

Follow these conventions when adding new blocks:

### 1. File Structure and Categorization
- Place each block in its category and two-digit numeric subfolder:
  `src/registry/base/blocks/<category>/<number>/`
  For example: `src/registry/base/blocks/sidebar/01/`, `src/registry/base/blocks/dashboard/01/`, etc.
  This mirrors how blocks are grouped and exposed under their respective category as Base UI components on `/blocks`.
- Structure inside each block directory:
  * `page.tsx`: The primary block entry point that exports the main composition as default export.
  * `components/`: Companion subcomponents that belong to this block layout (e.g. `app-sidebar.tsx`, `nav-main.tsx`).

### 2. Registry Manifest (`registry.json`)
Add the block entry to the `items` array in `registry.json`:
- `name`: Must follow `<category>-<number>` (e.g. `"sidebar-01"`).
- `type`: `"registry:block"`.
- `title`: Human-readable title (e.g. `"Sidebar 01"`).
- `description`: Brief description of what the block demonstrates.
- `categories`: Array with the category name (e.g. `["sidebar"]`). Must match the directory category name.
- `dependencies`: Array of external npm dependencies required by the block.
- `registryDependencies`: Array of installable registry UI components (e.g. `["sidebar", "button", "avatar"]`).
- `files`: List every authored file within the block directory with appropriate types and consumer targets:
  * `page.tsx`: `target: "app/<category>-<number>/page.tsx"` (or `app/dashboard/page.tsx`), `type: "registry:page"`.
  * `components/*`: `target: "components/<file>.tsx"`, `type: "registry:component"`.

### 3. Development Path Aliases (`tsconfig.json`)
Because block code is authored to be consumer-portable, companion components import each other using standard consumer aliases (such as `@/components/app-sidebar` or `@/components/ui/breadcrumbs`).
- To allow TypeScript (`pnpm typecheck`) and Vite to resolve these during development without altering consumer imports, register each companion alias in `tsconfig.json` under `compilerOptions.paths`:
  ```json
  "@/components/app-sidebar": ["./src/registry/base/blocks/sidebar/01/components/app-sidebar.tsx"]
  ```

### 4. Category Title and Navigation (`src/shared/lib/blocks.ts`)
- Block entries are automatically aggregated from `registry.json` by `registryBlocks`.
- By default, category names are converted to titles using `toTitle()` (e.g. `sidebar` to `Sidebar`).
- If a category needs custom display text or capitalization (e.g. `auth` to `Authentication`), add it to the `categoryTitles` dictionary in `src/shared/lib/blocks.ts`.

### 5. In-App Preview Registration (`src/shared/lib/registry.ts`)
- Import the block's `page.tsx` default export into `src/shared/lib/registry.ts`.
- Add it to the `registryComponents` map under its canonical block name (e.g. `"sidebar-01"`).

### 6. Compilation and Verification
- Run `pnpm registry:build` to regenerate the installable registry payload in `public/r/<category>-<number>.json`.
- Run `pnpm typecheck`, `pnpm docs:check`, and `pnpm check`.
- Verify the block displays properly in `/blocks` (both under its category filter pill and in the catalog grid) and inspect the live preview at `/blocks/<category>-<number>`.

