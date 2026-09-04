<p align="center">
  <img src="https://ui.iandefined.com/og.png" alt="iandefined/ui" width="100%" />
</p>

<p align="center">
  <strong>Thoughtful components for product engineers and AI coding assistants.</strong>
  <br />
  Built with Base UI, Tailwind CSS v4, Motion, and TanStack Start.
  <br />
  <br />
  <a href="https://ui.iandefined.com">Documentation</a>
  ·
  <a href="https://ui.iandefined.com/r/registry.json">Registry Manifest</a>
  ·
  <a href="https://ui.iandefined.com/llms.txt">LLMS.txt</a>
  ·
  <a href="https://ui.iandefined.com/blocks">Blocks Catalog</a>
</p>

---

## Overview

`iandefined/ui` is an open-source registry of accessible, animated React 19 components distributed through the [shadcn registry](https://ui.shadcn.com/docs/registry). Every component installs directly into your codebase so you have 100% ownership, zero runtime package lock-in, and complete freedom to customize.

## Why iandefined/ui?

- **Human Design, AI Compatible**: Clean contracts, predictable prop interfaces, stable `data-slot` hooks, and native machine-readable endpoints (`/llms.txt`, `/llms-full.txt`, and `/.well-known/agent-skills/index.json`) empower both product engineers and AI agents to build and refactor interfaces reliably.
- **Base UI Primitives**: Built on [Base UI](https://base-ui.com) for unstyled accessibility, native HTML attribute forwarding, and clean render-prop composition (`render` and `useRender`), bypassing older `asChild` and cloneElement limitations.
- **Crafted Motion**: Natural spring physics and micro-interactions powered by [Motion](https://motion.dev), with built-in `prefers-reduced-motion` compliance across all animated states.
- **Tailwind CSS v4**: Styled using modern `@theme` OKLCH color tokens, container queries, and CSS variables.
- **Copy, Paste, Own**: Components install directly into your app using the shadcn CLI. No runtime npm dependencies on a proprietary UI framework.

---

## Component Ecosystem

The registry is divided into four functional layers:

1. **Core UI**: Primitive interactive components including `Button`, `Badge`, `Card`, `Checkbox`, `Switch`, `Slider`, `Radio Group`, `Tooltip`, `Popover`, `Select`, `Dropdown Menu`, `Tabs`, `Accordion`, and `Breadcrumbs`.
2. **Form System**: Comprehensive form composition integrating native `<form>` constraints and TanStack Form workflows with `Form`, `Field`, `Fieldset`, `Input`, `Textarea`, `Number Field`, `Input OTP`, `Input Group`, `Combobox`, and `Autocomplete`.
3. **Blocks**: Multi-file, production-ready compositions like `Sidebar 01` (under `src/registry/base/blocks/<category>/<number>/`) featuring dashboard routing, stateful navigation, and responsive layouts.
4. **Motion Utilities**: Specialized interactive utilities including `Hitbox` for accessible click targets, `IconSwap` for stateful icon morphs, and `TextMorph` for smooth text transitions.

---

## Quick Start

Install any component directly into your project:

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
```

Or install complete multi-file blocks:

```bash
npx shadcn@latest add https://ui.iandefined.com/r/sidebar-01.json
```

---

## AI & Agent Discovery

This repository serves first-class endpoints for AI coding assistants and LLM agents:

| Endpoint                                                                                                | Description                                                                      |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`/llms.txt`](https://ui.iandefined.com/llms.txt)                                                       | Compact index of all documentation pages, components, and guides.                |
| [`/llms-full.txt`](https://ui.iandefined.com/llms-full.txt)                                             | Full concatenated markdown documentation for system prompts and context windows. |
| [`/r/registry.json`](https://ui.iandefined.com/r/registry.json)                                         | Complete shadcn registry manifest with dependencies and file target mappings.    |
| [`/.well-known/agent-skills/index.json`](https://ui.iandefined.com/.well-known/agent-skills/index.json) | Structured agent skill discovery manifest.                                       |

---

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the Vite development server:

```bash
pnpm dev
```

Build installable registry JSON (`public/r/*`):

```bash
pnpm registry:build
```

Build static documentation and LLM assets (`public/docs/*`, `public/llms*`):

```bash
pnpm static:build
```

Run tests and verification:

```bash
pnpm typecheck   # Type checking with TypeScript
pnpm docs:check   # Validate all 42 MDX pages and registry mappings
pnpm check        # Format checking and Biome/Vite+ linter
pnpm fix          # Auto-format and auto-fix linter issues
```

Build and preview production bundle:

```bash
pnpm build
pnpm preview
```

---

## License

MIT © [Ian de Jesus](https://iandefined.com)
