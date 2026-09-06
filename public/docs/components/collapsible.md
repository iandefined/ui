# Collapsible

An interactive component which expands and collapses content with smooth animations.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

An expandable panel controlled by a trigger button with automatic height and opacity transitions.

## Preview

## Installation

## Usage

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content revealed on interaction.
  </CollapsibleContent>
</Collapsible>;
```

## Examples

### Default

The default collapsible component with toggle button and expandable panel.

### Card Trigger

Use `CollapsibleTrigger` as a full-width interactive card trigger with a rotating chevron indicator.

## API Reference

`Collapsible` primitives wrap `@base-ui/react/collapsible`.

### Props

#### Collapsible

The controlled open state of the collapsible panel.
The initial open state when uncontrolled.
>
Event handler called when the open state changes.
Whether the collapsible should ignore user interaction.

#### CollapsibleTrigger

>
Allows rendering a custom trigger element via polymorphism.

#### CollapsibleContent

Whether to keep the collapsible panel mounted in the DOM when closed.
Whether to allow the browser's find-in-page feature to reveal the collapsed
panel.
