<p align="center">
  <img src="https://tanstartercn.tsu.moe/marketing-og-image.png" alt="tanstartercn" />
</p>

<p align="center">
  A highly customizable shadcn registry template repository built with TanStack Start.  Fork, customize, and deploy free to Cloudflare Workers.
  <br />
  <br />
  <a href="https://tanstartercn.tsu.moe">Documentation</a>
  ·
  <a href="https://tanstartercn.tsu.moe/r/registry.json">Registry</a>
  ·
  <a href="https://tanstartercn.tsu.moe/llms.txt">LLMS.txt</a>
  <br />
  <br />
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/tsu-moe/tanstartercn.git">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare" />
  </a>
</p>

## Features

- **Registry compatible** - Components install with `npx shadcn@latest add <url>`.
- **Fumadocs documentation** - MDX docs in `content/docs`.
- **Component previews** - Live examples from `examples` or inline MDX.
- **Static AI docs** - Generated `llms.txt`, `llms-full.txt`, markdown mirrors, OpenAPI, and agent discovery files.
- **Cloudflare Workers deploy** - Static-hostable SPA with Worker Static Assets.

## Built In

- `TanStack Start` with file routes and static prerendering
- `React 19` and `TypeScript`
- `Tailwind CSS 4`
- `Fumadocs` for documentation
- `shiki` + `rehype-pretty-code` for code blocks
- `sonner` for toasts
- `@base-ui/react` for accessible primitives

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

Build and deploy:

```bash
pnpm build
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
npx shadcn@latest add https://tanstartercn.tsu.moe/r/button.json
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
├── registry.json           # Component registry manifest
├── content/docs/           # Documentation (MDX)
└── public/r/               # Built registry files (auto-generated)
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm registry:build` - Rebuild the component registry
- `pnpm static:build` - Generate static endpoint files

## Acknowledgements

- This project was originally forked from [shadcn-labs/startercn](https://github.com/shadcn-labs/startercn) and refactored into TanStack Start together with my own preferences.
  - I urge you to support the original project and use it if you prefer a Vercel or Next.js approach to deploying this repository.

- I'd also like to spend some time appreciating the amazing work being done at [fumadocs](https://github.com/fuma-nama/fumadocs); the cleanest React documentation framework in the ecosystem today and their constant innovation in the documentation space.

- I would also like to extend my thanks to [shadcn-ui-blocks](https://github.com/akash3444/shadcn-ui-blocks) for being the inspiration to the `/blocks` page of the registry.

## License

[MIT](./LICENSE)
