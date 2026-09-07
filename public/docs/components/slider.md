# Slider

A Base UI slider with compact track and rectangular control layouts, cursor previews, and editable values.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Slider` to choose a numeric value or range from a bounded track.

## Preview

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderDemo() {
  const [value, setValue] = useState(2);

  return (
    <Slider
      className="w-full max-w-sm"
      max={4}
      min={0}
      value={value}
      onValueChange={(nextValue) => setValue(nextValue as number)}
    >
      <SliderControl>
        <SliderContent>
          <SliderLabel>Roundness</SliderLabel>
          <SliderValue className="ms-auto" />
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/slider.json
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

## Composition

```tsx
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/components/ui/slider";

<Slider>
  <SliderLabel />
  <SliderControl>
    <SliderContent>
      <SliderValue />
    </SliderContent>
  </SliderControl>
</Slider>;
```

## Examples

### Compact

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderCompactDemo() {
  const [brightness, setBrightness] = useState(70);
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <Slider
      className="w-full max-w-sm"
      formatValue={formatPercentage}
      value={brightness}
      variant="compact"
      onValueChange={(nextValue) => setBrightness(nextValue as number)}
    >
      <SliderControl />
      <div className="mt-2 flex items-center justify-between">
        <SliderLabel>Brightness</SliderLabel>
        <SliderValue />
      </div>
    </Slider>
  );
}
```

### Custom Layouts

Arrange the same label, value, and control parts inside or outside the slider surface.

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderLayoutsDemo() {
  const [balance, setBalance] = useState(40);
  const [volume, setVolume] = useState(72);

  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider
        formatValue={(value) => `${value}%`}
        value={balance}
        onValueChange={(value) => setBalance(value as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>
              <span className="inline-flex items-center gap-2">
                <span>Balance</span>
                <span className="rounded bg-foreground/8 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                  L / R
                </span>
              </span>
            </SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>

      <Slider
        formatValue={(value) => `${value}%`}
        value={volume}
        variant="compact"
        onValueChange={(value) => setVolume(value as number)}
      >
        <div className="mb-2 grid grid-cols-[1fr_auto] items-end gap-x-4">
          <SliderLabel className="text-base text-foreground">
            Master volume
          </SliderLabel>
          <SliderValue className="row-span-2 text-base text-foreground" />
          <span className="text-xs text-muted-foreground">
            Applies to every output
          </span>
        </div>
        <SliderControl />
      </Slider>
    </div>
  );
}
```

### Custom Value

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

const qualityLabels = ["Low", "Medium", "High"];

export default function SliderFormattingDemo() {
  const [value, setValue] = useState(1);

  return (
    <Slider
      className="w-full max-w-sm"
      formatValue={(nextValue) => qualityLabels[nextValue] ?? String(nextValue)}
      max={2}
      value={value}
      onValueChange={(nextValue) => setValue(nextValue as number)}
    >
      <SliderControl>
        <SliderContent>
          <SliderLabel>Quality</SliderLabel>
          <SliderValue className="ms-auto" editable={false}>
            {(formattedValues) => (
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-current opacity-40" />
                {formattedValues[0]}
              </span>
            )}
          </SliderValue>
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
```

### Range

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderValue,
  type SliderValueType,
} from "@/registry/base/slider";

export default function SliderRangeDemo() {
  const [value, setValue] = useState<[number, number]>([5, 10]);

  return (
    <Slider
      className="w-full max-w-sm"
      formatValue={(nextValue) => `${nextValue}%`}
      value={value}
      variant="compact"
      onValueChange={(nextValue: SliderValueType) =>
        setValue(nextValue as [number, number])
      }
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        <SliderLabel>Price range</SliderLabel>
        <SliderValue editable={false}>
          {(formattedValues) => `Range: ${formattedValues.join(" - ")}`}
        </SliderValue>
      </div>
      <SliderControl />
    </Slider>
  );
}
```

### Step Dots

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderStepsDemo() {
  const [compactValue, setCompactValue] = useState(2);
  const [defaultValue, setDefaultValue] = useState(1);

  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider
        max={4}
        showSteps
        value={compactValue}
        variant="compact"
        onValueChange={(nextValue) => setCompactValue(nextValue as number)}
      >
        <SliderControl />
        <div className="mt-2 flex items-center gap-1">
          <SliderLabel>Rating:</SliderLabel>
          <SliderValue editable={false} />
          <span aria-hidden="true">/ 4</span>
        </div>
      </Slider>

      <Slider
        max={4}
        showSteps
        value={defaultValue}
        onValueChange={(nextValue) => setDefaultValue(nextValue as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>Roundness</SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>
    </div>
  );
}
```

### Variants

```tsx
"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderVariantsDemo() {
  const [compactValue, setCompactValue] = useState(36);
  const [defaultValue, setDefaultValue] = useState(2);

  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider
        formatValue={(nextValue) => `${nextValue}%`}
        value={compactValue}
        variant="compact"
        onValueChange={(nextValue) => setCompactValue(nextValue as number)}
      >
        <SliderControl />
        <div className="mt-2 flex items-center justify-between">
          <SliderLabel>Compact</SliderLabel>
          <SliderValue />
        </div>
      </Slider>
      <Slider
        max={4}
        value={defaultValue}
        onValueChange={(nextValue) => setDefaultValue(nextValue as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>Default</SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>
    </div>
  );
}
```

### Disabled

```tsx
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderDisabledDemo() {
  return (
    <Slider className="w-full max-w-sm" defaultValue={2} disabled max={4}>
      <SliderControl>
        <SliderContent>
          <SliderLabel>Roundness</SliderLabel>
          <SliderValue className="ms-auto" />
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
```

### Without Tooltip

Set `hideTooltip` to hide the cursor value tooltip while retaining the slider's hover and drag feedback.

```tsx
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderWithoutTooltipDemo() {
  return (
    <Slider className="w-full max-w-sm" defaultValue={60} hideTooltip>
      <SliderControl>
        <SliderContent>
          <SliderLabel>Volume</SliderLabel>
          <SliderValue className="ms-auto" />
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
```

## API Reference

`Slider` and its parts wrap the corresponding [Base UI Slider primitives](https://base-ui.com/react/components/slider). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"compact" \| "default"` | `default` | Controls the thumb and rail layout. |
| `hideTooltip` | `boolean` | `false` | Hides the floating value tooltip during pointer interaction. |
| `formatValue` | `(value: number) => string` | `-` | Formats values shown in the tooltip and `SliderValue`. |
| `showSteps` | `boolean` | `false` | Renders step tick dots on the track. |
| `reduceMotion` | `boolean` | `false` | Disables spring transitions for thumb movement. |
| `getAriaLabel` | `(index: number) => string` | `-` | Returns an accessible name for each thumb in a multi-thumb slider. |
