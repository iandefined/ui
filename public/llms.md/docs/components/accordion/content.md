# Accordion

A vertically stacked set of interactive headings that reveal or hide associated content sections.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

A vertically stacked collection of expandable panels with indicator animations and multiple styling variants.

## Preview

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionDefaultDemo() {
  return (
    <Accordion className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern with keyboard
          navigation and screen reader announcements.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
        <AccordionContent>
          Yes. Unstyled Base UI logic combines with Tailwind classes for
          seamless theming and variant extensions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Height and opacity transitions animate automatically using CSS
          transition variables.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/accordion.json
```

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

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionDefaultDemo() {
  return (
    <Accordion className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern with keyboard
          navigation and screen reader announcements.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
        <AccordionContent>
          Yes. Unstyled Base UI logic combines with Tailwind classes for
          seamless theming and variant extensions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Height and opacity transitions animate automatically using CSS
          transition variables.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Outline

Encloses all items within a single rounded card frame.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionOutlineDemo() {
  return (
    <Accordion variant="outline" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Preferences</AccordionTrigger>
        <AccordionContent>
          Manage your email addresses, notification rules, and localization
          settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Security & Authentication</AccordionTrigger>
        <AccordionContent>
          Configure two-factor authentication, security keys, and active session
          devices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing & Plans</AccordionTrigger>
        <AccordionContent>
          View invoices, download payment receipts, and upgrade or downgrade
          subscription tiers.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Split

Renders each item as an independent card with spacing between sections.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionSplitDemo() {
  return (
    <Accordion variant="split" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is included in the Pro tier?</AccordionTrigger>
        <AccordionContent>
          Unlimited team workspaces, priority CDN edge deployment, and dedicated
          support channels with SLA guarantees.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
        <AccordionContent>
          Yes, you can cancel your subscription at any point from your team
          settings with prorated refunds.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does custom branding work?</AccordionTrigger>
        <AccordionContent>
          Upload your logo, custom font pairings, and color palette tokens to
          seamlessly align the theme with your brand.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Inset

An inset container matching the inset card style with a subtle tray background and elevated animated panel. The panel owns its background and shadow, so its `overflow-hidden` height animation clips only its content, not its own light-mode outline. Preserve the tray padding and one-pixel inline gutter when replacing the panel surface.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionInsetDemo() {
  return (
    <Accordion variant="inset" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Deployment Settings</AccordionTrigger>
        <AccordionContent>
          Configure static routing rules, worker bindings, and custom build
          hooks for automated releases.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Environment Variables</AccordionTrigger>
        <AccordionContent>
          Manage encrypted production secrets and shared runtime variables
          across preview environments.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Access Controls</AccordionTrigger>
        <AccordionContent>
          Define role-based permissions and grant scoped API tokens with
          granular expiration windows.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## API Reference

`Accordion` primitives wrap `@base-ui/react/accordion`.

### Props

#### Accordion

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "split" \| "outline" \| "inset" \| "nested" \| "isolated-bordered" \| "isolated-filled" \| "isolated-filled-bordered"` | `default` | Visual style variant applied to the accordion container and items. |
| `multiple` | `boolean` | `false` | Whether multiple accordion items can be open simultaneously. |
| `value` | `string[] \| string` | `-` | Controlled open item value(s). |
| `defaultValue` | `string[] \| string` | `-` | Initial open item value(s) when uncontrolled. |

#### AccordionTrigger

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showIndicator` | `boolean` | `true` | Whether to display the expansion indicator icon. |
| `indicatorType` | `"chevron" \| "plus"` | `plus` | The icon style rendered for the expansion indicator. |
| `indicatorPosition` | `"start" \| "end"` | `end` | Position of the expansion indicator relative to the title. |
| `icon` | `React.ReactNode` | `-` | Optional icon rendered alongside the trigger title. |
| `subtitle` | `React.ReactNode` | `-` | Secondary descriptive text rendered below the trigger title. |
