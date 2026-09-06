# Twemoji

Render Unicode emoji as Twemoji SVG images inline with text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`Twemoji` parses and renders standard Unicode emoji characters as Twitter Twemoji SVG images inline with text.

## Installation

## Usage

```tsx
import { Twemoji } from "@/components/ui/twemoji";
```

```tsx
<Twemoji>Hello from the Philippines 🇵🇭</Twemoji>
```

## Examples

### Custom Source

Resolve emoji assets from an alternative CDN or self-hosted endpoint with the `source` prop.

### Sizes

Twemoji images use relative em units and scale with the parent font size.

## API Reference

`Twemoji` replaces emoji sequences with inline SVG `<img>` elements. Non-emoji text passes through unchanged.

### Props

The text content containing Unicode emoji sequences to parse and render.
defaultValue="(codePoint) => `${TWEMOJI_CDN_URL}/${codePoint}.svg`"
>
Custom resolver returning the SVG asset URL for a given Unicode code point.
Additional CSS classes applied to rendered emoji image elements.
