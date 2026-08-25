---
name: launch-shadcn-registry
description: >-
  Launch and promote a custom shadcn/ui registry end-to-end: validate registry.json,
  prepare official and community directory submissions, and draft social posts for
  Reddit r/shadcn, X, Dev.to, and Hacker News. Use when the user asks to launch,
  list, submit, or announce a shadcn registry.
---

# Launch shadcn Registry

Move one shadcn-compatible registry from ready to submitted or announced.

## Inputs

Confirm whether the user wants the full launch or a subset such as official directory only, community lists only, or social drafts only. Default to preparing the full workflow when the user does not narrow scope.

Build one registry profile and reuse it everywhere. Use [templates/registry-profile.example.json](templates/registry-profile.example.json) for shape and validate against [templates/registry-profile.schema.json](templates/registry-profile.schema.json). Ask for missing fields that cannot be inferred safely.

Core profile fields:

- `scope`, `name`, `homepage`, `registryBaseUrl`, `componentUrlPattern`
- `description`, `descriptionLong`, `githubUrl`, `githubUsername`
- `distribution`, `categories`, `installExample`
- optional `logo`, `registryIndexPath`, `sampleComponents`, `features`

## Workflow

Track progress with this checklist when doing more than one step:

```markdown
- [ ] Preflight validation
- [ ] Directory artifacts
- [ ] GitHub PRs
- [ ] Social drafts
- [ ] Post-launch follow-up
```

1. Preflight: read [references/preflight.md](references/preflight.md), run `bash scripts/validate-registry.sh <registryBaseUrl> [sample-component-name]`, and fix blockers before submissions.
2. Directory artifacts: read only the reference files for the targets in scope, then prepare the entry, file path, PR title, and PR body.
3. Pull requests: use `gh`; ask before creating each PR unless the user explicitly approved opening all PRs.
4. Social drafts: produce ready-to-paste drafts only. Never auto-post to Reddit, X, Dev.to, or Hacker News.
5. Follow-up: summarize PR links and statuses, then note maintainer feedback or timing risks.

## References

Directory submissions:

- Official shadcn-ui/ui: [references/shadcn-ui-official.md](references/shadcn-ui-official.md)
- registry.directory: [references/registry-directory.md](references/registry-directory.md)
- shadcntemplates: [references/shadcntemplates.md](references/shadcntemplates.md)
- birobirobiro awesome list: [references/awesome-birobirobiro.md](references/awesome-birobirobiro.md)
- bytefer awesome list: [references/awesome-bytefer.md](references/awesome-bytefer.md)

Social drafts:

- Reddit r/shadcn: [references/social/reddit.md](references/social/reddit.md)
- X: [references/social/x.md](references/social/x.md)
- Dev.to: [references/social/devto.md](references/social/devto.md)
- Hacker News: [references/social/hackernews.md](references/social/hackernews.md)

## Guardrails

- Required tools: network access, `curl`, `git`, and `gh` authenticated for PR creation.
- Never submit to directories before preflight passes.
- Never claim listings are live until PRs are merged.
- Append official `directory.json` entries; do not reorder existing entries.
- Use one registry profile for all artifacts unless the user approves a change.
- For premium registries on shadcntemplates, note the one-free / $100 multi-premium policy without promising approval.

Recommended PR order:

1. Official `shadcn-ui/ui`
2. `rbadillap/registry.directory`
3. `shadcnblocks/shadcntemplates`
4. `birobirobiro/awesome-shadcn-ui` and `bytefer/awesome-shadcn-ui`
