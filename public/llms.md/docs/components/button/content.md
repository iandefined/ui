# Button

A button with a glossy default treatment, custom colors, variants, sections, and sizes.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Button` for actions that submit, confirm, navigate, or change application state.

## Preview

```tsx
import { Button } from "@/registry/base/button";

export default function ButtonDefaultDemo() {
  return <Button>Button</Button>;
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
```

## Usage

```tsx
import { Button } from "@/components/ui/button";

<Button>Get started</Button>;
```

The default variant uses the glossy treatment. Pass a CSS color to `color` to generate its gradient and ring.

```tsx
<Button className="text-white" color="#2563eb">
  Get started
</Button>
```

## Examples

### Variants

Choose a visual treatment for the action.

```tsx
import { Button } from "@/registry/base/button";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
```

### Custom Colors

Apply `color` to the default variant.

```tsx
import { Button } from "@/registry/base/button";

const COLORS = [
  ["Blue", "#2563eb"],
  ["Green", "#059669"],
  ["Orange", "#ea580c"],
  ["Red", "#dc2626"],
  ["Purple", "#7c3aed"],
] as const;

export default function ButtonCustomColorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map(([label, color]) => (
        <Button className="text-white" color={color} key={color}>
          {label}
        </Button>
      ))}
    </div>
  );
}
```

### Sizes

Match the button to its surrounding controls.

```tsx
import { PlusIcon } from "lucide-react";

import { Button, type ButtonSize } from "@/registry/base/button";

const TEXT_SIZES: ButtonSize[] = ["xs", "sm", "default", "lg", "xl"];
const ICON_SIZES: ButtonSize[] = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
  "icon-xl",
];

export default function ButtonSizesDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end gap-2">
        {TEXT_SIZES.map((size) => (
          <Button key={size} size={size}>
            {size === "default" ? "Default" : size.toUpperCase()}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-2">
        {ICON_SIZES.map((size) => (
          <Button aria-label={`Add item, ${size}`} key={size} size={size}>
            <PlusIcon />
          </Button>
        ))}
      </div>
    </div>
  );
}
```

### With Icons

Use `leftSection` and `rightSection` to place icons beside the label.

```tsx
import { ArrowRightIcon, DownloadIcon, HeartIcon } from "lucide-react";

import { Button } from "@/registry/base/button";

export default function ButtonWithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftSection={<DownloadIcon />}>Download</Button>
      <Button
        className="text-white"
        color="#dc2626"
        leftSection={<HeartIcon />}
      >
        Favorite
      </Button>
      <Button
        className="text-white"
        color="#7c3aed"
        rightSection={<ArrowRightIcon />}
      >
        Continue
      </Button>
    </div>
  );
}
```

### Loading

Disable the action while work is in progress.

```tsx
import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/registry/base/button";

export default function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        disabled
        leftSection={<LoaderCircleIcon className="animate-spin" />}
      >
        Loading
      </Button>
      <Button
        className="text-white"
        color="#2563eb"
        disabled
        leftSection={<LoaderCircleIcon className="animate-spin" />}
      >
        Processing
      </Button>
    </div>
  );
}
```

### Disabled

Show an unavailable action without changing its layout.

```tsx
import { Button } from "@/registry/base/button";

export default function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Available</Button>
      <Button disabled>Unavailable</Button>
      <Button disabled variant="outline">
        Disabled outline
      </Button>
    </div>
  );
}
```

### As Link

Use Base UI's `render` prop and set `nativeButton={false}` when rendering a link.

```tsx
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/registry/base/button";

export default function ButtonAsLinkDemo() {
  return (
    <Button
      className="text-white"
      color="#2563eb"
      nativeButton={false}
      render={<a aria-label="Explore Button" href="#button" />}
      rightSection={<ArrowUpRightIcon />}
    >
      Explore
    </Button>
  );
}
```

## Accessibility

Give icon-only buttons an `aria-label`. Use `nativeButton={false}` only when `render` supplies a real non-button target.

## API Reference

`Button` wraps [Base UI Button](https://base-ui.com/react/components/button). Supported Base UI props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "link" \| "destructive"` | `default` | Sets the visual treatment. `color` is available only when this is `"default"` or omitted. |
| `color` | `string` | `-` | Generates the glossy gradient and ring for the default variant. |
| `size` | `"xs" \| "sm" \| "default" \| "lg" \| "xl" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg" \| "icon-xl"` | `default` | Sets the button dimensions. |
| `radius` | `"none" \| "sm" \| "default" \| "lg" \| "xl" \| "full"` | `default` | Sets the corner radius. |
| `leftSection` | `ReactNode` | `-` | Renders content before the label. |
| `rightSection` | `ReactNode` | `-` | Renders content after the label. |
