# Extending

How to author docs pages, registry components, multi-file blocks, and examples.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

This section is for maintainers and contributors who are interested in helping develop, improve, and contribute to the repository.

## Getting Started

Clone the repository and install dependencies to begin local development:

```bash
git clone https://github.com/iandefined/ui.git
cd ui
pnpm install
```

## Add a Registry Component

Installable component source belongs in the single `src/registry/base/` directory:

```txt
src/registry/base/my-component.tsx
```

### Component Architecture Conventions

Follow these repository standards when authoring components:

- **Base UI Wrappers**: Wrap Base UI primitives and pass through supported attributes using `render` or `useRender` polymorphism.
- **Semantic Slot Attributes**: Add a stable, kebab-case `data-slot="my-component"` attribute to every public part.
- **Animation and Reduced Motion**: When using Motion springs, check `useReducedMotion()` and add `motion-reduce:transition-none` to ensure animations gracefully disable for users with motion sensitivities.
- **Deterministic Rendering**: Avoid runtime randomness such as `Math.random()` to prevent SSR hydration mismatches and React Compiler purity warnings.
- **Exported Types**: Export component prop interfaces and key type unions (such as `MyComponentSize` or `MyComponentVariant`).

### Manifest Registration

Add the component to the `items` array in `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A concise description of what it provides.",
  "dependencies": ["@base-ui/react", "motion"],
  "files": [
    {
      "path": "src/registry/base/my-component.tsx",
      "type": "registry:ui",
      "target": "components/ui/my-component.tsx"
    }
  ]
}
```

- `dependencies`: List external npm packages imported by the component.
- `registryDependencies`: List other registry items imported by the component (for example: `["button"]`).
- `files[].target`: Set the destination path where consumers receive the file in their project.

Do not edit `public/r/*` by hand. Run `pnpm registry:build` after manifest changes.

## Add a Block to `/blocks`

Blocks are multi-file, full-feature UI layouts or page compositions (such as sidebars, dashboard shells, or authentication screens) exposed on `/blocks`.

### 1. Directory Structure

Place each block inside a category and two-digit numeric directory:

```txt
src/registry/base/blocks/<category>/<number>/page.tsx
src/registry/base/blocks/<category>/<number>/components/my-subcomponent.tsx
```

For example: `src/registry/base/blocks/sidebar/01/page.tsx`.

- `page.tsx`: The primary block entry point that exports the main composition as default export.
- `components/`: Companion subcomponents used by the block layout.

### 2. Registry Manifest

Add the block entry to `registry.json`:

```json
{
  "name": "sidebar-01",
  "type": "registry:block",
  "title": "Sidebar 01",
  "description": "A simple sidebar with navigation and user menu.",
  "categories": ["sidebar"],
  "registryDependencies": ["sidebar", "button", "avatar"],
  "files": [
    {
      "path": "src/registry/base/blocks/sidebar/01/page.tsx",
      "type": "registry:page",
      "target": "app/dashboard/page.tsx"
    },
    {
      "path": "src/registry/base/blocks/sidebar/01/components/app-sidebar.tsx",
      "type": "registry:component",
      "target": "components/app-sidebar.tsx"
    }
  ]
}
```

- `categories`: Must match the directory category name.
- `files`: Declare every authored file in the block directory with appropriate `target` paths.

### 3. Development Path Aliases

Because block companion components import each other using consumer-facing paths (such as `@/components/app-sidebar`), configure path mappings in `tsconfig.json` under `compilerOptions.paths`:

```json
"@/components/app-sidebar": ["./src/registry/base/blocks/sidebar/01/components/app-sidebar.tsx"]
```

This allows Vite and `pnpm typecheck` to resolve files locally during development without modifying consumer-facing imports in the published code.

### 4. In-App Preview Registration

Register the block's `page.tsx` default export in `src/shared/lib/registry.ts`:

```tsx
import Sidebar01Page from "@/registry/base/blocks/sidebar/01/page";

const registryComponents: Record<string, RegistryComponent> = {
  "sidebar-01": Sidebar01Page as RegistryComponent,
};
```

The `/blocks/<name>/preview` route renders this component in an isolated iframe.

### 5. Category Navigation

The block catalog is aggregated automatically from `registry.json` by `src/shared/lib/blocks.ts`. If a category requires a custom display label (such as `auth` becoming `Authentication`), add it to `categoryTitles` in `src/shared/lib/blocks.ts`. Otherwise, category names are title-cased automatically.

## Write Component Documentation

Component documentation lives in `content/docs/components/<name>.mdx`. Every page should follow this structured sequence:

1. **Frontmatter**: Title and concise one-sentence description.
2. **Lede**: One or two sentences stating what the component does.
3. **Preview**: Default interactive demo via `ComponentPreview`.
4. **Installation**: Package-manager switcher via `ComponentInstall`.
5. **Usage**: Clean code snippet showing consumer import from `@/components/ui/<name>`.
6. **Examples**: Focused previews highlighting specific variations.
7. **API Reference**: Documented props using `ApiPropsList` and `ApiProp`.

### Template

````mdx
---
title: My Component
description: An accessible Base UI component with smooth spring animations.
---

Use `MyComponent` to trigger actions or display state.

## Preview

<ComponentPreview name="button/default" />

## Installation

<ComponentInstall name="button" />

## Usage

```tsx
import { MyComponent } from "@/components/ui/my-component";
```

````

```tsx
<MyComponent variant="default">Click me</MyComponent>
```

## Examples

### With Icon

Display an icon alongside the text label:

## API Reference

`MyComponent` wraps the corresponding [Base UI primitive](https://base-ui.com). Supported Base UI props pass through.

### Props

Controls the visual presentation.
Prevents user interaction when true.
```

### Demo Examples

Reusable preview demos live in `examples/<component>/<example>.tsx`:

```tsx

export default function MyComponentDefault() {
return <MyComponent>Default Example</MyComponent>;
}
```

The `examples/` directory is discovered dynamically by Vite, so `examples/my-component/default.tsx` is automatically referenced in MDX as `my-component/default`.

## Smoke-Test Registry Output

Test the installable registry JSON before deploying:

```bash
npx shadcn@latest add https://ui.iandefined.com/r/my-component.json --dry-run
```

Confirm that the payload contains valid code, dependencies, and file target mappings.

## Verification Workflow

Run the verification suite to ensure all TypeScript types, documentation frontmatter, formatting, and linting rules pass:

```bash
pnpm registry:build
pnpm static:build
pnpm typecheck
pnpm docs:check
pnpm check
```

- `pnpm registry:build`: Rebuilds `public/r/*` registry payloads.
- `pnpm static:build`: Synchronizes `public/docs/*`, `public/llms*`, and static endpoint assets.
- `pnpm typecheck`: Validates TypeScript without compilation errors.
- `pnpm docs:check`: Asserts that all 42 MDX pages have valid frontmatter, preview tags, and installation components.
- `pnpm check`: Validates code formatting and Biome/Vite+ linter rules.
