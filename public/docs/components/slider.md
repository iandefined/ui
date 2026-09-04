# Slider

A Base UI slider with compact track and rectangular control layouts, cursor previews, and editable values.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Slider` to choose a numeric value or range from a bounded track.

## Preview

## Installation

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

`Slider` and its parts wrap the corresponding [Base UI Slider primitives](https://base-ui.com/react/components/slider). Supported Base UI props pass through.

### Props

Controls the thumb and rail layout.
Hides the floating value tooltip during pointer interaction.
simpleType="function"

>

Formats values shown in the tooltip and `SliderValue`.
Renders step tick dots on the track.
Disables spring transitions for thumb movement.
simpleType="function"

>

Returns an accessible name for each thumb in a multi-thumb slider.
