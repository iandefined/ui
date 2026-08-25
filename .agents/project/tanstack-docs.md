# TanStack Docs

Use this when TanStack Router, TanStack Start, or TanStack Query behavior needs confirmation.

Use `pnpm tanstack` for docs lookup. Always pass `--json` for machine-readable output.

```bash
pnpm tanstack libraries --json
pnpm tanstack doc router framework/react/guide/data-loading --json
pnpm tanstack doc query framework/react/overview --docs-version v5 --json
pnpm tanstack search-docs "server functions" --library start --json
pnpm tanstack search-docs "loaders" --library router --framework react --json
```
