# Icon Swap

Animate between keyed icons with a consistent scale, blur, and fade transition.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`IconSwap` animates between keyed icons with one consistent scale, blur, fade, and spring transition. Use it when an icon represents a changing semantic state, such as copying, loading, or success.

```tsx
"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/registry/base/button";
import { IconSwap } from "@/registry/base/icon-swap";

export default function IconSwapDefaultDemo() {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    setCopied(true);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, 1500);
  };

  return (
    <Button
      aria-label={copied ? "Copied" : "Copy"}
      onClick={handleCopy}
      size="icon"
      variant="outline"
    >
      <IconSwap
        className="inline-flex shrink-0 [&>svg]:size-4"
        state={copied ? "copied" : "copy"}
      >
        {copied ? <CheckIcon strokeWidth={3} /> : <CopyIcon />}
      </IconSwap>
    </Button>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/icon-swap.json
```

## Usage

```tsx
import { IconSwap } from "@/components/ui/icon-swap";
```

```tsx
<IconSwap className="inline-flex shrink-0" state={isCopied ? "copied" : "copy"}>
  {isCopied ? <CheckIcon /> : <CopyIcon />}
</IconSwap>
```

Change the `state` value whenever the semantic icon state changes. `IconSwap` keeps initial rendering still, uses pop layout so an exiting icon does not push nearby content, and owns the shared scale, blur, fade, and spring transition. Styling and Motion props passed to `IconSwap` are applied to its animated span.

When an interaction changes both an icon and text, derive both from the same state. Use `IconSwap` for the icon and [Text Morph](/docs/utilities/text-morph) for the label.

## Reset After Inactivity

For temporary confirmation states such as Copy to Copied, restart the reset timer on every successful click. Clear the previous timer before scheduling the next one so repeated clicks keep the confirmation icon visible until the full delay has elapsed after the last click. Also clear the timer when the component unmounts. The preview above demonstrates this behavior.

## API Reference

`IconSwap` renders a Motion `span`. Supported [Motion span props](https://motion.dev/docs/react-motion-component) pass through to that element.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `state` | `React.Key` | `-` | Keys the currently displayed icon. Change it whenever the icon's semantic state changes. |
