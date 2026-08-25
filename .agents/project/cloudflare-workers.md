# Cloudflare Workers

Use this when changing deployment, prerendering, Wrangler config, Worker entrypoints, generated static assets, or anything that behaves differently on Cloudflare Workers than in local Node.

- Deployment target: Cloudflare Workers with Worker Static Assets, not Cloudflare Pages.
- Use `@cloudflare/vite-plugin` before `tanstackStart()` in `vite.config.ts`. The SSR Vite environment name is `ssr`.
- Use `wrangler deploy`, not `wrangler pages deploy`. Pages `pages_build_output_dir` maps to Workers `assets.directory`.
- Keep `compatibility_flags: ["nodejs_compat"]` for TanStack Start, but do not treat it as a local filesystem.
- Point `wrangler.jsonc` `assets.directory` at `dist/client`. Add `assets.binding`, usually `ASSETS`, only when the Worker must fetch assets itself.
- Keep Cloudflare's default asset-first routing so real files under `/assets`, `/r`, favicons, markdown mirrors, generated metadata, and `.well-known` do not invoke the Worker.
- Avoid global `assets.run_worker_first: true`. Use `assets.run_worker_first` only for narrow route patterns that need Worker-first behavior.
- Do not use a Pages-style `_redirects` fallback such as `/* /_shell.html 200`; real files should be served by Worker Static Assets and misses should reach TanStack.
- Build-time generated endpoints are safer than request-time filesystem reads. Generate `llms.txt`, `llms-full.txt`, markdown mirrors, RSS, sitemap, OpenAPI, API catalog, and `.well-known` outputs with `scripts/generate-static-assets.mjs`.
- Server routes for file-like endpoints must be Worker-safe: avoid `node:fs`, directory walking, and `process.cwd()` assumptions in request handlers.
- Runtime syntax highlighting and markdown tooling must avoid request-time Wasm compilation. Prefer Shiki's JavaScript regex engine for Worker-rendered paths.
- Treat `pnpm preview` as the deployment smoke test for this repo because it runs the Cloudflare/Vite Worker environment. Plain static preview is not enough.
