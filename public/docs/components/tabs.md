# Tabs

A component for toggling between related panels on the same page.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Tabs` to switch between related sections without leaving the current page.

## Preview

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsDefaultDemo() {
  return (
    <Tabs defaultValue="docs">
      <TabsList>
        <TabsTrigger value="docs">Docs</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="blocks">Blocks</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/tabs.json
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

## Composition

```tsx
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanelsWrapper,
  TabsTrigger,
} from "@/components/ui/tabs";

<Tabs>
  <TabsList>
    <TabsTrigger />
  </TabsList>
  <TabsPanelsWrapper>
    <TabsPanel />
  </TabsPanelsWrapper>
</Tabs>;
```

## Examples

### Segmented

```tsx
import type { SVGProps } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsSegmentedDemo() {
  return (
    <Tabs defaultValue="india" variant="segmented">
      <TabsList className="*:data-[slot=tabs-trigger]:h-10 *:data-[slot=tabs-trigger]:[&_svg]:size-5">
        <TabsTrigger aria-label="India" value="india">
          <IndiaFlag />
          <span aria-hidden="true" className="sm:hidden">
            IN
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            India
          </span>
        </TabsTrigger>
        <TabsTrigger aria-label="France" value="france">
          <FranceFlag />
          <span aria-hidden="true" className="sm:hidden">
            FR
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            France
          </span>
        </TabsTrigger>
        <TabsTrigger aria-label="Belgium" value="belgium">
          <BelgiumFlag />
          <span aria-hidden="true" className="sm:hidden">
            BE
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            Belgium
          </span>
        </TabsTrigger>
        <TabsTrigger aria-label="Switzerland" value="switzerland">
          <SwitzerlandFlag />
          <span aria-hidden="true" className="sm:hidden">
            CH
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            Switzerland
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function IndiaFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#138808" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z" />
      <path fill="#EEE" d="M0 13h36v10H0z" />
      <path fill="#F93" d="M36 13V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4h36z" />
      <circle fill="navy" cx="18" cy="18" r="4" />
      <circle fill="#EEE" cx="18" cy="18" r="3" />
      <circle fill="navy" cx="18" cy="18" r="1" />
    </svg>
  );
}

function FranceFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" />
      <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" />
      <path fill="#EEE" d="M12 5h12v26H12z" />
    </svg>
  );
}

function BelgiumFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#25333a" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" />
      <path fill="#f9cb38" d="M12 5h12v26H12z" />
      <path fill="#ec1c24" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" />
    </svg>
  );
}

function SwitzerlandFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="#ec1c24"
        d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
      />
      <path fill="#fff" d="M15 11h6v14h-6z" />
      <path fill="#fff" d="M11 15h14v6H11z" />
    </svg>
  );
}
```

### Underline

```tsx
import {
  CircleDotIcon,
  Code2Icon,
  GitPullRequestIcon,
  PlayCircleIcon,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsUnderlineDemo() {
  return (
    <div className="flex flex-col gap-10">
      <Tabs defaultValue="source-code" variant="underline">
        <div className="border-b border-border">
          <TabsList>
            <TabsTrigger value="source-code">
              <Code2Icon />
              Code
            </TabsTrigger>
            <TabsTrigger value="issues">
              <CircleDotIcon />
              Issues
              <span className="rounded-full bg-secondary px-1.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                10
              </span>
            </TabsTrigger>
            <TabsTrigger value="pull-requests">
              <GitPullRequestIcon />
              Pull Requests
            </TabsTrigger>
            <TabsTrigger value="actions">
              <PlayCircleIcon />
              Actions
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
```

### Card

```tsx
import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsCardDemo() {
  return (
    <Tabs defaultValue="credit-card" variant="card">
      <TabsList className="*:data-[slot=tabs-trigger]:[&_svg]:size-5 *:data-[slot=tabs-trigger]:flex-col *:data-[slot=tabs-trigger]:items-start *:data-[slot=tabs-trigger]:py-2 *:data-[slot=tabs-trigger]:gap-1 gap-3">
        <TabsTrigger value="credit-card">
          <CreditCardIcon />
          Credit Card
        </TabsTrigger>
        <TabsTrigger value="bank">
          <LandmarkIcon />
          Bank Debit
        </TabsTrigger>
        <TabsTrigger value="wallet">
          <WalletIcon />
          Digital Wallet
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
```

### Orientation

You can change the orientation of the tabs to horizontal or vertical using the `orientation` prop.

#### Horizontal

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsHorizontalDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="docs" orientation="horizontal" variant="segmented">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="docs" orientation="horizontal" variant="underline">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="docs" orientation="horizontal" variant="card">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
```

#### Vertical

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsVerticalDemo() {
  return (
    <div className="flex flex-row flex-wrap gap-10">
      <Tabs defaultValue="docs" orientation="vertical" variant="segmented">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="docs" orientation="vertical" variant="underline">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="docs" orientation="vertical" variant="card">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
```

### Panel

Render dedicated content for each tab using `TabsPanel`.

```tsx
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/registry/base/tabs";

export default function TabsPanelDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Tabs defaultValue="docs">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
        <div className="mt-2 rounded-lg bg-card p-4">
          <TabsPanel value="docs">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Docs</h3>
              <p className="text-sm text-muted-foreground">
                Docs are a great way to learn about the product and how to use
                it.
              </p>
              <p className="text-sm text-muted-foreground">
                Follow guides, read API references, and explore live component
                examples.
              </p>
            </div>
          </TabsPanel>
          <TabsPanel value="components">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Components</h3>
              <p className="text-sm text-muted-foreground">
                Components are pre-built, accessible building blocks for your
                applications.
              </p>
            </div>
          </TabsPanel>
          <TabsPanel value="blocks">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Blocks</h3>
              <p className="text-sm text-muted-foreground">
                Ready-made application layouts and dashboard screens to
                accelerate delivery.
              </p>
            </div>
          </TabsPanel>
        </div>
      </Tabs>
    </div>
  );
}
```

### Auto Height

Wrap panels with `TabsPanelsWrapper` to smoothly animate the container height when switching between panels of varying height.

```tsx
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanelsWrapper,
  TabsTrigger,
} from "@/registry/base/tabs";

export default function TabsAutoHeightDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Tabs defaultValue="docs">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
        <div className="mt-2 rounded-lg bg-card p-4">
          <TabsPanelsWrapper>
            <TabsPanel value="docs">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Docs</h3>
                <p className="text-sm text-muted-foreground">
                  Docs are a great way to learn about the product and how to use
                  it.
                </p>
              </div>
            </TabsPanel>
            <TabsPanel value="components">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Components</h3>
                <p className="text-sm text-muted-foreground">
                  Components are pre-built, accessible building blocks for your
                  applications.
                </p>
                <p className="text-sm text-muted-foreground">
                  They provide accessible markup, keyboard navigation, and
                  consistent styling out of the box.
                </p>
                <p className="text-sm text-muted-foreground">
                  Easily customize colors, layout variants, and animation
                  behaviors.
                </p>
              </div>
            </TabsPanel>
            <TabsPanel value="blocks">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Blocks</h3>
                <p className="text-sm text-muted-foreground">
                  Blocks are complex layouts combining multiple components
                  together.
                </p>
                <p className="text-sm text-muted-foreground">
                  Explore sidebar navigations, authentication screens, and
                  complex dashboards.
                </p>
                <p className="text-sm text-muted-foreground">
                  Copy and paste responsive compositions directly into your
                  application.
                </p>
                <p className="text-sm text-muted-foreground">
                  Each block is built with native CSS tokens and project
                  primitives.
                </p>
                <p className="text-sm text-muted-foreground">
                  Save hours of design and prototyping time.
                </p>
              </div>
            </TabsPanel>
          </TabsPanelsWrapper>
        </div>
      </Tabs>
    </div>
  );
}
```

## API Reference

`Tabs` and its parts wrap the corresponding [Base UI Tabs primitives](https://base-ui.com/react/components/tabs). Supported Base UI props pass through.

### Props

#### Tabs

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"segmented" \| "underline" \| "card"` | `segmented` | Sets the visual treatment for the tab set. |

#### TabsList and TabsTrigger

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"segmented" \| "underline" \| "card"` | `-` | Overrides the variant inherited from `Tabs`. |
