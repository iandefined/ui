# App Conventions

Use this when changing app code, routing, UI, or shared modules.

- Stack: TypeScript, React 19, TanStack Start, Vite, Tailwind CSS 4, shadcn/ui, Fumadocs, Cloudflare Workers, and static endpoint generation.
- Use TanStack Router and Start APIs for navigation, routing, loaders, server functions, and server routes. This repo is not a Next.js app.
- Put shared app code under `src/shared`.
- Use `lucide-react` icons with the `Icon` suffix, for example `Loader2Icon`; use `react-icons/si` for brand icons.
- Keep Node-only imports out of browser-bundled code. Vite externalizes modules such as `node:crypto`, `node:fs`, and `node:path` in client code.
- Keep request-time Worker code free of real filesystem assumptions. Cloudflare `nodejs_compat` supports TanStack Start, but it does not make repo file walking work at the edge.
- Avoid request-time Wasm compilation in Worker-rendered paths. For Shiki, use the JavaScript regex engine.
- If shared component directories move, keep the `components.json` shadcn aliases in sync.
