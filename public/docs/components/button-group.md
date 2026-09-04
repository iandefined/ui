# Button Group

A container that groups related buttons together with consistent styling.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `ButtonGroup` when adjacent actions belong to the same task or control.

## Preview

## Installation

## Usage

```tsx
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>;
```

## Composition

```tsx
<ButtonGroup>
  <Button />
  <ButtonGroupSeparator orientation="vertical" />
  <ButtonGroupText>Text</ButtonGroupText>
</ButtonGroup>
```

## Examples

### Basic

Group related actions.

### Orientation

Set `orientation` to stack actions vertically.

### Sizes

Size each contained button for the context.

### Nested

Nest groups to separate related action clusters.

### Separator

Use `ButtonGroupSeparator` where adjacent button borders do not provide separation.

### Split

Pair a primary action with a secondary control.

### Input

Combine an input with related actions.

### Input Group

Compose a more complex input control.

### Menu

Use a dropdown for secondary actions.

### Select

Pair a selection control with actions.

### Popover

Open supplemental controls from the group.

## API Reference

`ButtonGroup` is a styled `div`; standard HTML props pass through.

### Props

Sets the layout direction.
