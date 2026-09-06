# Noise Texture

An SVG fractal noise overlay using feTurbulence for subtle texture and analog grain.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`NoiseTexture` renders a procedural SVG fractal noise layer using `feTurbulence` to add depth, tactile grain, and analog warmth over backgrounds and surfaces.

## Installation

## Usage

```tsx
import { NoiseTexture } from "@/components/ui/noise-texture";
```

```tsx
<div className="relative overflow-hidden rounded-xl bg-zinc-900 p-6 text-white">
  <NoiseTexture className="opacity-[0.1]" />
  <div className="relative z-10">Card content</div>
</div>
```

`NoiseTexture` is positioned absolutely to fill its relative parent container. Use opacity utility classes such as `opacity-[0.05]`, `opacity-10`, or `opacity-20` on the component to control the intensity of the grain overlay.

## Examples

### Opacity

Adjust the overlay opacity to achieve anything from a barely noticeable paper feel to a strong retro film grain.

### Frequency

Change the base turbulence frequency to vary between coarse, medium, and ultra-fine grain patterns.

## API Reference

`NoiseTexture` renders an absolute, full-size SVG element containing an SVG `filter` and a filled `rect`. Standard SVG attributes pass through.

### Props

Sets the `baseFrequency` parameter of the `feTurbulence` filter. Higher
values generate a finer, denser grain.
Sets the `numOctaves` parameter for the turbulence generator, adding noise
detail at smaller scales.
Sets the linear transfer slope on each color channel after desaturation to
adjust noise contrast.
Sets the internal opacity of the SVG noise rectangle layer.
