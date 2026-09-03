# Registry Architecture and Component Implementation

Use this guide when adding, modifying, or auditing shadcn registry items, component source files in `src/registry/base/`, registry hooks, utilities, blocks, and the `registry.json` manifest.

For MDX documentation pages, example selection, and API Reference tables, see [documentation.md](documentation.md). For interface standards, forms, animations, and accessibility, see [interface-and-interaction.md](interface-and-interaction.md). For verification procedures, see [verification.md](verification.md).

---

## 1. Registry Architecture & Namespaces

- **Single Source Namespace**: Installable registry source lives strictly under `src/registry/base/`. This repository has one `base` source namespace and does not use style variants (e.g. no `default` vs `new-york` subdirectories).
- **Installed Destination**: All UI components map to `components/ui/<component>.tsx` in the consumer's project.
- **Canonical Registry URL**: `https://ui.iandefined.com/r/<component>.json`.
- **Automatic Discovery**: `src/shared/lib/registry.ts` automatically discovers demos and preview source under `examples/**/*.tsx`. You only need to register a source component in `registryComponents` if it requires direct lookup by registry item name.
- **Registry Manifest (`registry.json`)**: Every public item must be defined in `registry.json` with `name`, `type`, `title`, `description`, `dependencies`, `registryDependencies`, and a `files` array specifying `path`, `type`, and consumer `target`.

### Item Types
- `registry:ui`: Interactive UI primitives and components (`button`, `select`, `combobox`).
- `registry:hook`: Standalone React hooks (`use-fuzzy-filter`).
- `registry:style`: CSS utilities and theme extensions (`hitbox`).
- `registry:block`: Multi-file composable layouts and page patterns (`sidebar-01`).

---

## 2. Component Implementation Conventions

- **Base UI Foundation**: Primitives wrap `@base-ui/react` wherever suitable. Do not recreate custom keyboard and focus management when Base UI already provides it.
- **Component Parts & `data-slot`**: Every public subcomponent must provide a stable `data-slot` attribute (e.g. `data-slot="button"`, `data-slot="input"`, `data-slot="dialog-content"`). This ensures consistent selector targeting across CSS, tests, and composite containers.
- **Dynamic State Attributes**: Expose semantic state attributes for styling: `data-state`, `data-disabled`, `data-invalid`, `data-variant`, `data-size`.
- **Composition via `render`**: Support the Base UI `render` prop on all primitives that can project their semantics onto custom elements or parent triggers.
- **Clean Imports**: Component source in `src/registry/base/` must import shared utilities via `@/lib/utils` (resolving to `cn`) and other registry components via `@/components/ui/<component>` (matching the consumer's installed alias).

---

## 3. TypeScript Prop Standards

The goal of our TypeScript prop conventions is to provide **immediate, rich IntelliSense in consumer editors** while maintaining clean, maintainable code.

### [HARD REQUIREMENT] Inline Literal Unions for Public Props
When practical, public component props intended for consumer selection (`variant`, `size`, `radius`, `animationPreset`, `align`) must expose inline string literal unions directly in the component's public props interface:

```ts
export interface ButtonProps extends Omit<BaseButtonProps, "color"> {
  /** Controls the visual style treatment. */
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  /** Controls height and padding. */
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl";
  /** Controls the corner radius. */
  radius?: "none" | "sm" | "default" | "lg" | "xl" | "full";
}
```

#### Why This Matters
When a developer writes `<Button variant="|"` or hovers over the prop in an editor, TypeScript immediately displays the literal options (`"default" | "secondary" | "outline" ...`). If typed as `variant?: ButtonVariant`, the editor hides the available values behind the alias name, requiring the developer to jump to definitions.

### When Named Types Remain Appropriate
Do not apply inline unions mechanically when a named type materially improves the codebase:
1. **Exported Types for Consumer Re-use**: Export named type aliases alongside the component so consumers can construct generic wrapper components:
   ```ts
   export type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
   ```
2. **Discriminated Unions**: When the variant determines the validity of other props:
   ```ts
   type ButtonProps = SharedButtonProps & (
     | { variant?: "default"; color?: string }
     | { variant: "secondary" | "outline" | "ghost" | "link" | "destructive"; color?: never }
   );
   ```
3. **Generic Constraints & Complex Compositions**: When props rely on generic type parameters (`ComboboxProps<Value, Multiple>`).
4. **Variant Object Inference**: Internal typing of `tailwind-variants` (`tv`) or `class-variance-authority` (`cva`) objects.

---

## 4. Registry CSS Standards

When a registry item requires CSS that cannot or should not live entirely in Tailwind utility classes or inline styles, it must follow these standards:

### [HARD REQUIREMENT] Dedicated Stylesheet
- Give the registry item a dedicated stylesheet that travels with it:
  * Component / Utility: `src/registry/base/<name>.tsx`
  * Associated Stylesheet: `src/styles/<name>.css` (e.g. `src/styles/hitbox.css`)
- The stylesheet must be completely self-contained and portable. It must not rely on parent-repository-only CSS selectors or hidden globals.

### [HARD REQUIREMENT] Manifest Wiring in `registry.json`
Every registry item requiring an external stylesheet MUST declare that stylesheet in its `files` array in `registry.json`:
```json
{
  "name": "hitbox",
  "type": "registry:style",
  "description": "Expand hit areas of interactive elements without affecting layout.",
  "files": [
    {
      "path": "src/styles/hitbox.css",
      "type": "registry:style",
      "target": "styles/hitbox.css"
    }
  ]
}
```

### [HARD REQUIREMENT] Documentation and Manual Installation Accounting
Documentation for any item with a stylesheet must explicitly instruct users how to install and include it. Manual installation instructions must follow the 5-step sequence:
1. Copy the component implementation (if applicable).
2. Copy the associated CSS stylesheet.
3. Import the stylesheet into the project's root CSS or entrypoint (e.g. `@import "./styles/hitbox.css";`).
4. Install required npm dependencies.
5. Perform any required theme configuration (e.g. `@theme inline` variables).

**Strict Rule**: Agents must never introduce a CSS dependency that `registry.json` omits or that documentation fails to explain.

---

## 5. Dependency Management

### `dependencies` vs `registryDependencies`
- **`dependencies`**: Standard npm packages needed by the installed component (e.g. `@base-ui/react`, `lucide-react`, `clsx`, `tailwind-merge`). These are installed into the consumer's `node_modules` by `shadcn add`.
- **`registryDependencies`**: Canonical URLs of other registry items that must be installed into the consumer's codebase (e.g. `"https://ui.iandefined.com/r/button.json"`).

### [HARD REQUIREMENT] No Example-Polluted Dependencies
- `registryDependencies` in `registry.json` must ONLY include items imported by the **installable component source itself**.
- Never declare a registry dependency or heavy npm dependency on a component merely because one of its docs demos in `examples/` uses it (e.g. do not add `text-morph` to `input.json` dependencies). Docs demos are preview illustrations, not part of the installed component bundle.

---

## 6. Registry Hooks and Utilities

- **Registry Hooks**: Stored as `src/registry/base/<hook-name>.ts`. Type is `"registry:hook"`. Export clear TypeScript types for parameters and return values.
- **Registry Utilities**: Stored as `src/registry/base/<util-name>.ts` or `src/styles/<util-name>.css`. Type is `"registry:ui"` or `"registry:style"`.

---

## 7. Blocks Architecture

- **Block Source**: Lives under `src/registry/base/<block-name>/...` with a `page.tsx` entry point.
- **Manifest Wiring**: In `registry.json`, set `type: "registry:block"` and declare all subcomponents in `files`.
- **Categories**: Blocks derive categories from the `categories` array in `registry.json`.
- **Preview & Route**: Blocks render at `/blocks` and `/blocks?category=<name>`. Preview cards are configured in `src/shared/components/blocks/block-category-grid.tsx`.
- **Strict Rule**: Do not manually edit generated block files under `public/r/*`.

---

## 8. Demos and Examples Organization

- Reusable demos live in `examples/<component>/<example-name>.tsx`.
- Default demo is always `examples/<component>/default.tsx`.
- Export the demo component as the default export (`export default function ExampleDemo()`).
- Import primitives from `@/registry/base/<component>` inside demos so previews accurately reflect what is published.
- Keep demos focused on meaningful API variations (variants, sizes, controlled state, validation, composition).
