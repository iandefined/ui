# Registry Components

Use this when adding or changing shadcn registry items.

- Add shadcn primitives with `pnpm exec shadcn add <component>` when the new registry item depends on upstream shadcn/ui primitives.
- Put installable registry source under `src/registry/base/<component>.tsx`. This registry has one `base` source namespace and no style variants.
- Update `registry.json` for every public item. Include `name`, `type`, `title`, `description`, dependencies when needed, and each file's source `path`, registry `type`, and install `target`.
- Wire previews in `src/shared/lib/registry.ts`. Import the registry component and add it to `registryComponents`; import demo files from `examples` and add them to `demoComponents` when docs use registry-resolved previews.
- For installable blocks, use `type: "registry:block"` in `registry.json`, put source under `src/registry/base/<block-name>/...`, and wire the block's page/default preview component in `src/shared/lib/registry.ts`.
- Block categories are derived from each block item's `categories` array in `registry.json` by `src/shared/lib/blocks.ts`; add display-title overrides there only when automatic title casing is not enough.
- The block browser uses `/blocks` for the category grid and `/blocks?category=<name>&q=<query>` for searchable category views; do not add new category path routes.
- Category-card preview art for `/blocks` lives in `src/shared/components/blocks/block-category-grid.tsx`; add or map a skeleton preview for new category names there when the default card is too generic.
- Do not edit generated block registry JSON in `public/r/*`; run `pnpm registry:build` after block manifest or source changes.
- Put reusable docs demos in `examples/<demo-name>.tsx`. For one-off examples, write the live JSX and fenced source inline inside `ComponentPreview`.
- Add or update MDX docs under `content/docs`; navigation is filesystem-first, so use `meta.json` only for optional folder metadata or custom ordering.
- Rebuild generated output with `pnpm registry:build` after registry changes and `pnpm static:build` after docs or metadata changes. Do not manually edit `public/r/*`, `.source/*`, `.tanstack/*`, or `src/routeTree.gen.ts`.
- For registry wiring or docs previews, verify with `pnpm typecheck`, `pnpm check`, and the smallest build command that covers the changed surface.

## Docs Preview Patterns

Registry-resolved preview using an `examples` file:

```mdx
<ComponentPreview name="button-demo" />
```

Inline one-off preview:

````mdx
import { Button } from "@/registry/base/button";

<ComponentPreview name="inline-button-example" title="inline-button-example.tsx">
  <Button variant="outline">Inline example</Button>

```tsx
import { Button } from "@/components/ui/button";

export function InlineButtonExample() {
  return <Button variant="outline">Inline example</Button>;
}
```

</ComponentPreview>
````

Manual source display:

```mdx
<ComponentSource
  src="src/registry/base/button.tsx"
  title="components/ui/button.tsx"
/>
```
