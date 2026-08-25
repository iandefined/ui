# Hitbox

Expand hit areas of interactive elements without affecting layout.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Preview

## Installation

```bash
pnpm dlx shadcn@latest add https://ui.iandefined.com/r/hitbox.json
```

```css
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}

:root {
  --info: var(--color-blue-500);
  --info-foreground: var(--color-blue-700);
  --success: var(--color-emerald-500);
  --success-foreground: var(--color-emerald-700);
}

.dark {
  --info: var(--color-blue-500);
  --info-foreground: var(--color-blue-400);
  --success: var(--color-emerald-500);
  --success-foreground: var(--color-emerald-400);
}
```

```css
@utility hitbox-debug {
  position: relative;

  &::before {
    position: absolute;
    top: var(--hitbox-t, 0px);
    right: var(--hitbox-r, 0px);
    bottom: var(--hitbox-b, 0px);
    left: var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
    @apply border border-dashed border-info bg-info/10;
  }

  &:hover::before {
    @apply border border-dashed border-success bg-success/10;
  }
}

@utility hitbox {
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-* {
  --hitbox-t: calc(--spacing(--value(integer)) * -1);
  --hitbox-t: calc(--value([*]) * -1);
  --hitbox-b: calc(--spacing(--value(integer)) * -1);
  --hitbox-b: calc(--value([*]) * -1);
  --hitbox-l: calc(--spacing(--value(integer)) * -1);
  --hitbox-l: calc(--value([*]) * -1);
  --hitbox-r: calc(--spacing(--value(integer)) * -1);
  --hitbox-r: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-l-* {
  --hitbox-l: calc(--spacing(--value(integer)) * -1);
  --hitbox-l: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-r-* {
  --hitbox-r: calc(--spacing(--value(integer)) * -1);
  --hitbox-r: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-t-* {
  --hitbox-t: calc(--spacing(--value(integer)) * -1);
  --hitbox-t: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-b-* {
  --hitbox-b: calc(--spacing(--value(integer)) * -1);
  --hitbox-b: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-x-* {
  --hitbox-l: calc(--spacing(--value(integer)) * -1);
  --hitbox-l: calc(--value([*]) * -1);
  --hitbox-r: calc(--spacing(--value(integer)) * -1);
  --hitbox-r: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}

@utility hitbox-y-* {
  --hitbox-t: calc(--spacing(--value(integer)) * -1);
  --hitbox-t: calc(--value([*]) * -1);
  --hitbox-b: calc(--spacing(--value(integer)) * -1);
  --hitbox-b: calc(--value([*]) * -1);
  position: relative;

  &::before {
    position: absolute;
    inset: var(--hitbox-t, 0px) var(--hitbox-r, 0px) var(--hitbox-b, 0px)
      var(--hitbox-l, 0px);
    pointer-events: inherit;
    content: "";
  }
}
```

## Usage

Use `hitbox-*` to extend the hit area uniformly on all sides. Directional variants let you expand only one side or one axis.

```tsx
<Button className="hitbox-6">Click me</Button>

<Checkbox className="hitbox-4" />

<a href="/page" className="hitbox-y-3 block py-2">
  Link
</a>
```

## Examples

### Basic

The base utility expands the target equally on every side.

<div className="flex min-h-32 items-center justify-center">
Small target
</div>

```tsx
import { Button } from "@/components/ui/button";

export function HitboxBasicExample() {
  return (
    <Button className="hitbox-6" size="sm" variant="outline">
      Small target
    </Button>
  );
}
```

### Individual sides

Target specific sides with `hitbox-l-*`, `hitbox-r-*`, `hitbox-t-*`, and `hitbox-b-*`.

<div className="flex min-h-24 items-center justify-center">
Left
</div>

```tsx
<Button className="hitbox-l-6" size="sm" variant="outline">
  Left
</Button>
```

<div className="flex min-h-24 items-center justify-center">
Right
</div>

```tsx
<Button className="hitbox-r-6" size="sm" variant="outline">
  Right
</Button>
```

<div className="flex min-h-24 items-center justify-center">
Top
</div>

```tsx
<Button className="hitbox-t-6" size="sm" variant="outline">
  Top
</Button>
```

<div className="flex min-h-24 items-center justify-center">
Bottom
</div>

```tsx
<Button className="hitbox-b-6" size="sm" variant="outline">
  Bottom
</Button>
```

### Horizontal and vertical

Use `hitbox-x-*` and `hitbox-y-*` for axis shorthands.

<div className="flex min-h-24 items-center justify-center">
Left and right
</div>

```tsx
<Button className="hitbox-x-6" size="sm" variant="outline">
  Left and right
</Button>
```

<div className="flex min-h-24 items-center justify-center">
Top and bottom
</div>

```tsx
<Button className="hitbox-y-6" size="sm" variant="outline">
  Top and bottom
</Button>
```

### Custom values

Use arbitrary values with bracket syntax, such as `hitbox-[18px]`.

<div className="flex min-h-32 items-center justify-center">
Custom value
</div>

```tsx
<Button className="hitbox-[18px]" size="sm" variant="outline">
  Custom value
</Button>
```

### Debugging

Add `hitbox-debug` to visualize the expanded hit area. The overlay changes color on hover.

Hover the target

```tsx
<Button className="hitbox-6 hitbox-debug">Hover the target</Button>
```
