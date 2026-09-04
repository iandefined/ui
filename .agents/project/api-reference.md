# API Reference Documentation

Use this guide for `## API Reference` sections. For page order and voice, see [docs-writing.md](docs-writing.md). For the MDX helper contract, see [mdx-authoring.md](mdx-authoring.md). For source and dependency facts, see [registry-system.md](registry-system.md).

## What To Document

Document only the public API this registry item owns:

- custom props introduced by this repository;
- props explicitly handled for styling or behavior;
- essential data props central to the item;
- defaults changed from the underlying library; and
- separately exported compound parts with owned behavior.

Do not duplicate pass-through Base UI or HTML props, or ordinary `className`, `children`, `style`, `id`, and `ref` props. State what the item wraps, say that supported upstream props pass through, and link the relevant official Base UI API instead.

For a changed upstream default, include the prop and name both this repository's default and the upstream default in its description.

## Reference Structure

Start with `## API Reference`, a short Base UI mapping paragraph when applicable, and the official upstream link. Use `### Props`, then `####` headings for compound parts that need their own reference. Describe a composed part's responsibility, its underlying primitives, and which primitive receives forwarded props.

Use dedicated hook and utility pages for their full APIs. Their pages may use parameter, return-value, CSS-variable, utility-class, or value-description tables when a prop list is not the clearest format.

Use `### Notes` for important usage patterns that do not belong to a prop, such as composing a close trigger through `render`. Keep each note under a `####` heading for the affected part and include only the smallest useful example.

## MDX Interfaces

Use the globally registered `ApiPropsList` and `ApiProp` helpers for component-owned props.

```ts
type ApiPropProps = {
  name: string;
  fullType: string;
  simpleType?: string;
  defaultValue?: string;
  required?: boolean;
  children: ReactNode;
};

type ApiPropsListProps = {
  children: ReactNode;
};
```

```mdx
<ApiPropsList>
  <ApiProp
    name="variant"
    fullType='"default" | "secondary" | "outline"'
    simpleType="string"
    defaultValue='"default"'
  >
    Sets the visual treatment.
  </ApiProp>
</ApiPropsList>
```

- `fullType` is the complete TypeScript type; keep literal unions visible.
- `simpleType` is an optional compact responsive label.
- Write TypeScript syntax exactly. String literal unions use double-quoted members, and string defaults include their quotes, such as `defaultValue='"default"'`.
- Omit `defaultValue` when there is no default; the UI renders the absence consistently.
- Mark `required` only when callers must supply the prop.
- Write one or two concrete sentences in the description, including constraints or relationships where useful.

## Public Type Standard

Selectable public props must spell literal unions directly in their prop declaration, for example `variant?: "default" | "secondary"`. Reusable exported aliases derive from that prop, for example `type ButtonVariant = NonNullable<ButtonProps["variant"]>`. Do not use `VariantProps` or a named alias as the only consumer-visible type surface. Implementation guidance belongs to [component-implementation.md](component-implementation.md).
