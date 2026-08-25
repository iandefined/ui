# Docs And Static Assets

Use this when changing docs, file-like routes, public metadata, or generated static endpoints.

- Fumadocs content is authored in `content/docs`; TanStack file routes render it.
- Docs navigation is filesystem-first: MDX files under `content/docs` become pages, and `meta.json` is optional metadata/custom ordering rather than a required manifest.
- Static-looking routes use escaped file-route names, for example `llms[.]txt.ts`. In PowerShell, use `-LiteralPath` for files with square brackets.
- File-like public URLs such as `/llms.txt`, `/rss.xml`, `/sitemap.xml`, and `/openapi.json` should be served as real documents and linked with normal anchors when browser navigation would be wrong.
- Generated machine-readable files come from `scripts/generate-static-assets.mjs`. Run `pnpm static:build` after changing markdown mirrors, RSS, sitemap, robots, manifest, OpenAPI, API catalog, or `.well-known` outputs.
- Routes that must work before generated public files exist need explicit TanStack server handlers or Vite-loadable data.
- Preserve public URL compatibility for registry, docs, markdown mirror, and agent-discovery endpoints even if internal files move.
- On Cloudflare Workers, generated public files are served through Worker Static Assets from `dist/client`; see [cloudflare-workers.md](cloudflare-workers.md) before changing asset routing.
- Prefer build-time generated text/assets for file-like endpoints. Server routes for `/llms.txt`, RSS, sitemap, or OpenAPI must not scan `content/` with `node:fs` at request time.
