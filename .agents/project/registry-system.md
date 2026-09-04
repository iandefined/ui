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
- A manifest block has a `page.tsx` entry and declares every installable source file. Its categories derive from `registry.json`.
- Register a component in `registryComponents` only when it needs lookup by registry item name. Examples are discovered automatically.

