# Verification

Use this when choosing checks for a change.

- Prefer targeted checks while iterating, then run the broader command that matches the risk.
- TypeScript or API changes: `pnpm typecheck`.
- Formatting and linting: `pnpm check`; use `pnpm fix` for automatic fixes.
- Registry output changes: `pnpm registry:build`.
- Static endpoint changes: `pnpm static:build`.
- Route, migration, or deployment changes: run `pnpm build`, then smoke-test `pnpm preview` for `/`, `/docs`, a nested docs page, `/llms.txt`, `/llms-full.txt`, registry JSON under `/r`, and one built CSS/JS asset under `/assets`.
- For Cloudflare Workers changes, inspect the prerender log. Expected healthy output is 9 prerendered pages, no repeated 404 retries, and only intentional static redirect/header rules.
- For billing-sensitive Cloudflare changes, verify static asset URLs are served by Worker Static Assets before the Worker. Real files under `/assets`, `/r`, favicons, generated text files, and `.well-known` should not appear as Worker invocations in deployed logs.
- If preview returns 307 or 404 for static assets, inspect `public/_redirects`, `dist/client/_redirects`, `wrangler.jsonc`, and `src/server.ts` before changing app routes.
