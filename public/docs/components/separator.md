# Separator

Visually or semantically separates content.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Separator` to distinguish adjacent groups of content.

## Preview

## Installation

## Usage

```tsx
import { Separator } from "@/components/ui/separator";
```

```tsx
<div>
  <p>Content above the separator.</p>
  <Separator className="my-4" />
  <p>Content below the separator.</p>
</div>
```

## Examples

Use `orientation="vertical"` when the separator divides content arranged side by side.

## API Reference

`Separator` wraps the [Base UI Separator](https://base-ui.com/react/components/separator). Supported Base UI props pass through.
