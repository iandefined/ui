# Marquee

Create seamless scrolling content that starts only when it needs more room.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`Marquee` loops any React content, including inline brand icons and text. It measures the natural width of the first content group so text stays still when it fits and scrolls when its container is too narrow.

## Installation

## Usage

```tsx
import { Marquee } from "@/components/ui/marquee";
```

```tsx
<Marquee onlyOnOverflow>
  This text scrolls only when its container is too narrow.
</Marquee>
```

The component renders the content twice or more to create a seamless loop. The repeated copies are hidden from assistive technology, so screen readers encounter the content once.

## Examples

### Brand Icons

Use `Marquee` with inline SVG brand icons or React components. Set `onlyOnOverflow={false}` when a brand strip should keep moving even when the first group fits.

### Text

With `onlyOnOverflow`, `Marquee` uses `ResizeObserver` to compare the natural content width with the available width. Short text remains still, while long text starts a loop automatically.

### Narrow Buttons

Give the marquee `min-w-0 flex-1` inside a constrained button or control so the content can shrink and the overflow measurement can take effect.

## Edge Fade

The fade is shown only while content is moving and automatically blends into the surface behind the marquee. Set `fadeColor` only when you need an explicit color override.

```tsx
<Marquee fadeColor="var(--card)" onlyOnOverflow>
  Long content that moves inside a card surface
</Marquee>
```

## Accessibility

Marquee content respects `prefers-reduced-motion` and stops moving when reduced motion is requested. The repeated loop copies are `aria-hidden`, so the same content is not announced twice.

## API Reference

### Props

Duration of one complete loop in seconds. Higher values move slower.
Direction in which the content travels.
Pauses the loop while the pointer is over the marquee.
Gap between items and repeated content groups. Numbers are interpreted as
pixels; strings can be any CSS length.
Adds a soft fade at both edges of the viewport while content is moving.
Sets the CSS color used by the edge fades. It accepts any CSS color value,
including a theme variable such as `var(--card)` or `var(--popover)`. It is
optional because the default mask automatically blends into the surface
behind the marquee. The fade is hidden when the marquee is not moving.
Starts the animation only when the natural content width is wider than the
available viewport.

All standard `div` props, including `className`, `style`, and `aria-*` attributes, pass through to the viewport element.
