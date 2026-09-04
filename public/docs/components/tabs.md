# Tabs

A component for toggling between related panels on the same page.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Tabs` to switch between related sections without leaving the current page.

## Preview

## Installation

## Usage

```tsx
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs";
```

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsPanel value="account">Make changes to your account here.</TabsPanel>
  <TabsPanel value="password">Change your password here.</TabsPanel>
</Tabs>
```

## Composition

```tsx
<Tabs>
  <TabsList>
    <TabsTrigger />
  </TabsList>
  <TabsPanelsWrapper>
    <TabsPanel />
  </TabsPanelsWrapper>
</Tabs>
```

## Examples

### Segmented

### Underline

### Card

### Orientation

You can change the orientation of the tabs to horizontal or vertical using the `orientation` prop.

#### Horizontal

#### Vertical

### Panel

Render dedicated content for each tab using `TabsPanel`.

### Auto Height

Wrap panels with `TabsPanelsWrapper` to smoothly animate the container height when switching between panels of varying height.

## API Reference

`Tabs` and its parts wrap the corresponding [Base UI Tabs primitives](https://base-ui.com/react/components/tabs). Supported Base UI props pass through.

### Props

#### Tabs

Sets the visual treatment for the tab set.

#### TabsList and TabsTrigger

Overrides the variant inherited from `Tabs`.
