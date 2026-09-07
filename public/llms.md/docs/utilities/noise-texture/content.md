# Noise Texture

An SVG fractal noise overlay using feTurbulence for subtle texture and analog grain.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`NoiseTexture` renders a procedural SVG fractal noise layer using `feTurbulence` to add depth, tactile grain, and analog warmth over backgrounds and surfaces.

```tsx
import { NoiseTexture } from "@/registry/base/noise-texture";

export default function NoiseTextureDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative size-48 overflow-hidden rounded-2xl shadow-xl">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.35]" frequency={0.8} />
      </div>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/noise-texture.json
```

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

```tsx
import { NoiseTexture } from "@/registry/base/noise-texture";

export default function NoiseTextureOpacityDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.05]" />
        <span className="relative z-10 text-xs font-medium text-white/90">
          5% Opacity
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Barely there
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.1]" />
        <span className="relative z-10 text-xs font-medium text-white/90">
          10% Opacity
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Subtle analog
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.25]" />
        <span className="relative z-10 text-xs font-medium text-white/90">
          25% Opacity
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Tactile grain
        </span>
      </div>
    </div>
  );
}
```

### Frequency

Change the base turbulence frequency to vary between coarse, medium, and ultra-fine grain patterns.

```tsx
import { NoiseTexture } from "@/registry/base/noise-texture";

export default function NoiseTextureFrequencyDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.15]" frequency={0.2} />
        <span className="relative z-10 text-xs font-medium text-white/90">
          0.2 Freq
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Coarse
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.15]" frequency={0.5} />
        <span className="relative z-10 text-xs font-medium text-white/90">
          0.5 Freq
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Default fine
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.15]" frequency={0.8} />
        <span className="relative z-10 text-xs font-medium text-white/90">
          0.8 Freq
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Ultra fine
        </span>
      </div>
    </div>
  );
}
```

## API Reference

`NoiseTexture` renders an absolute, full-size SVG element containing an SVG `filter` and a filled `rect`. Standard SVG attributes pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `frequency` | `number` | `0.4` | Sets the `baseFrequency` parameter of the `feTurbulence` filter. Higher values generate a finer, denser grain. |
| `octaves` | `number` | `6` | Sets the `numOctaves` parameter for the turbulence generator, adding noise detail at smaller scales. |
| `slope` | `number` | `0.15` | Sets the linear transfer slope on each color channel after desaturation to adjust noise contrast. |
| `noiseOpacity` | `number` | `0.6` | Sets the internal opacity of the SVG noise rectangle layer. |
