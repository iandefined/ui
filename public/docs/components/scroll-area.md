# Scroll Area

A scrollable region with custom scrollbars and optional background fades.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Preview

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/scroll-area.json
```

```bash
npm install @base-ui/react tailwind-variants clsx tailwind-merge
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Anatomy

```tsx
<ScrollArea>
  <ScrollAreaContent />
</ScrollArea>
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

`scrollShadow="vertical"` fades into the background only on edges that have overflow, so the top fade is hidden at the initial scroll position.

## Horizontal Layout

Use `orientation="horizontal"` when the content overflows inline.

## Both Scroll

Use `orientation="both"` to render horizontal and vertical scrollbars for content that overflows in both directions.

## Scroll Shadows

Set `scrollShadow` independently of the scrollbar orientation to fade only the overflowing edges.

### Vertical

### Horizontal

### Both

## Hide Scrollbar

Set `hideScrollbar` to keep the scroll area and edge fades while removing the custom scrollbar.
