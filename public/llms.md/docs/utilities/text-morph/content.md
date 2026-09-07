# Text Morph

Animate changing text with Calligraph and smoothly follow its width.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`TextMorph` animates changing text with Calligraph and can smoothly resize to follow its content. Use it for labels, statuses, and values that change in place.

```tsx
"use client";

import { CheckIcon, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/registry/base/button";
import { IconSwap } from "@/registry/base/icon-swap";
import { Spinner } from "@/registry/base/spinner";
import { TextMorph } from "@/registry/base/text-morph";

const labels = {
  idle: "Fetch",
  loading: "Fetching",
  success: "Data Fetched",
} as const;

type FetchState = keyof typeof labels;

export default function TextMorphDefaultDemo() {
  const [state, setState] = useState<FetchState>("idle");

  useEffect(() => {
    if (state === "loading") {
      const timer = window.setTimeout(() => setState("success"), 1200);
      return () => window.clearTimeout(timer);
    }

    if (state === "success") {
      const timer = window.setTimeout(() => setState("idle"), 1800);
      return () => window.clearTimeout(timer);
    }
  }, [state]);

  return (
    <Button
      disabled={state !== "idle"}
      onClick={() => setState("loading")}
      variant="outline"
      size="sm"
    >
      <IconSwap className="inline-flex shrink-0" state={state}>
        {state === "idle" ? (
          <DownloadIcon />
        ) : state === "loading" ? (
          <Spinner size="sm" />
        ) : (
          <CheckIcon strokeWidth={3} />
        )}
      </IconSwap>
      <TextMorph animation="snappy" aria-live="polite">
        {labels[state]}
      </TextMorph>
    </Button>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/text-morph.json
```

## Usage

```tsx
import { TextMorph } from "@/components/ui/text-morph";
```

```tsx
<TextMorph>{status}</TextMorph>
```

`TextMorph` is the standard way to animate changing text in this registry. Use it instead of adding a one-off text transition with Motion or `AnimatePresence`. The caller owns when the value changes; `TextMorph` owns how the characters transition.

It is powered by [Calligraph](https://calligraph.raphaelsalaja.com/), which preserves shared characters, animates entering and leaving characters, and supports text, number, and slot-style transitions.

## Container Width

`autoSize` is enabled by default. Calligraph measures an inner element at its natural content width with `ResizeObserver`, then animates a separate outer wrapper to the measured pixel width. This avoids measuring and animating the same element and skips an animation from zero on the first render, following the technique in [Animating Container Bounds](https://www.userinterface.wiki/animating-container-bounds).

Use `autoSize={false}` only when the text lives in an intentionally fixed-width container.

```tsx
<TextMorph autoSize={false}>{status}</TextMorph>
```

## Coordinating Icons and Text

When a status changes both an icon and its label, drive both from the same state. Use `TextMorph` for the label and [Icon Swap](/docs/utilities/icon-swap) for the icon. Do not recreate the underlying Motion presence or transition code in the consumer.

The preview at the top demonstrates the complete sequence: `Fetch`, then `Fetching`, then `Data Fetched`, and back to `Fetch`. Its icon stays present throughout, swapping from a Lucide download icon to the registry `Spinner`, then to a check icon, and finally back to download.

## Examples

### Input-driven Text

Keep the input state in the caller and pass the displayed string to `TextMorph`.

```tsx
"use client";

import { useState } from "react";

import { Input } from "@/registry/base/input";
import { TextMorph } from "@/registry/base/text-morph";

export default function TextMorphInputDemo() {
  const [value, setValue] = useState("base-ui.com");

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Input
        aria-label="Domain"
        onValueChange={setValue}
        placeholder="domain"
        value={value}
      />
      <span className="inline-flex w-fit px-1 text-sm text-muted-foreground">
        https://
        <TextMorph>{value || "your-domain"}</TextMorph>
      </span>
    </div>
  );
}
```

### Number and Slots

Use `variant="number"` for rolling digits or `variant="slots"` for a slot-machine transition.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { TextMorph } from "@/registry/base/text-morph";

export default function TextMorphVariantsDemo() {
  const [count, setCount] = useState(128);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-baseline gap-6 text-2xl font-medium tabular-nums">
        <TextMorph variant="number">{count}</TextMorph>
        <TextMorph variant="slots">{count}</TextMorph>
      </div>
      <Button onClick={() => setCount((value) => value + 37)} variant="outline">
        Add 37
      </Button>
    </div>
  );
}
```

## Animation

Choose `default`, `smooth`, `snappy`, or `bouncy` with the `animation` prop. Text transitions also support `drift`, `trend`, and `stagger`.

```tsx
<TextMorph animation="snappy" trend={-1}>
  {status}
</TextMorph>
```

## API Reference

`TextMorph` wraps [Calligraph](https://calligraph.raphaelsalaja.com/). Supported Calligraph props, including `variant`, `animation`, `trend`, and `stagger`, pass through to Calligraph.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `autoSize` | `boolean` | `true` | Measures the natural text width and animates the outer wrapper to that width. Set it to `false` in an intentionally fixed-width container. |
