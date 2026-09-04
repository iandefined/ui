# Docs And Static Assets

Use this when changing docs infrastructure, file-like routes, public metadata, or generated static endpoints. For authored page structure, see [docs-writing.md](docs-writing.md). For MDX components, see [mdx-authoring.md](mdx-authoring.md). For API Reference content, see [api-reference.md](api-reference.md).

- Fumadocs content is authored in `content/docs`; TanStack file routes render it.
- Docs navigation is filesystem-first: MDX files under `content/docs` become pages, and `meta.json` is optional metadata/custom ordering rather than a required manifest.
- Static-looking routes use escaped file-route names, for example `llms[.]txt.ts`. In PowerShell, use `-LiteralPath` for files with square brackets.
- File-like public URLs such as `/llms.txt`, `/rss.xml`, `/sitemap.xml`, and `/openapi.json` should be served as real documents and linked with normal anchors when browser navigation would be wrong.
- Generated machine-readable files come from `scripts/generate-static-assets.mjs`.
- Routes that must work before generated public files exist need explicit TanStack server handlers or Vite-loadable data.
- Preserve public URL compatibility for registry, docs, markdown mirror, and agent-discovery endpoints even if internal files move.
- On Cloudflare Workers, generated public files are served through Worker Static Assets from `dist/client`; see [cloudflare-workers.md](cloudflare-workers.md) before changing asset routing.
- Prefer build-time generated text/assets for file-like endpoints. Any server fallback must follow the request-time restrictions in [cloudflare-workers.md](cloudflare-workers.md).
- Follow [verification.md](verification.md) when deciding whether generated assets, a composite build, or a preview is required.
- Review generated diffs instead of hand-editing `public/docs/*`, `public/llms*`, or `src/shared/generated/llms.txt`.
