<p align="center">
  <img src="https://ui.iandefined.com/og.png" alt="tanstartercn" />
</p>

<p align="center">
  Thoughtful components for product engineers.
  <br />
  <br />
  <a href="https://ui.iandefined.com">Documentation</a>
  ·
  <a href="https://ui.iandefined.com/r/registry.json">Registry</a>
  ·
  <a href="https://ui.iandefined.com/llms.txt">LLMS.txt</a>
</p>

## Development Setup

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build generated registry files:

```bash
pnpm registry:build
```

Build generated docs, LLM files, sitemap, OpenAPI, and discovery files:

```bash
pnpm static:build
```

Run checks:

```bash
pnpm typecheck
pnpm check
```

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Deploy to Cloudflare Workers (this also runs the production build):

```bash
pnpm deploy
```

## Adding Registry Components

Put installable component source under the default style folder:

```txt
src/registry/base/my-component.tsx
```

Use shadcn-compatible imports in registry source. Installed code should import from paths that exist in a user's app, such as `@/lib/utils` and `@/components/ui/button`.

Add the item to `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A concise description of what it provides.",
  "files": [
    {
      "path": "src/registry/base/my-component.tsx",
      "type": "registry:ui",
      "target": "components/ui/my-component.tsx"
    }
  ]
}
```

Then add a docs page under `content/docs/components/my-component.mdx` and wire any preview component in `src/shared/lib/registry.ts`.

Do not edit generated output by hand:

- `src/routeTree.gen.ts`
- `public/r/*`
- `.source/*`
- `.tanstack/*`

Regenerate generated files with the matching script instead.

## Usage

Users install published registry components with the shadcn CLI:

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
```

## Project Structure

```
├── src/
│   ├── registry/
│   │   └── base/           # Registry component source
│   │       └── button.tsx
│   ├── routes/             # TanStack Start routes
│   ├── shared/             # Shared components, hooks, lib, constants, SEO
│   └── styles/             # Global CSS and themes
├── examples/               # Reusable component previews
├── scripts/                # Build-time static asset generation
├── registry.json           # Component registry manifest
├── content/docs/           # Documentation (MDX)
└── public/r/               # Built registry files (auto-generated)
```

## Scripts

| Command               | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `pnpm dev`            | Start the development server on port 3000.                    |
| `pnpm typecheck`      | Type-check the project without writing output.                |
| `pnpm check`          | Check formatting and linting.                                 |
| `pnpm fix`            | Apply available formatting and lint fixes.                    |
| `pnpm registry:build` | Rebuild `public/r` from `registry.json`.                      |
| `pnpm static:build`   | Generate static docs, discovery, sitemap, and OpenAPI assets. |
| `pnpm build`          | Build the registry, static assets, and production app.        |
| `pnpm preview`        | Serve the production build locally.                           |
| `pnpm cf-typegen`     | Regenerate Cloudflare Worker bindings.                        |
| `pnpm deploy`         | Build and deploy to Cloudflare Workers.                       |

## Acknowledgements

- This project was originally forked from [tanstartercn](https://tanstartercn.tsu.moe/).

## License

[MIT](./LICENSE)
