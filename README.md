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
  <a href="https://ui.iandefined.com/blocks">Blocks</a>
  ·
  <a href="https://ui.iandefined.com/icons">Icons</a>
</p>

## Quick Start

Install any component directly into your project:

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
```

The registry declares `cn` as a dependency for components that use it, so the
CLI installs the package automatically.

Or install complete multi-file blocks:

```bash
npx shadcn@latest add https://ui.iandefined.com/r/sidebar-01.json
```

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
pnpm typecheck    # Type checking with TypeScript
pnpm docs:check   # Validate all 42 MDX pages and registry mappings
pnpm check        # Format checking and Biome/Vite+ linter
pnpm fix          # Auto-format and auto-fix linter issues
```

Build and preview production bundle:

```bash
pnpm build
pnpm preview
```

## Optional Umami Analytics

Umami analytics is enabled only when both of these variables are set in the
environment that runs `pnpm build`. For Cloudflare deployments, add them under
the project’s **Build → Variables and secrets** settings:

```bash
VITE_UMAMI_SCRIPT_URL=https://umami-neptune.messy.top/script.js
VITE_UMAMI_WEBSITE_ID=756db1fe-2f10-4965-a610-200986f5a5bd
```

This is optional: if either variable is missing or empty, the Umami script is
not included in the generated site.

## License

MIT © [Ian de Jesus](https://iandefined.com)
