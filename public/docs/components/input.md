# Input

A styled text input built on Base UI.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Input` for concise, single-line text entry in forms and controls.

## Preview

## Installation

## Usage

```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="Enter text" />;
```

## Examples

### Sizes

Choose a size that aligns with adjacent controls.

### Input Types

Use the native `type` attribute for specialized input behavior.

### File

Use `type="file"` to accept selected files.

### Disabled

Prevent interaction while retaining the entered value.

### Controlled

Control the value from application state.

## API Reference

`Input` wraps [Base UI Input](https://base-ui.com/react/components/input). Supported Base UI and native input props pass through.

### Props

Sets a preset height, or a custom height in pixels.
