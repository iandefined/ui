# Slider

A Base UI slider with compact track and rectangular control layouts, cursor previews, and editable values.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/slider.json
```

```bash
npm install @base-ui/react framer-motion clsx tailwind-merge
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Usage

```tsx
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/components/ui/slider";
```

```tsx
const [value, setValue] = useState(2);

<Slider
  max={4}
  value={value}
  onValueChange={(nextValue) => setValue(nextValue as number)}
>
  <SliderControl>
    <SliderContent>
      <SliderLabel>Roundness</SliderLabel>
      <SliderValue className="ms-auto" />
    </SliderContent>
  </SliderControl>
</Slider>;
```

`SliderLabel` and `SliderValue` can be placed inside the control with `SliderContent` or arranged anywhere else within `Slider`. The displayed value is editable by default; select it to enter an exact number, then press Enter or move focus away to commit it.

## Anatomy

```tsx
<Slider>
  <SliderLabel />
  <SliderControl>
    <SliderContent>
      <SliderValue />
    </SliderContent>
  </SliderControl>
</Slider>
```

## Examples

### Compact

### Custom Layouts

Arrange the same label, value, and control parts inside or outside the slider surface.

### Custom Value

### Range

### Step Dots

### Variants

### Disabled

### Without Tooltip

Set `hideTooltip` to hide the cursor value tooltip while retaining the slider's hover and drag feedback.

## API Reference

### Slider

Slider wraps Base UI's Slider Root and accepts its props in addition to those below.

| Prop           | Type                        | Default     | Description                                          |
| -------------- | --------------------------- | ----------- | ---------------------------------------------------- |
| `variant`      | `"compact" \| "default"`    | `"default"` | Controls thumb and rail layout alignment.            |
| `hideTooltip`  | `boolean`                   | `false`     | Hides the floating value tooltip during drag.        |
| `formatValue`  | `(value: number) => string` | —           | Formats thumb value display in tooltips and values.  |
| `showSteps`    | `boolean`                   | `false`     | Renders visible step tick dots along the track.      |
| `reduceMotion` | `boolean`                   | `false`     | Disables spring transitions for thumb movement.      |
| `getAriaLabel` | `(index: number) => string` | —           | Custom accessible name resolver for multiple thumbs. |
