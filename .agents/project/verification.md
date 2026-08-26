# Verification

Choose the smallest verification step that can catch the likely failure. Do not run every project command after every edit.

## Small Changes

For copy edits, agent-guidance changes, MDX adjustments, example spacing, styles, or a focused update to an existing registry item:

- inspect the diff;
- run `git diff --check` for whitespace and patch integrity;
- run a more focused check only when the changed file type or risk warrants it.

Do not run `pnpm registry:build`, `pnpm static:build`, `pnpm build`, or `pnpm preview` for these changes by default.

## Focused Code Checks

- Run `pnpm typecheck` for TypeScript, component API, prop, export, or import changes.
- Run `pnpm check` when formatting or lint rules are relevant and the task is broad enough to justify a repository-wide check.
- Prefer a targeted formatter or inspection over `pnpm fix`; `pnpm fix` can rewrite unrelated files.
- For visual changes, inspect the affected preview when a development server is already available. Do not start a production build solely for a small visual adjustment.

## New Registry Entries

Creating a new registry entry adds generated publication surfaces and warrants the fuller workflow:

1. Run `pnpm typecheck` and `pnpm check`.
2. Run `pnpm build`. It already composes registry generation, static generation, and the Vite production build.
3. Inspect the new `public/r/<name>.json`, generated documentation endpoints, and final build result.

Use `pnpm registry:build` or `pnpm static:build` directly only when verifying that narrower generator without running the complete build.

Do not manually edit generated output. Fix the source, manifest, metadata, or generator and rerun the relevant command.

## Commit And Push To Main

When the user explicitly asks to commit and push to `main`, run the checks and generation relevant to the complete change before committing, even if individual edits were small. For registry or docs work this normally means:

1. `pnpm typecheck`
2. `pnpm check`
3. `pnpm build`, which includes `registry:build` and `static:build`

Inspect the final diff, include intentional generated changes, commit with the exact requested message when one is provided, and push only after the checks pass or the user accepts a clearly reported pre-existing failure.

## Deployment-Specific Verification

Use `pnpm preview` and HTTP smoke checks only for Cloudflare/static-delivery work, explicit deployment preparation, or when the user asks for them. Confirm `/`, a docs route, `/r/<component>.json`, `/docs/<component>.mdx`, `/llms.txt`, `/llms-full.txt`, and a built asset when the static delivery contract changed.

For Cloudflare Workers changes, inspect the prerender log and confirm real static files are served by Worker Static Assets before the Worker. If preview returns 307 or 404 for assets, inspect `public/_redirects`, `dist/client/_redirects`, `wrangler.jsonc`, and `src/server.ts` before changing app routes.

## Baseline Failures

If a repository-wide command fails because of unrelated existing work, do not broaden the task by fixing it silently. Record the exact command and failure, verify the changed files as narrowly as possible, and report the distinction.
