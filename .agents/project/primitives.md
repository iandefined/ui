# Prefer Existing UI Primitives

Use this when adding or changing interactive UI in the app, registry components, examples, and documentation.

- Search the repository for an existing component or primitive before introducing a raw interactive HTML element.
- Prefer project components such as `Button`, `Input`, `Textarea`, `Checkbox`, `Select`, `DropdownMenu`, `Popover`, `Tooltip`, `Collapsible`, and their composed subcomponents over raw `<button>`, `<input>`, `<textarea>`, `<select>`, `<details>`, or custom overlay markup.
- Reuse the narrowest primitive that already provides the required semantics, keyboard behavior, focus handling, disabled state, styling variants, and accessibility attributes.
- Compose Base UI triggers with the existing project component through the primitive's `render` prop when both behaviors are needed.
- In registry examples and docs previews, use registry primitives from `@/registry/base/*` so examples demonstrate the same public API users install.
- If an installable registry item or documented reusable example imports another registry primitive, declare its canonical registry URL in `registryDependencies` so the shadcn CLI installs it transitively. Mention the dependency in manual-install docs without duplicating its source.
- Use a native interactive element only when no suitable project primitive exists or when native browser behavior is an intentional requirement. Record the reason in a nearby comment when the choice would otherwise look accidental.
- Do not replace non-interactive semantic elements with UI primitives merely for consistency; headings, paragraphs, lists, links, and structural landmarks should remain appropriate HTML.
