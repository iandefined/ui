# Twemoji

Render Unicode emoji as Twemoji SVG images inline with text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`Twemoji` parses and renders standard Unicode emoji characters as Twitter Twemoji SVG images inline with text.

```tsx
import { Twemoji } from "@/registry/base/twemoji";

export default function TwemojiDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-base text-foreground">
        <Twemoji>Hello from the Philippines 🇵🇭 👋</Twemoji>
      </p>
      <p className="text-sm text-muted-foreground">
        <Twemoji>Built with modern React ⚛️, fast Vite ⚡, and love ❤️</Twemoji>
      </p>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/twemoji.json
```

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

```tsx
import { Twemoji } from "@/registry/base/twemoji";

export default function TwemojiCustomSourceDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center text-sm">
      <p>
        <Twemoji
          source={(codePoint) =>
            `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codePoint}.svg`
          }
        >
          Resolved from jsDelivr CDN 🚀 🎨 ✨
        </Twemoji>
      </p>
    </div>
  );
}
```

### Sizes

Twemoji images use relative em units and scale with the parent font size.

```tsx
import { Twemoji } from "@/registry/base/twemoji";

export default function TwemojiSizesDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-xs text-muted-foreground">
        <Twemoji>Extra small inline emoji 🚀 ✨</Twemoji>
      </p>
      <p className="text-sm">
        <Twemoji>Small body inline emoji 🚀 ✨</Twemoji>
      </p>
      <p className="text-base font-medium">
        <Twemoji>Base typography inline emoji 🚀 ✨</Twemoji>
      </p>
      <p className="text-xl font-semibold">
        <Twemoji>Large heading inline emoji 🚀 ✨</Twemoji>
      </p>
    </div>
  );
}
```

## API Reference

`Twemoji` replaces emoji sequences with inline SVG `<img>` elements. Non-emoji text passes through unchanged.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `string` | `-` | The text content containing Unicode emoji sequences to parse and render. |
| `source` | `(codePoint: string) => string` | `(codePoint) => `${TWEMOJI_CDN_URL}/${codePoint}.svg`` | Custom resolver returning the SVG asset URL for a given Unicode code point. |
| `className` | `string` | `-` | Additional CSS classes applied to rendered emoji image elements. |
