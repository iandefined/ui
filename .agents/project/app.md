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
- When a Base UI trigger should look and behave like a project button, compose the existing Button through the primitive's `render` prop instead of styling the trigger primitive directly.
- Use a consistent layering scale: `z-10`/`z-20` for local component details and sticky side content, `z-30` for elevated non-portalled previews that must remain below app chrome, `z-40` for the sticky app header, and `z-50` for every portalled overlay primitive (including tooltips, menus, popovers, selects, and modal UI). Overlay primitives own their stacking; consumers should not add one-off z-index overrides. Keep backdrop elements before their overlay content in portal order and avoid `z-100`. A composite control whose open trigger must render above its own integrated `z-50` popup may use `z-[51]` only for that open state; do not keep ordinary page controls globally elevated.
- Keep `globals.css` portable for installed registry components. Import app-only styles through `app.css`; put generic app utilities in `utilities.css`, registry-style utilities in their own stylesheet (for example `hitbox.css`), and repository-only selectors in `components.css`.
- For custom SVG icons in UI components, always set explicit SVG `width`/`height` (attributes or classes); iOS Safari/WebKit can render unsized SVGs differently from Chromium even when the DOM and viewBox are correct.