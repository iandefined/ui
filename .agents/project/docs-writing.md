# Documentation Writing

Use this guide when authoring or reviewing pages in `content/docs/`. For API Reference content, see [api-reference.md](api-reference.md). For MDX component behavior, see [mdx-authoring.md](mdx-authoring.md). For registry installation facts, see [registry-system.md](registry-system.md).

## Component Pages

Use this order when the section applies:

1. Frontmatter (`title`, one-sentence `description`)
2. One- or two-sentence lede explaining what the item is and when to use it
3. `## Preview`
4. `## Installation`
5. `## Usage`
6. `## Composition` (compound items only)
7. `## Features` (only for non-obvious behavior)
8. `## Examples`
9. `## Accessibility` (only for consumer action beyond the primitive's defaults)
10. `## API Reference`

Keep the catalog flat: component pages remain at `/docs/components/<slug>`. Do not introduce primitive/composable folders, URLs, or frontmatter taxonomy.

### Lede, Preview, and Usage

- Put the lede before `## Preview`; do not repeat the title or write filler such as "This component provides".
- Use an explicit `## Preview` and `<ComponentPreview name="<item>/default" />` for the default runnable example.
- Keep the existing `name="component/example"` convention. Demos live in `examples/<component>/<example>.tsx` and import from `@/registry/base/*` so previews run the installable source.
- Keep `## Usage` authored by hand. Display consumer imports such as `@/components/ui/button`, never internal registry imports.
- Include `## Composition` only when two or more public parts need structural explanation. Use a concise tree or anatomy snippet.
- Include `## Features` only when examples do not already explain a meaningful capability. Omit boilerplate feature lists.

### Voice and Examples

- Use direct, present-tense, declarative prose. Every sentence must add information.
- Do not use em dashes in user-facing documentation. Date and calendar ranges may use a spaced en dash (`start – end`) as their visual separator. Prefer commas, colons, parentheses, semicolons, or separate sentences elsewhere.
- Backtick component names, props, values, HTML elements, attributes, files, and CSS classes.
- Use one concise sentence between an example heading and its preview. State what it demonstrates and how to use it.
- Follow a set of variants or enum values with a compact value-to-description table.
- Use relative Markdown links for related docs. Describe actual behavior rather than marketing qualities.
- In date and calendar examples, join two rendered range values on the same line with an en dash and surrounding spaces (`start – end`). Keep `to` in labels, instructions, and other natural-language prose.
- Keep Accessibility sections specific: consumer labeling, keyboard behavior, state communication, or focus requirements. Do not claim that a component is generically "accessible." Interface rules belong to [interface-and-interaction.md](interface-and-interaction.md).
- End every component page with an API Reference. When a wrapper owns no props, document its upstream mapping without reproducing the pass-through API.

## Concept Guides

Concept pages are freeform, but lead with a plain-language mental model and the common path before deep reference. Use headings and examples to give readers an early exit, then progressively disclose exhaustive detail.

### Forms

The Forms guide lives at `content/docs/(root)/forms.mdx`, is exposed as `/docs/forms`, and follows Theming in Get Started navigation. Cross-link it from Form, Field, and Fieldset pages.

- Explain the roles of `Form`, `Field`, `Fieldset`, controls, labels, descriptions, errors, and submit controls before API detail.
- Teach two verified patterns: native `<form>` composition with `Field`/`Fieldset` and browser constraints; then TanStack Form composition using the registry `Form`, `form.Field`, `form.Subscribe`, and mapped field state.
- State that the registry `Form` accepts a TanStack form instance through `form`, prevents native submission, calls `form.handleSubmit()`, and defaults `noValidate` to `true`. Native constraint examples use a native `<form>` rather than the registry `Form`.
- Show consumer imports in code. Keep preview sources importing registry paths.
- Cover control labeling, descriptions and error association, grouped controls, client and schema validation, async/server validation, pending submission, duplicate-submission prevention, success/error feedback, and a component-reference table.
- Reuse verified examples first. New examples must be focused: native constraint validation, TanStack quick start, grouped choices, mixed controls, Zod validation, async/server validation, and pending submission.
- Do not document React Hook Form or Cubby-specific Base UI form APIs unless this repository adds and verifies them.

## Hooks and Utilities

- Give standalone hooks and utilities dedicated pages rather than duplicating their complete API on component pages.
- Use the order Installation, Overview, Usage, Examples when useful, and API Reference.
- Document hook parameters and return values separately. Document utility class patterns, configurable values, and CSS variables in tables when that is clearer than a prop list.
- Component-specific helpers that are not registry items remain in their owning component page.

## Checklist

- Lede explains what and when before an explicit Preview.
- Preview name resolves and Usage uses a consumer import.
- Conditional sections earn their place; Examples use concise prose.
- Variant values have a compact table where it helps comparison.
- Installation and API references defer to their canonical guides.
