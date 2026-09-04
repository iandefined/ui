# Switch

A draggable toggle with spring-based thumb animation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Switch` for an immediate on or off setting.

## Preview

## Installation

## Usage

```tsx
import { Switch } from "@/components/ui/switch";
```

```tsx
const [checked, setChecked] = useState(false);

<Switch
  aria-label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>;
```

## Examples

### With Label

### Disabled

### Sizes

### Controlled

### Custom Card Style

## API Reference

`Switch` wraps the [Base UI Switch](https://base-ui.com/react/components/switch). Supported Base UI props pass through.

### Props

Sets the switch size.
Overrides the Motion transition used for thumb movement.
