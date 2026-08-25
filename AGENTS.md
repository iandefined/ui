# Agent Guidelines

This is a static-hostable TanStack Start SPA for publishing a custom shadcn/ui registry, with Fumadocs docs and Cloudflare Workers Static Assets deployment.

Use pnpm. Common commands: `pnpm dev`, `pnpm typecheck`, `pnpm check`, `pnpm fix`, `pnpm registry:build`, `pnpm static:build`, `pnpm build`, `pnpm preview`, and `pnpm deploy`.

Before substantial code work, run `pnpm intent list`; load a matching intent skill only when one clearly applies.

Do not manually edit generated output: `src/routeTree.gen.ts`, `public/r/*`, `.source/*`, `.tanstack/*`.

Load focused guidance only when the task touches that area:

- App code, routing, UI, or shared modules: [.agents/project/app.md](.agents/project/app.md)
- Docs, metadata, and generated static endpoints: [.agents/project/docs-and-static-assets.md](.agents/project/docs-and-static-assets.md)
- Cloudflare Workers deployment behavior: [.agents/project/cloudflare-workers.md](.agents/project/cloudflare-workers.md)
- shadcn registry components and previews: [.agents/project/registry-components.md](.agents/project/registry-components.md)
- Verification choices: [.agents/project/verification.md](.agents/project/verification.md)
- TanStack docs lookup: [.agents/project/tanstack-docs.md](.agents/project/tanstack-docs.md)
- Registry launch submissions or announcements: [.agents/skills/launch-shadcn-registry/SKILL.md](.agents/skills/launch-shadcn-registry/SKILL.md)
