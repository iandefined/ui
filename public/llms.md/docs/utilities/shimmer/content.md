# Shimmer

Add a sweeping light gradient shimmer animation to text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`Shimmer` animates text with a sweeping light gradient during loading, streaming, or pending background work.

## Installation

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

### Duration

Adjust the sweep speed with millisecond numbers or CSS duration units.

### Spread

Control the width of the animated highlight band across the text.

### Angle

Set the linear gradient tilt angle in degrees.

### With Components

Compose `Shimmer` with buttons and spinners.

## API Reference

`Shimmer` uses Base UI's [`useRender`](https://base-ui.com/react/utils/use-render) for polymorphic rendering. Standard HTML attributes pass through to the underlying element.

### Props

Sets a custom highlight color for the sweeping gradient band. Accepts hex
colors, CSS variables, or Tailwind color tokens. Defaults to a
semi-transparent tint derived from `currentColor`.
Sets a custom base color for the text underneath the shimmer sweep. Defaults
to `currentColor`.
Sets the animation duration for one complete sweep, specified in
milliseconds or CSS time units.
Sets the width of the highlight band across the text.
Sets the linear gradient tilt angle in degrees.
Sets the sweep animation direction.
Sets whether the shimmer loops indefinitely or plays a single pass.
Shorthand flag to reverse the sweep direction.
Shorthand flag to play the sweep animation only once.
Disables the animation and displays solid text without background clipping.
