# Badge

Compact labels for status, category, or metadata.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Badge` to communicate concise status, category, or count information.

## Preview

```tsx
import { Badge } from "@/registry/base/badge";

export default function BadgeDefaultDemo() {
  return <Badge>Badge</Badge>;
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/badge.json
```

## Usage

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Badge</Badge>;
```

## Features

Set `color` only with `translucent` or `dot`. Semantic variants such as `success` and `warning` own their color.

## Examples

### Semantic variants

Choose a semantic state.

```tsx
import { Badge, type BadgeVariant } from "@/registry/base/badge";

const variants = [
  ["Default", "default"],
  ["Secondary", "secondary"],
  ["Outline", "outline"],
  ["Destructive", "destructive"],
  ["Error", "error"],
  ["Info", "info"],
  ["Success", "success"],
  ["Warning", "warning"],
] as const satisfies ReadonlyArray<readonly [string, BadgeVariant]>;

export default function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map(([label, variant]) => (
        <Badge key={variant} variant={variant}>
          {label}
        </Badge>
      ))}
    </div>
  );
}
```

### Palette colors

Use a palette color with a palette-driven variant.

```tsx
import { Badge, type BadgeColor } from "@/registry/base/badge";

const colors = [
  "gray",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const satisfies readonly BadgeColor[];

export default function BadgeColorsDemo() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Badge color={color} key={color} variant="translucent">
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Badge color={color} key={color} variant="dot">
            {color}
          </Badge>
        ))}
      </div>
    </div>
  );
}
```

### Sizes

Use compact badges in dense layouts.

```tsx
import { Badge } from "@/registry/base/badge";

export default function BadgeSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <Badge color="violet" size="compact" variant="translucent">
        Compact
      </Badge>
      <Badge color="violet" variant="translucent">
        Default
      </Badge>
    </div>
  );
}
```

### With Icon

Add a small, meaningful icon.

```tsx
import { CheckIcon } from "lucide-react";

import { Badge } from "@/registry/base/badge";

export default function BadgeWithIconDemo() {
  return (
    <Badge variant="success">
      <CheckIcon aria-hidden="true" />
      Verified
    </Badge>
  );
}
```

### With Link

Render a navigation target through `render`.

```tsx
import { Badge } from "@/registry/base/badge";

export default function BadgeWithLinkDemo() {
  return (
    <Badge
      render={<a aria-label="View updates" href="#with-link" />}
      variant="secondary"
    >
      View updates
    </Badge>
  );
}
```

### With Count

Communicate a compact count.

```tsx
import { Badge } from "@/registry/base/badge";

export default function BadgeWithCountDemo() {
  return <Badge className="rounded-full">7</Badge>;
}
```

## API Reference

`Badge` uses Base UI's [`useRender`](https://base-ui.com/react/utils/use-render) for polymorphic rendering. Standard element props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "error" \| "info" \| "success" \| "warning" \| "translucent" \| "dot"` | `default` | Sets the semantic or palette-driven appearance. |
| `color` | `BadgeColor` | `gray` | Sets a palette color when `variant` is `"translucent"` or `"dot"`. |
| `size` | `"default" \| "compact"` | `default` | Sets the badge height and spacing. |
