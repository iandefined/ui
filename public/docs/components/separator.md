# Separator

Visually or semantically separates content.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Separator` to distinguish adjacent groups of content.

## Preview

```tsx
import { Separator } from "@/registry/base/separator";

export default function SeparatorDefaultDemo() {
  return (
    <div className="max-w-72">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">iandefined/ui</h4>
        <p className="text-sm text-muted-foreground">
          Thoughtful components for product engineers.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
        <Separator orientation="vertical" />
        <div>Releases</div>
      </div>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/separator.json
```

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

```tsx
import { Separator } from "@/registry/base/separator";

export default function SeparatorDefaultDemo() {
  return (
    <div className="max-w-72">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">iandefined/ui</h4>
        <p className="text-sm text-muted-foreground">
          Thoughtful components for product engineers.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
        <Separator orientation="vertical" />
        <div>Releases</div>
      </div>
    </div>
  );
}
```

## API Reference

`Separator` wraps the [Base UI Separator](https://base-ui.com/react/components/separator). Supported Base UI props pass through.
