# Scroll Area

A scrollable region with custom scrollbars and optional background fades.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `ScrollArea` for a bounded region that needs styled scrolling and optional overflow fades.

## Preview

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/scroll-area.json
```

## Usage

```tsx
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";
```

```tsx
<ScrollArea className="h-64" scrollShadow="vertical">
  <ScrollAreaContent className="p-4">...</ScrollAreaContent>
</ScrollArea>
```

`scrollShadow="vertical"` fades into the surface behind the scroll area only on edges that have overflow, so the top fade is hidden at the initial scroll position. Set `fadeColor` only when you need an explicit color override.

## Composition

```tsx
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";

<ScrollArea>
  <ScrollAreaContent />
</ScrollArea>;
```

## Examples

### Horizontal Layout

Use `orientation="horizontal"` when the content overflows inline.

### Both Scroll

Use `orientation="both"` to render horizontal and vertical scrollbars for content that overflows in both directions.

### Vertical Scroll Shadows

Set `scrollShadow` independently of the scrollbar orientation to fade only the overflowing edges.

### Horizontal Scroll Shadows

### Both Scroll Shadows

### Hide Scrollbar

Set `hideScrollbar` to keep the scroll area and edge fades while removing the custom scrollbar.

## API Reference

`ScrollArea` and `ScrollAreaContent` wrap [Base UI Scroll Area primitives](https://base-ui.com/react/components/scroll-area). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `scrollShadow` | `"horizontal" \| "vertical" \| "both" \| "none"` | `none` | Adds fades at overflowing horizontal, vertical, or both edges. |
| `fadeColor` | `string` | `-` | Sets the CSS color used by the edge fades. It accepts any CSS color value, including a theme variable such as `var(--card)` or `var(--popover)`. It defaults to an automatic mask that blends into the surface behind the scroll area. |
| `hideScrollbar` | `boolean` | `false` | Hides the custom scrollbar while keeping the scroll region available. |
| `scrollbarClassName` | `string` | `-` | Adds classes to each rendered scrollbar. |
| `verticalScrollbarStyle` | `React.CSSProperties` | `-` | Applies inline positioning or sizing styles to the vertical scrollbar. |
| `horizontalScrollbarStyle` | `React.CSSProperties` | `-` | Applies inline positioning or sizing styles to the horizontal scrollbar. |
| `cornerStyle` | `React.CSSProperties` | `-` | Applies inline positioning or sizing styles to the scrollbar corner. |
