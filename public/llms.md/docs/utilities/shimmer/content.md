# Shimmer

Add a sweeping light gradient shimmer animation to text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`Shimmer` animates text with a sweeping light gradient during loading, streaming, or pending background work.

```tsx
import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <Shimmer className="text-sm font-medium text-muted-foreground">
        Generating response with AI...
      </Shimmer>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/shimmer.json
```

## Usage

```tsx
import { Shimmer } from "@/components/ui/shimmer";
```

```tsx
<Shimmer>Generating response...</Shimmer>
```

## Examples

### Colors

Override the default text-derived highlight with a custom CSS color, hex value, or Tailwind color token.

```tsx
import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerColorsDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer color="#38bdf8" className="font-medium">
        Sky blue (#38bdf8)
      </Shimmer>
      <Shimmer color="purple-500" className="font-medium">
        Purple (purple-500)
      </Shimmer>
      <Shimmer color="#f59e0b" className="font-medium">
        Amber (#f59e0b)
      </Shimmer>
      <Shimmer color="emerald-500/80" className="font-medium text-emerald-300">
        Emerald (emerald-500/80) with matching text color (text-emerald-300)
      </Shimmer>
    </div>
  );
}
```

### Duration

Adjust the sweep speed with millisecond numbers or CSS duration units.

```tsx
import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerDurationDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer duration={1000}>Fast sweep (1000ms)</Shimmer>
      <Shimmer duration="2s">Default sweep (2s)</Shimmer>
      <Shimmer duration={3500}>Gentle sweep (3500ms)</Shimmer>
    </div>
  );
}
```

### Spread

Control the width of the animated highlight band across the text.

```tsx
import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerSpreadDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer spread={3}>Narrow spread (12px)</Shimmer>
      <Shimmer spread="calc(3ch + 40px)">Default spread (3ch + 40px)</Shimmer>
      <Shimmer spread="6rem">Wide spread (6rem)</Shimmer>
    </div>
  );
}
```

### Angle

Set the linear gradient tilt angle in degrees.

```tsx
import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerAngleDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer angle={0}>Horizontal sweep (0deg)</Shimmer>
      <Shimmer angle={20}>Default angle (20deg)</Shimmer>
      <Shimmer angle={45}>Steep angle (45deg)</Shimmer>
      <Shimmer angle={90}>Vertical sweep (90deg)</Shimmer>
    </div>
  );
}
```

### With Components

Compose `Shimmer` with buttons and spinners.

```tsx
import { Button } from "@/registry/base/button";
import { Shimmer } from "@/registry/base/shimmer";
import { Spinner } from "@/registry/base/spinner";

export default function ShimmerWithComponentsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button disabled variant="outline" size="sm">
        <Spinner size="sm" />
        <Shimmer>Thinking...</Shimmer>
      </Button>
    </div>
  );
}
```

## API Reference

`Shimmer` uses Base UI's [`useRender`](https://base-ui.com/react/utils/use-render) for polymorphic rendering. Standard HTML attributes pass through to the underlying element.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `string` | `-` | Sets a custom highlight color for the sweeping gradient band. Accepts hex colors, CSS variables, or Tailwind color tokens. Defaults to a semi-transparent tint derived from `currentColor`. |
| `baseColor` | `string` | `-` | Sets a custom base color for the text underneath the shimmer sweep. Defaults to `currentColor`. |
| `duration` | `number \| string` | `2s` | Sets the animation duration for one complete sweep, specified in milliseconds or CSS time units. |
| `spread` | `number \| string` | `calc(3ch + 40px)` | Sets the width of the highlight band across the text. |
| `angle` | `number \| string` | `20` | Sets the linear gradient tilt angle in degrees. |
| `direction` | `"normal" \| "reverse"` | `normal` | Sets the sweep animation direction. |
| `repeat` | `"infinite" \| "once"` | `infinite` | Sets whether the shimmer loops indefinitely or plays a single pass. |
| `reverse` | `boolean` | `-` | Shorthand flag to reverse the sweep direction. |
| `once` | `boolean` | `-` | Shorthand flag to play the sweep animation only once. |
| `disabled` | `boolean` | `false` | Disables the animation and displays solid text without background clipping. |
