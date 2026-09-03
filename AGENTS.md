# iandefined/ui Agent Guidelines

This repository is a static-hostable TanStack Start SPA for publishing a custom shadcn/ui registry with Fumadocs and Cloudflare Workers Static Assets.

Use pnpm. Common commands are `pnpm dev`, `pnpm typecheck`, `pnpm check`, `pnpm fix`, `pnpm registry:build`, `pnpm static:build`, `pnpm build`, `pnpm preview`, and `pnpm deploy`.

Before substantial work, run `pnpm intent list` and load a matching intent skill only when one clearly applies.

Use the smallest relevant set of guidance below. Do not load every document by default.

Do not manually edit generated output: `src/routeTree.gen.ts`, `public/r/*`, `public/docs/*`, `public/llms*`, `src/shared/generated/llms.txt`, `.source/*`, or `.tanstack/*`.

## Living Agent Documentation

- Treat `AGENTS.md` and `.agents/**/*.md` as maintained project documentation, not a static snapshot.
- When a user establishes a durable preference, corrects a repeated workflow, or changes project architecture, update the relevant focused guide in the same task.
- Keep this root file short. Add detailed instructions to the narrowest applicable `.agents` document, then add or update its link here.
- Record reusable rules and conventions. Do not preserve one-off implementation details that are unlikely to guide future work.
- When guidance and the repository disagree, inspect the current code and scripts, update stale guidance, and mention any unresolved ambiguity.

## Cross-Cutting Guidance

- Verification scope, tiered checks, and baseline failures: [.agents/project/verification.md](.agents/project/verification.md)
- Interface, interaction, forms, motion, accessibility, and visual standards: [.agents/project/interface-and-interaction.md](.agents/project/interface-and-interaction.md)
- Component documentation pages, API Reference tables, and MDX authoring vocabulary: [.agents/project/documentation.md](.agents/project/documentation.md)

## Task Entry Points

- shadcn registry components, TypeScript prop standards, registry CSS, and manifest wiring: [.agents/project/registry-components.md](.agents/project/registry-components.md)
- App code, routing, UI shell, and CSS architecture: [.agents/project/app.md](.agents/project/app.md)
- Docs infrastructure, static asset generation, and public endpoints: [.agents/project/docs-and-static-assets.md](.agents/project/docs-and-static-assets.md)
- Cloudflare Workers runtime and deployment behavior: [.agents/project/cloudflare-workers.md](.agents/project/cloudflare-workers.md)
- TanStack-specific API or framework lookup: [.agents/project/tanstack-docs.md](.agents/project/tanstack-docs.md)
- Registry launch submissions or announcements: [.agents/skills/launch-shadcn-registry/SKILL.md](.agents/skills/launch-shadcn-registry/SKILL.md)
