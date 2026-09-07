# Accordion

A vertically stacked set of interactive headings that reveal or hide associated content sections.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

A vertically stacked collection of expandable panels with indicator animations and multiple styling variants.

## Preview

## Installation

## Usage

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>;
```

## Examples

### Default

Standard accordion with subtle divider borders between items.

### Outline

Encloses all items within a single rounded card frame.

### Split

Renders each item as an independent card with spacing between sections.

### Inset

An inset container matching the inset card style with a subtle tray background and elevated animated panel. The panel owns its background and shadow, so its `overflow-hidden` height animation clips only its content, not its own light-mode outline. Preserve the tray padding and one-pixel inline gutter when replacing the panel surface.

## API Reference

`Accordion` primitives wrap `@base-ui/react/accordion`.

### Props

#### Accordion

Visual style variant applied to the accordion container and items.
Whether multiple accordion items can be open simultaneously.
Controlled open item value(s).
Initial open item value(s) when uncontrolled.

#### AccordionTrigger

Whether to display the expansion indicator icon.
The icon style rendered for the expansion indicator.
Position of the expansion indicator relative to the title.
Optional icon rendered alongside the trigger title.
Secondary descriptive text rendered below the trigger title.
