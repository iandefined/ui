# Registry Components

Use this when adding or changing shadcn registry items. For MDX structure, installation wording, and example coverage, also read [writing-registry-pages.md](../projects/writing-registry-pages.md).

- Add shadcn primitives with `pnpm exec shadcn add <component>` when the new registry item depends on upstream shadcn/ui primitives.
- Put installable registry source under `src/registry/base/<component>.tsx`. This registry has one `base` source namespace and no style variants.
- Update `registry.json` for every public item. Include `name`, `type`, `title`, `description`, dependencies when needed, and each file's source `path`, registry `type`, and install `target`.
- `src/shared/lib/registry.ts` discovers demo modules and source under `examples/**/*.tsx` automatically. Add a registry source component to `registryComponents` only when it also needs direct lookup by item name.
- For installable blocks, use `type: "registry:block"` in `registry.json`, put source under `src/registry/base/<block-name>/...`, and wire the block's page/default preview component in `src/shared/lib/registry.ts`.
- Block categories are derived from each block item's `categories` array in `registry.json` by `src/shared/lib/blocks.ts`; add display-title overrides there only when automatic title casing is not enough.
- The block browser uses `/blocks` for the category grid and `/blocks?category=<name>&q=<query>` for searchable category views; do not add new category path routes.
- Category-card preview art for `/blocks` lives in `src/shared/components/blocks/block-category-grid.tsx`; add or map a skeleton preview for new category names there when the default card is too generic.
- Do not edit generated block registry JSON in `public/r/*`; regenerate it only when the verification policy calls for generated output.
- Put reusable docs demos in `examples/<component>/<demo-name>.tsx`. Use inline live JSX only for genuinely small, page-specific examples.
- Add or update MDX docs under `content/docs`; navigation is filesystem-first, so use `meta.json` only for optional folder metadata or custom ordering.
- For a new registry entry, wire the source, examples, `registry.json`, docs page, optional navigation metadata, search metadata, and any direct preview lookup needed by that item. The static generator discovers authored docs from `content/docs` automatically.
- For an existing item, change only the layers the task touches. Do not churn the manifest, navigation, or generator when it is already wired correctly.
- Do not manually edit `public/r/*`, `public/docs/*`, `public/llms*`, `src/shared/generated/llms.txt`, `.source/*`, `.tanstack/*`, or `src/routeTree.gen.ts`.
- Follow [verification.md](verification.md). Small changes to an existing component, example, or page do not require registry, static, or application builds by default. New entries and user-requested commit-and-push workflows do.

## Docs Preview Patterns

Registry-resolved preview using an `examples` file:

```mdx
<ComponentPreview name="badge/default" />
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
