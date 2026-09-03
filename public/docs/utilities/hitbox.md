# Hitbox

Expand hit areas of interactive elements without affecting layout.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/hitbox.json
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

Import the stylesheet in your CSS entrypoint (e.g. `app.css` or
`globals.css`):

```css
@import "./styles/hitbox.css";
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
