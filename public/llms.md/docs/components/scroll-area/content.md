# Scroll Area

A scrollable region with custom scrollbars and optional background fades.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `ScrollArea` for a bounded region that needs styled scrolling and optional overflow fades.

## Preview

## Installation

## Usage

```tsx
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";
```

```tsx
<ScrollArea className="h-64" scrollShadow="vertical">
  <ScrollAreaContent className="p-4">...</ScrollAreaContent>
</ScrollArea>
```

`scrollShadow="vertical"` fades into the background only on edges that have overflow, so the top fade is hidden at the initial scroll position.

## Composition

```tsx
<ScrollArea>
  <ScrollAreaContent />
</ScrollArea>
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

Adds fades at overflowing horizontal, vertical, or both edges.
Hides the custom scrollbar while keeping the scroll region available.
