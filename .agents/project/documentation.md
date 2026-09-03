# Component Documentation, API Reference, and MDX Authoring

Use this guide when creating, revising, or reviewing documentation pages under `content/docs/` (including `components/`, `hooks/`, and `utilities/`).

For registry source implementation, TypeScript prop conventions, or `registry.json` manifest wiring, see [registry-components.md](registry-components.md). For UI interaction, form styling, motion, and accessibility patterns, see [interface-and-interaction.md](interface-and-interaction.md). For static asset generation and public endpoints, see [docs-and-static-assets.md](docs-and-static-assets.md).

---

## 1. Documentation Writing Style

- **Tone & Voice**: Use direct, declarative sentences in present tense. Keep prose concise and technical.
- **Active Voice**: Write "Pass `color` to generate the glossy gradient" instead of "The `color` prop can be passed to generate the glossy gradient."
- **One Responsibility per Section**: Jump directly to the relevant demo, code, or explanation. Never repeat the heading in body copy (e.g. avoid `### Sizes` followed by `These are the available sizes:`).
- **No Filler**: Eliminate introductory throat-clearing ("In this section, we will see...", "This component allows you to...").
- **Exact Identifiers**: Wrap all component names, prop names, HTML elements, attributes, filenames, and CSS classes in backticks (e.g. `variant`, `Button`, `className`, `components/ui/button.tsx`).
- **Relative Links**: Use relative markdown links between docs pages (e.g. `[Field](../components/field.mdx)`).
- **Accurate Descriptions**: Describe what the component actually does; avoid marketing superlatives.

---

## 2. Standard Page Structure

Every component document under `content/docs/components/<component>.mdx` follows this standard sequence. Sections marked *(conditional)* must only be included when the component's API or behavior genuinely warrants them; do not generate empty or trivial sections.

```
1. Frontmatter (title, description)
2. Preview (inline <ComponentPreview />, NO heading)
3. Installation (## Installation with <CodeTabs>)
4. Usage (## Usage with runnable import/component snippet)
5. Anatomy (## Anatomy - conditional: compound components only)
6. Features / Composition (## <Feature> - conditional: complex architectural capabilities)
7. Examples (## Examples with ### <Example>)
8. Accessibility (## Accessibility - conditional: specific keyboard/ARIA patterns)
9. API Reference (## API Reference - conditional: registry-owned props/types)
```

### Frontmatter and Lede Writing
Frontmatter must contain `title` and a one-sentence `description` acting as the page lede:
- `title`: The public PascalCase or display name (e.g. `Button`, `Dropdown Menu`, `Hitbox`).
- `description`: A concrete, declarative sentence summarizing the primary capability, distinguishing features, or interaction model of the component.
- Avoid generic filler such as "A button component." Prefer: "A button with a glossy default treatment, custom colors, variants, sections, and sizes."

### Preview (Inline)
- Place the default preview immediately below the frontmatter without a preceding heading.
- Use `<ComponentPreview name="<component>/default" />`.
- Must resolve to an interactive example in `examples/<component>/default.tsx`.

### Installation
Always present two tabs using `<CodeTabs>`: `cli` and `manual`.

```mdx
## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">Command</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add https://ui.iandefined.com/r/<component>.json
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
  src="src/registry/base/<component>.tsx"
  title="components/ui/<component>.tsx"
/>
</Steps>

  </TabsContent>
</CodeTabs>
```

**Installation Rules**:
1. CLI command is strictly `npx shadcn@latest add https://ui.iandefined.com/r/<component>.json`. Never substitute `pnpm dlx`, `bunx`, or add `$` shell prompts.
2. The manual dependency command lists only packages required by this specific component.
3. If the item depends on other registry items, add an explicit `<Step>` listing the required registry items to install first.
4. If the item requires an associated CSS stylesheet (e.g. `hitbox.css`), include explicit steps to copy the CSS file, import it, and configure any theme variables. See [Registry CSS Standards in registry-components.md](registry-components.md).

### Usage
- Show the smallest practical, fully functional JSX snippet.
- Import from `@/components/ui/<component>` (the consumer destination path), never from internal registry paths.

```mdx
## Usage

```tsx
import { Button } from "@/components/ui/button";
```

```tsx
<Button>Click me</Button>
```
```

### Anatomy (Conditional)
- Required for compound components (`DropdownMenu`, `Field`, `InputGroup`, `Tabs`, `Select`, `Breadcrumbs`, `Card`).
- Omit for single-element primitives (`Button`, `Input`, `Kbd`, `Separator`, `Skeleton`, `Spinner`, `Textarea`).
- Shows the structural hierarchy of parts without incidental visual props:

```mdx
## Anatomy

```tsx
<Tabs>
  <TabsList>
    <TabsTrigger />
  </TabsList>
  <TabsContent />
</Tabs>
```
```

### Features / Composition (Conditional)
- Use when a component has an important interaction model or architectural feature that warrants dedicated explanation before individual examples (e.g. custom color calculations on `Button`, animation presets on `Select`/`Tooltip`, or container queries on `Card`).

### Examples
- Heading is always `## Examples`.
- Subheadings use concise labels: `### Sizes`, `### Disabled`, `### With Icons`, `### Controlled`.
- Every example must be functional and demonstrate meaningful API variations.
- Prefer reusable demos rendered via `<ComponentPreview name="<component>/<example>" />` backed by `examples/<component>/<example>.tsx`.
- Form controls must use realistic widths (e.g. `grid w-full max-w-sm gap-4`) and calculate dynamic state (character counters, controlled values).

### Accessibility (Conditional)
- Include when the component requires consumer attention for accessibility (e.g. `aria-label` requirements on icon-only buttons, keyboard shortcut bindings on `Kbd`, screen reader live regions, focus management on dialogs/menus).
- Omit when the component purely forwards standard HTML semantics without extra requirements.

### API Reference (Conditional)
- Include when the component exports custom props, explicitly handled variants, modified defaults, or compound parts.
- Place at the very end of the page (after Examples and Accessibility).
- Follow the API Reference Standards below.

---

## 3. API Reference Standards

API Reference documentation describes what the registry component **explicitly owns, modifies, or adds**.

### What to Document
1. **Custom Props**: Props introduced by our implementation (`leftSection`, `rightSection`, `color`, `mask`, `reduceMotion`, `animationPreset`).
2. **Explicitly Handled Props**: Props intercepted for custom logic or variant styling (`variant`, `size`, `radius`, `align`).
3. **Modified Defaults**: When our default value differs from the underlying library default.
4. **Normalized State**: When event handlers or state types are normalized (e.g. scalar vs array values in Slider).
5. **Compound Subcomponents**: Separate reference tables for each exported subcomponent (`### ComponentTrigger`, `### ComponentContent`).

### What NOT to Document
1. **Pass-Through Props**: Do NOT duplicate the complete API of underlying libraries (`@base-ui/react`, HTML attributes) when props are merely forwarded.
2. State what the component wraps in a brief lead paragraph:
   `Button wraps Base UI's Button and accepts all its props in addition to those below.`
3. **Standard HTML Props**: Do NOT document `className`, `children`, `style`, `id`, or `ref` unless special internal handling occurs.

### Prop Table Format
Tables must use standard Markdown with four columns: `Prop`, `Type`, `Default`, `Description`.

```markdown
| Prop        | Type                                                | Default     | Description                                           |
| ----------- | --------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `variant`   | `"default" \| "secondary" \| "outline" \| "ghost"`  | `"default"` | Visual style treatment.                              |
| `size`      | `"sm" \| "default" \| "lg"`                         | `"default"` | Controls height and horizontal padding.               |
| `radius`    | `"none" \| "sm" \| "default" \| "full"`             | `"default"` | Corner radius.                                        |
| `color`     | `string`                                            | —           | Custom hex or CSS color for glossy gradient and ring. |
```

- **Type Formatting**: Use inline literal unions (e.g. `"sm" | "default" | "lg"`) rather than uninformative type alias names (e.g. `ButtonSize`).
- **Default Column**: Use backticked value (e.g. `"default"`, `true`, `false`) or an em-dash `—` when there is no default.

### Documenting Hooks
For registry hooks (e.g. `use-fuzzy-filter`):
1. **Signature**: Code fence showing `useHook(params): ReturnType`.
2. **Parameters Table**: Columns `Parameter`, `Type`, `Default`, `Description`.
3. **Return Value Table**: Columns `Property`, `Type`, `Description`.

### Documenting Utilities
For registry utilities (e.g. `hitbox`):
1. Document utility class patterns and available scales (`hitbox-*`, `hitbox-x-*`, `hitbox-y-*`, `hitbox-debug`).
2. Include a CSS variable table (`--hitbox-t`, `--hitbox-r`, etc.) when variables can be configured.

---

## 4. Complete MDX Component Vocabulary

The following custom components are globally available in MDX files via `src/shared/mdx-components.tsx`. Do not import them manually in `.mdx` files.

### `<ComponentPreview>`
Renders an interactive example preview with source code toggle.
- **Props**:
  * `name` (`string`, required): Name matching `examples/<component>/<example>.tsx` (e.g. `"button/variants"`).
  * `align` (`"center" | "start" | "end"`, default `"center"`): Flex alignment of the demo preview container.
  * `hideCode` (`boolean`, default `false`): Hides the expandable code block.
  * `previewClassName` (`string`, optional): Extra Tailwind classes applied to the preview container.
  * `chromeLessOnMobile` (`boolean`, default `false`): Strips container borders and padding on mobile screens.
  * `caption` (`string`, optional): Caption displayed below the preview.
- **When to Use**: For every interactive component demo on docs pages.
- **When NOT to Use**: For non-interactive code snippets (use standard triple-backtick code blocks).

### `<ComponentSource>`
Displays component source code dynamically loaded from the repository with copy-to-clipboard and line numbering.
- **Props**:
  * `src` (`string`, optional): Workspace-relative path to source file (e.g. `"src/registry/base/button.tsx"`).
  * `title` (`string`, optional): Target path header displayed above the code block (e.g. `"components/ui/button.tsx"`).
  * `collapsible` (`boolean`, default `true`): Allows expanding/collapsing long files.
  * `connected` (`boolean`, default `false`): Attaches visually to preceding elements without top margin.
- **When to Use**: In Step 3 of the Manual Installation tab.

### `<CodeTabs>`, `<TabsList>`, `<TabsTrigger>`, `<TabsContent>`
Tabbed code presentation synchronized with user installation preferences (`cli` vs `manual`).
- **Props**: Standard Tabs props. `CodeTabs` synchronizes state across pages via `useConfig`.
- **When to Use**: To enclose the Installation section.

### `<Steps>`, `<Step>`
Numbered step sequence for procedural instructions.
- **`<Steps>`**: Container creating an incrementing CSS counter list with a vertical border line.
- **`<Step>`**: An individual step heading (`h3`).
- **When to Use**: Inside `<TabsContent value="manual">` to structure sequential setup steps.
- **When NOT to Use**: In regular prose or non-sequential lists (use standard Markdown `1. 2. 3.`).

### `<Callout>`
Highlighted notice container for important context, tips, warnings, or breaking notes.
- **Props**:
  * `title` (`string`, optional): Bold heading for the callout.
  * `icon` (`ReactNode`, optional): Icon element rendered at top-left.
  * `className` (`string`, optional): Custom classes.
  * `children`: Content rendered inside the callout description.
- **When to Use**: Critical callouts, edge-case warnings, or prerequisite notes.
- **When NOT to Use**: Regular explanatory paragraphs.

### `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>`
Accessible collapsible disclosure component.
- **When to Use**: Deep technical notes, extended troubleshooting, or multi-item FAQ sections that would disrupt linear reading.
- **Composition**:
  ```mdx
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>How does color derivation work?</AccordionTrigger>
      <AccordionContent>Detailed explanation...</AccordionContent>
    </AccordionItem>
  </Accordion>
  ```

### `<FeatureCard>`
Card displaying an icon, title, and concise description.
- **Props**: `icon` (`LucideIcon`, required), `title` (`string`, required), `description` (`string`, required).
- **When to Use**: Landing pages, overview pages, or multi-column feature grids.

### `<ColorCard>`
Interactive color swatch card with dark/light mode resolution and click-to-copy color values.
- **Props**: `color` (`string`, required), `darkColor` (`string`, optional), `title` (`string`, required).
- **When to Use**: Theming documentation and color palette displays.

### `<ComponentsList>`
Auto-populates a responsive grid of component links from page tree metadata.
- **Props**: `folderName` (`string`, default `"Components"`).
- **When to Use**: Root category index pages (e.g. `content/docs/components/index.mdx`).

### `<LinkedCard>`
Clickable link card for routing readers to related guides.
- **Props**: Standard Link props (`href`, `children`).

### `<AspectRatio>`
Ratio-enforcing container for images, mockups, or video embeds.
- **Props**: `ratio` (`number`, e.g. `16 / 9`).

### Table Components (Markdown Tables & `<MdxTable>`)
All standard Markdown tables (`| ... |`) are automatically wrapped in a responsive, styled `<MdxTable>` with horizontal scrolling and rounded border styling.
