# Badge

Compact labels for status, category, or metadata.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Badge` to communicate concise status, category, or count information.

## Preview

## Installation

## Usage

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Badge</Badge>;
```

## Features

Set `color` only with `translucent` or `dot`. Semantic variants such as `success` and `warning` own their color.

## Examples

### Semantic variants

Choose a semantic state.

### Palette colors

Use a palette color with a palette-driven variant.

### Sizes

Use compact badges in dense layouts.

### With Icon

Add a small, meaningful icon.

### With Link

Render a navigation target through `render`.

### With Count

Communicate a compact count.

## API Reference

`Badge` uses Base UI's [`useRender`](https://base-ui.com/react/utils/use-render) for polymorphic rendering. Standard element props pass through.

### Props

Sets the semantic or palette-driven appearance.
Sets a palette color when `variant` is `"translucent"` or `"dot"`.
Sets the badge height and spacing.
