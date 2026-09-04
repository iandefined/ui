# Component Implementation

Use this guide when changing public registry component, hook, or utility source under `src/registry/base/`.

For manifest ownership and portable CSS, see [registry-system.md](registry-system.md). For Base UI composition mechanics, see [base-ui-patterns.md](base-ui-patterns.md). For interaction, form, motion, and accessibility behavior, see [interface-and-interaction.md](interface-and-interaction.md).

## Public API and types

- Public selectable props expose literal unions directly where practical, such as `size?: "sm" | "md" | "lg"`. Do not expose a `VariantProps` expression or a named alias as the consumer-facing prop type.
- If consumers need a reusable alias, derive it from the final public props: `type ButtonSize = NonNullable<ButtonProps["size"]>`.
- Keep discriminated unions and generic constraints when they encode valid combinations; put their selectable literals in the relevant union branches.
- Variant-library inference is internal implementation detail. Do not let it define the public API surface by default.
- Export public props and intentional reusable types. Avoid exporting incidental implementation-only types.

## Slots, state, and imports

- Every public component part gets a stable, kebab-case `data-slot` attribute. Blocks and private helpers need one only when consumers must style or compose them.
- Forward or expose semantic state for styling when the component owns it: use Base UI state attributes first, then stable attributes such as `data-invalid`, `data-variant`, or `data-size` when needed.
- Registry source imports `cn` from `@/lib/utils` and other installed registry items from `@/components/ui/<name>`, matching consumer aliases.
- Examples import from `@/registry/base/*`; displayed consumer code imports from the manifest target path.

## Portability

- A registry item must work after installation without application-shell imports, hidden global selectors, or example-only dependencies.
- Keep component-specific explicit CSS with the registry item under `src/styles/` and wire it through the manifest; see [registry-system.md](registry-system.md).
- Preserve controlled and uncontrolled behavior, native form semantics, refs, and accessibility contracts when refactoring public APIs. Record consumer-visible breaking changes in the migration ledger.
- Keep the migration ledger in the task handoff unless the change needs a committed release or migration guide. Record the previous API, replacement, affected registry items, and required consumer action.
