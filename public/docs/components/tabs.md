# Tabs

A component for toggling between related panels on the same page.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/tabs.json
```

```bash
npm install @base-ui/react clsx tailwind-merge
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

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

## Anatomy

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
