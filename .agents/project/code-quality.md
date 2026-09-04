# Code Quality

Use this guide for repository-wide TypeScript, React, imports, naming, async work, errors, formatting, and maintainability. It does not replace specialized guidance: use [component-implementation.md](component-implementation.md) for installable components, [base-ui-patterns.md](base-ui-patterns.md) for Base UI composition, [interface-and-interaction.md](interface-and-interaction.md) for UI behavior and accessibility, and [cloudflare-workers.md](cloudflare-workers.md) for runtime boundaries.

## TypeScript and React

- Let TypeScript infer local values. Add annotations at public boundaries, exported interfaces, complex generics, and values whose inference would be unclear to readers.
- Model impossible states out of public APIs. Use discriminated unions when one prop changes the validity of another.
- Keep public component props precise and documented. Follow [component-implementation.md](component-implementation.md) for registry-specific literal-union and portability requirements.
- Prefer composition and small focused components over boolean-heavy, multi-purpose APIs.
- Derive values during render when possible. Use effects only to synchronize with an external system or browser API.
- Keep hooks unconditional and isolate reusable stateful behavior in custom hooks.

## Imports, Names, and Modules

- Use the repository path aliases for shared application and registry imports. Keep consumer-facing registry imports aligned with the installed destination.
- Use `import type` for type-only imports and remove unused imports, exports, and dead branches.
- Name React components and exported types in PascalCase; functions, variables, props, and hooks in camelCase; hooks begin with `use`.
- Name files after their primary export using the local convention: kebab-case for registry and shared modules, framework-required names where routing or tooling requires them.
- Keep module ownership obvious. Do not create a new shared abstraction until at least two callers have a stable, shared need.

## Async Work and Errors

- Represent loading, success, empty, and error states deliberately. Do not leave pending promises or failed mutations without user-visible handling when a user action initiated them.
- Preserve the original error as the `cause` when adding context. Avoid swallowing errors; either handle them locally with a recovery path or let the caller/boundary handle them.
- Validate untrusted inputs at their boundary and return actionable errors without exposing secrets or internal implementation details.
- Keep browser-only and Worker/server-only code separated. Follow [cloudflare-workers.md](cloudflare-workers.md) and [app.md](app.md) for environment boundaries.

## Formatting and Maintainability

- Match the repository formatter and lint configuration. Do not hand-format around tools or run `pnpm fix` unless rewriting files is intended and its scope is reviewed.
- Prefer readable control flow, early returns, and named intermediate values over dense nested expressions.
- Keep comments for non-obvious intent, constraints, or tradeoffs; do not restate code.
- Update the narrowest relevant agent guide when a durable convention changes. Avoid duplicating specialized rules in this guide.
- Use [verification.md](verification.md) to choose proportionate checks and preserve unrelated worktree changes.
