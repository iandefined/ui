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

### Light sources

Use `lightSource` with `variant="solid"` to add a one-pixel surface edge and its opposing shadow.

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/base/card";
import { Separator } from "@/registry/base/separator";

const horizontalLightSources = ["above", "below"] as const;

export default function SeparatorLightSourceDemo() {
  return (
    <div className="grid w-full max-w-lg gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Horizontal separators</CardTitle>
          <CardDescription>
            The shadow falls away from the light source.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {horizontalLightSources.map((lightSource) => (
            <div className="space-y-2" key={lightSource}>
              <p className="text-xs text-muted-foreground capitalize">
                Light source: {lightSource}
              </p>
              <Separator lightSource={lightSource} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vertical separators</CardTitle>
          <CardDescription>
            The same treatment follows the horizontal axis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-20 items-center justify-center gap-4 text-sm">
            <span>Left</span>
            <Separator
              orientation="vertical"
              lightSource="left"
              className="h-12!"
            />
            <span>Surface</span>
            <Separator
              orientation="vertical"
              lightSource="right"
              className="h-12!"
            />
            <span>Right</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

Set a custom solid line color with `className`. Directional separators use the theme's `--border` token for the edge and the current `--background` token for the opposing shadow, so the contrast follows the card surface in both themes.

### Dashed

Use `variant="dashed"` for a dashed divider. Dashed separators do not apply the directional light-source treatment.

```tsx
import { Separator } from "@/registry/base/separator";

export default function SeparatorDashedDemo() {
  return (
    <div className="w-full max-w-lg px-6 py-8">
      <Separator variant="dashed" />
    </div>
  );
}
```

## API Reference

`Separator` wraps the [Base UI Separator](https://base-ui.com/react/components/separator). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"solid" \| "dashed"` | `solid` | Sets the separator treatment. Light-source styling applies only to `"solid"`. |
| `lightSource` | `"none" \| "above" \| "below" \| "right" \| "left"` | `none` | Adds a fixed shadow opposite the selected light direction for solid separators. |
