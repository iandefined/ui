# Writing Registry Pages

Use this guide when creating or substantially revising a component page under `content/docs/components/`. It captures the recurring format and example preferences established by the existing registry pages.

Also load [registry-components.md](../project/registry-components.md) when the task changes source files, demos, or `registry.json`, and [verification.md](../project/verification.md) before deciding which checks to run.

## Source of Truth

- Inspect the current registry component, its exports, and its preview examples before writing the page.
- When porting a component from another library, follow that library's current implementation and documentation closely, then adapt imports, naming, composition, and tokens to this repository.
- Preserve the behavior demonstrated by the source documentation. Examples should be functional, not merely visual imitations.
- Prefer the repository's current conventions over an older MDX page when they conflict. Some older pages use legacy inline demos or naming patterns.

## File and Naming Layout

- Component page: `content/docs/components/<component>.mdx`
- Registry source: `src/registry/base/<component>.tsx`
- Reusable demos: `examples/<component>/<example>.tsx`
- Preview name: `<component>/<example>`
- Default preview: `<component>/default`
- Installed component destination: `components/ui/<component>.tsx`
- Registry URL: `https://ui.iandefined.com/r/<component>.json`
- Use kebab-case filenames and preview names.
- Use the public component name throughout the page. If the upstream name is intentionally changed, make the page, source filename, exports, demos, and registry item agree. For example, the menu port is `DropdownMenu` in `dropdown-menu.tsx`.

Live demos import from `@/registry/base/...`. Installation and usage snippets show the consumer-facing `@/components/ui/...` import path. Demo files under `examples/` are discovered automatically by `src/shared/lib/registry.ts`.

`ComponentPreview`, `ComponentSource`, `CodeTabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `Steps`, and `Step` are available to MDX globally. Do not add imports for them to each page.

## Standard Page Order

Use this order unless a component genuinely does not need a section:

1. Frontmatter
2. Preview (inline, without a heading)
3. Installation
4. Usage
5. Anatomy for compound components
6. Examples
7. A focused advanced section, such as popup animation, when it materially helps

A typical page starts like this:

````mdx
---
title: Component Name
description: A concise sentence describing what the component does.
---

<ComponentPreview name="component/default" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">Command</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add https://ui.iandefined.com/r/component.json
```

  </TabsContent>
  <TabsContent value="manual">

<Steps>
  <Step>Install the following dependencies:</Step>

```bash
npm install @base-ui/react tailwind-variants clsx tailwind-merge
```

<Step>Add the `cn` utility to `lib/utils.ts`:</Step>

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource
  src="src/registry/base/component.tsx"
  title="components/ui/component.tsx"
/>
</Steps>

  </TabsContent>
</CodeTabs>
````

## Installation Rules

- The CLI command is exactly `npx shadcn@latest add https://ui.iandefined.com/r/<component>.json`.
- Do not substitute `pnpm dlx`, `bunx`, or another package runner in the MDX command.
- Do not include a shell `$` prompt or line-number decoration in command examples.
- The manual dependency command is exactly `npm install @base-ui/react tailwind-variants clsx tailwind-merge` for component pages.
- Keep the `cn` utility step in the manual tab even when the component has no additional dependency beyond the standard set.
- When an item has registry dependencies, add a separate manual Step telling readers which registry components to install first.
- Use `ComponentSource` for the registry source instead of duplicating a long component implementation in the MDX file.

## Anatomy and Usage

Add an Anatomy section for compound components so readers can see the intended hierarchy after the usage example. Keep it structural and omit incidental props:

````mdx
## Usage

```tsx
import { Component } from "@/components/ui/component";
```

```tsx
<Component />
```

## Anatomy

```tsx
<Component>
  <ComponentTrigger />
  <ComponentPopup />
</Component>
```
````

Simple primitives such as Separator or Spinner may omit Anatomy. Usage should show the smallest accessible, useful composition rather than repeat the full preview.

## Choosing Examples

Every page needs a default demo. Add examples that cover meaningful public behavior rather than manufacturing a fixed count.

- Variant-based components: show each meaningful visual variant and the supported sizes.
- Form controls: show sizes, relevant HTML input types, disabled state, and a controlled example. Keep file inputs in their own example.
- Compound components: show text/addons, icons, buttons or actions, and the compositions users are most likely to build.
- Overlay components: show arrow behavior, every supported side, offset or delay controls, controlled state, richer content, and animation presets when supported.
- Selection components: show disabled states, sizes, custom indicators, checkbox or radio groups, and controlled state where useful.
- Loading components: show representative sizes or layouts. For Skeleton, include `No animation`; do not recreate a generic corners-and-animations showcase.
- Navigation or menu components: include groups, checkbox items, radio items, submenus, links/navigation, custom icons, and dialog interaction when the API supports them.

Examples must behave as their labels claim:

- Use state for controlled demos.
- Calculate counters from the current value, such as `maxLength - value.length`; do not hardcode a character count that becomes stale while typing.
- Use real loading, checked, selected, disabled, or open state where the interaction is the point of the example.
- Ensure entered text uses the normal foreground color while placeholders use the muted placeholder color.
- Avoid examples that differ only by decorative markup and teach no new API.

### Existing Example Baselines

Use these current pages as concrete baselines, then adjust when a component's real API calls for different coverage:

- Badge: default, variants, colors, and sizes.
- Button: visual variants, sizes, with icon, and icon-only.
- Checkbox: default, disabled, sizes, radius, and custom icons.
- Dropdown Menu: default, arrow, six sides, hover opening, checkboxes, radio groups, custom radio icon, groups, submenu, navigation/dialog compositions, and popup animation presets.
- Input: default, consistent sizes, input types, separate file input, disabled, and controlled.
- Input Group: default, text, icons, buttons, spinner, tooltip, and menu compositions.
- Separator: a focused default demo showing the useful orientations or layouts.
- Skeleton: default, card composition, and no animation.
- Spinner: default and sizes.
- Textarea: default, practical sizes and widths, disabled, and controlled.
- Tooltip: default, arrow, six sides, offset, delay, controlled, custom content, shared root, and popup animation presets.

Utility pages such as Hitbox may use a smaller inline example when that communicates the entire API more clearly than a reusable component demo.

## Demo Presentation

- Prefer reusable example files and `<ComponentPreview name="component/example" />` for component documentation.
- Export each reusable demo as its default component so automatic preview discovery can render it.
- Inline preview JSX is acceptable only for a genuinely small, page-specific illustration that is not a registry demo.
- Use concise section titles such as `Sizes`, `Disabled`, `Controlled`, `With Arrow`, or `Custom Content`.
- Give controls practical widths. A common form-demo wrapper is `grid w-full max-w-sm gap-4`; do not make inputs or textareas unnaturally narrow.
- Keep spacing visually balanced and responsive. Avoid adding one-off padding to compensate for an incorrectly sized child component.
- For a side matrix, use all six supported values when applicable: `top`, `right`, `bottom`, `left`, `inline-start`, and `inline-end`. The established layout is `grid w-full grid-cols-2 gap-3 sm:grid-cols-3`.
- Labels should reflect actual API values. Do not insert spaces into camelCase animation names such as `slideOutside` or `motionBlur`.
- Preview source must remain complete and copyable even when the on-screen code block is collapsed.

## Base UI Composition

- Compose triggers with the registry Button through Base UI's `render` prop when a button is intended:

```tsx
<ComponentTrigger render={<Button variant="outline" />}>
  Open
</ComponentTrigger>
```

- Do not add visual styles directly to trigger primitives merely to make a demo look like a button.
- Keep `nativeButton` semantics correct: render a real Button/button, or deliberately set `nativeButton={false}` only when the trigger is truly not a button.
- Keep popup and arrow styling in the component implementation so every example is consistent.

For Tooltip, a provider coordinates delay behavior but does not by itself create an animated tooltip that moves between triggers. To demonstrate movement, size, and content transitions, use one `Tooltip.createHandle`, detached triggers with payloads, one Tooltip root, and one popup/viewport. Keep both the shared-root example and the animation-preset demo truly shared when they claim to animate between triggers.

## Writing Style

- Use direct, compact prose in present tense.
- Describe observable behavior and the API users need; avoid marketing language.
- Introduce an unusual implementation detail only when it changes how consumers use the component.
- Keep terminology, capitalization, component names, and prop names identical to the source API.
- Use examples to explain combinations and interactions instead of adding long prose descriptions.

## Authoring Checklist

- Frontmatter title and description are accurate.
- Default preview exists and resolves to the expected demo.
- CLI URL, manual dependencies, `cn` step, and `ComponentSource` path are correct.
- Anatomy matches the exported compound parts.
- Usage imports from `@/components/ui`.
- Examples cover the component's meaningful API and remain interactive.
- Demo names, files, imports, and headings agree.
- Layout, spacing, accessibility labels, button semantics, and responsive behavior are intentional.
- Demos remain preview-only by default. Add one to a registry item's files only when it is intentionally part of the installable payload.
- Generated files are not edited manually.
- Verification follows [verification.md](../project/verification.md); small MDX changes do not trigger registry or application builds by default.
