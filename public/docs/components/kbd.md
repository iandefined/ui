# Kbd

Displays textual keyboard input and shortcut combinations.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Kbd` for individual keys and `KbdGroup` for shortcuts shown in instructions or controls.

## Preview

## Installation

## Usage

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd";
```

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

## Examples

### Group

### Button

### Tooltip

### Input Group

## API Reference

`Kbd` and `KbdGroup` wrap native `<kbd>` elements. Their standard HTML attributes pass through.
