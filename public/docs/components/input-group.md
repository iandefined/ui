# Input Group

Compose inputs and textareas with icons, text, buttons, and menus.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `InputGroup` to attach context and actions directly to an input or textarea.

## Preview

## Installation

## Usage

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>;
```

## Composition

Use `InputGroupInput` or `InputGroupTextarea` as the control. Place `InputGroupAddon` at `inline-start`, `inline-end`, `block-start`, or `block-end`.

## Examples

### Text

Add a textual prefix or suffix.

### Icons

Add a contextual icon without changing the input semantics.

### Buttons

Place related actions inside an addon.

### Spinner

Indicate in-progress input work.

### Tooltip

Explain icon-only controls.

### Menu

Expose additional input actions through a menu.

## API Reference

`InputGroup` and its parts are styled HTML elements. Standard element props pass through.

### InputGroupAddon Props

Sets the addon's position around the control.

### InputGroupButton Props

Sets the embedded button size.
