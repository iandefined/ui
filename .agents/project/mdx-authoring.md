# MDX Authoring

Use this guide when authoring MDX or changing the global MDX mapping in `src/shared/mdx-components.tsx`. For page structure, see [docs-writing.md](docs-writing.md). For static generation and public docs endpoints, see [docs-and-static-assets.md](docs-and-static-assets.md).

Do not import globally registered MDX components inside `.mdx` files.

## Current Vocabulary

### Previews and Source

- `<ComponentPreview name="component/example" />` renders an interactive preview and source. `name` resolves to `examples/<component>/<example>.tsx` unless inline preview children and a code fence are supplied.
- `align` accepts `"center"`, `"start"`, or `"end"`. Use `hideCode`, `chromeLessOnMobile`, `previewClassName`, or `caption` only when the presentation requires them.
- `type="block"` renders an iframe block preview. `src`, `code`, `language`, and `title` override source presentation for intentional inline examples.
- `<ComponentSource src="src/registry/base/button.tsx" title="components/ui/button.tsx" />` displays highlighted source. It also accepts registry `name`, inline `code`, `language`, `collapsible`, `maxLines`, and `connected`.
- Prefer a reusable example file. Use inline preview children for small, page-specific demonstrations and include the exact displayed code in the same component.

### Procedures and Disclosure

- `<CodeTabs>`, `<TabsList>`, `<TabsTrigger>`, and `<TabsContent>` organize installation or comparable code paths. `CodeTabs` follows the persisted installation preference.
- `<Steps>` and `<Step>` present ordered procedures. Do not use them for non-sequential lists.
- `<Callout>` accepts `title`, `icon`, `className`, and children. Reserve it for prerequisites, cautions, or decisions.
- `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, and `<AccordionContent>` progressively disclose lengthy reference or troubleshooting detail. Keep the main path outside the accordion.

### Cards, Media, and Navigation

- `<FeatureCard icon={Icon} title="…" description="…" />` presents a concise feature. Use it in overview grids, not as a substitute for ordinary prose.
- `<ColorCard color="…" darkColor="…" title="…" />` presents and copies theme colors.
- `<ComponentsList folderName="Components" />` renders links from the docs page tree; use it on category index pages.
- `<LinkedCard>` creates a related-guide link card. `<AspectRatio ratio={16 / 9}>` constrains media.
- `<Image>` requires meaningful `alt`, explicit `width`, and explicit `height`. `<Alert>`, `<Button>`, `<Link>`, and `<Tabs>` are available when interactive rich content is warranted.

### Markdown Rendering

- Standard code fences receive server-side highlighting and command transformation. Use a language tag and add a filename only when it helps the reader place the code.
- Standard Markdown tables receive the responsive MDX table treatment. Use them for comparisons and non-prop reference data.
- `Button`, `Link`, `CopyButton`, and standard Markdown elements are mapped globally. Prefer semantic Markdown unless a registered component conveys a real interaction or presentation need.


## API Reference and Installation

### `<ApiPropsList>` and `<ApiProp>`

Use the interfaces and owned-prop rules in [api-reference.md](api-reference.md). They render responsive, expandable component-owned API references.

### `<ComponentInstall name="item" />`

`ComponentInstall` is the standard installation helper:

```ts
type ComponentInstallProps = {
  name: string;
};
```

It must derive, from the bundled `registry.json` manifest and build-time source data:

- npm, pnpm, yarn, and Bun CLI commands using the persisted package-manager preference;
- npm dependencies and registry dependencies;
- source files with their consumer targets;
- the `cn` prerequisite only when installable source imports it;
- portable stylesheet copy/import instructions and relevant theme configuration; and
- an actionable unknown-item failure, enforced by `docs:check`.

It must not use request-time filesystem access. Reuse the Worker-safe manifest and `import.meta.glob` approach already used by `src/shared/lib/registry.ts`.

Do not hand-author installation tabs after this helper is available unless an item has a verified exceptional installation path. Registry requirements and CSS contracts belong to [registry-system.md](registry-system.md).
