# LLMS.txt

Let AI coding assistants use iandefined/ui documentation and registry references.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

iandefined/ui provides [llms.txt](https://llmstxt.org/) endpoints so AI coding assistants can fetch documentation, registry links, and page-specific markdown directly by URL.

## Available files

**Core documentation:**

- [/llms.txt](/llms.txt) - Quick reference index for documentation and agent resources.
- [/llms-full.txt](/llms-full.txt) - Complete generated documentation in one file.

**For limited context windows:**

- [/llms.md/content.md](/llms.md/content.md) - Homepage markdown.
- [/llms.md/docs/content.md](/llms.md/docs/content.md) - Docs index markdown.
- [/llms.md/docs/components/button/content.md](/llms.md/docs/components/button/content.md) - Single-page component documentation.

**Agent discovery:**

- [/.well-known/agent-skills/index.json](/.well-known/agent-skills/index.json) - Agent skill discovery index.
- [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md) - Site skill instructions for agents.
- [/openapi.json](/openapi.json) - Machine-readable endpoint catalog.

## Integration

**Claude Code:** Reference the docs in your prompt or project instructions:

```bash
Use iandefined/ui documentation from https://ui.iandefined.com/llms.txt
```

**Cursor:** Use the `@Docs` feature:

```bash
@Docs https://ui.iandefined.com/llms-full.txt
```

[Learn more](https://docs.cursor.com/context/@-symbols/@-docs)

**Windsurf:** Add the docs URL to your rules:

```bash
#docs https://ui.iandefined.com/llms-full.txt
```

[Learn more](https://docs.codeium.com/windsurf/memories#memories-and-rules)

**Other AI tools:** Most assistants accept documentation URLs:

```bash
https://ui.iandefined.com/llms.txt
```

For complete documentation:

```bash
https://ui.iandefined.com/llms-full.txt
```

For a specific docs page:

```bash
https://ui.iandefined.com/llms.md/docs/components/button/content.md
```

## Contributing

If AI-generated code misses a registry path, install command, or component example, update the source docs in `content/docs` and regenerate static assets with `pnpm static:build`.
