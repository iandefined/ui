# Docs And Static Assets

Use this when changing docs, file-like routes, public metadata, or generated static endpoints. For component page authoring, MDX components, and API Reference standards, see [documentation.md](documentation.md).

- Fumadocs content is authored in `content/docs`; TanStack file routes render it.
- Docs navigation is filesystem-first: MDX files under `content/docs` become pages, and `meta.json` is optional metadata/custom ordering rather than a required manifest.
- Static-looking routes use escaped file-route names, for example `llms[.]txt.ts`. In PowerShell, use `-LiteralPath` for files with square brackets.
- File-like public URLs such as `/llms.txt`, `/rss.xml`, `/sitemap.xml`, and `/openapi.json` should be served as real documents and linked with normal anchors when browser navigation would be wrong.
- Generated machine-readable files come from `scripts/generate-static-assets.mjs`. Do not run `pnpm static:build` for small copy edits, MDX refinements, example-layout changes, or focused updates to existing components by default.
- Routes that must work before generated public files exist need explicit TanStack server handlers or Vite-loadable data.
- Preserve public URL compatibility for registry, docs, markdown mirror, and agent-discovery endpoints even if internal files move.
- On Cloudflare Workers, generated public files are served through Worker Static Assets from `dist/client`; see [cloudflare-workers.md](cloudflare-workers.md) before changing asset routing.
- Prefer build-time generated text/assets for file-like endpoints. Server routes for `/llms.txt`, RSS, sitemap, or OpenAPI must not scan `content/` with `node:fs` at request time.
- Run `pnpm static:build` directly, or through the composite `pnpm build`, when creating a new registry entry, changing the generator or public endpoint contract, preparing work the user asked to commit and push to `main`, or when the user explicitly requests generated assets, a build, preview, or deployment.
- Review generated diffs instead of hand-editing `public/docs/*`, `public/llms*`, or `src/shared/generated/llms.txt`.
