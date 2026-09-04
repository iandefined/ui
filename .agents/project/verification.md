# Verification

Choose the smallest check that can catch the likely failure. Passing `pnpm typecheck` is sufficient ordinary build confidence; do not run `pnpm build` after routine code, documentation, or refactor batches.

## Default Checks

- Inspect the diff and run `git diff --check` for every authored change.
- Run `pnpm typecheck` for TypeScript, component APIs, exports, imports, routes, or build-time module changes.
- Run `pnpm docs:check` when it exists and documentation, previews, installation metadata, or MDX infrastructure changes.
- Run `pnpm check` when lint or formatting risk is material, after broad integration waves, or when explicitly requested.
- Prefer focused inspection or a targeted formatter over `pnpm fix`; `pnpm fix` can rewrite unrelated files.

## Generated Outputs

- Run `pnpm registry:build` only when registry publication artifacts must be regenerated or verified.
- Run `pnpm static:build` only when generated docs, metadata, or static endpoints must be refreshed or verified.
- Never hand-edit generated output. Fix authored source, manifest, metadata, or generators, run the narrow required generator, and inspect its diff.

## Build and Deployment Checks

- Run composite `pnpm build` only for build-pipeline, deployment, Cloudflare, or generator-integration changes, or when the user explicitly requests it.
- Run `pnpm preview` and HTTP smoke checks only for deployment behavior, static-delivery changes, or an explicit preview/deployment request. Follow [cloudflare-workers.md](cloudflare-workers.md) for routes to verify.
- For visual changes, inspect the affected preview when a development server is available. Do not start a production build solely for a focused visual adjustment.

## Baselines and Reporting

- Establish a baseline before broad work with the proportionate checks above; distinguish pre-existing failures from introduced failures.
- If a repository-wide check fails for unrelated existing work, do not fix it silently. Record the command and failure, verify the changed files narrowly, and report the distinction.
- Preserve unrelated worktree changes. Before commits or deployments, review generated and authored diffs separately and include only intentional output.
