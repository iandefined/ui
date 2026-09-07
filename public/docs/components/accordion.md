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

An inset container with a subtle tray background and an elevated nested content card that animates smoothly on expand.

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

### With Icon

Displays a leading icon alongside the trigger text using the `icon` prop.

```tsx
import { CreditCardIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionWithIcon() {
  return (
    <Accordion multiple={false} className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={<CreditCardIcon className="size-4 shrink-0" />}>
          Payment Methods
        </AccordionTrigger>
        <AccordionContent>
          We accept all major credit cards, PayPal, and bank transfers. Your
          payment information is encrypted and secure.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={<TruckIcon className="size-4 shrink-0" />}>
          Shipping & Delivery
        </AccordionTrigger>
        <AccordionContent>
          Standard shipping typically takes 3-5 business days, while express
          shipping arrives within 1-2 business days. Free shipping is available
          on orders over $50.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger
          icon={<ShieldCheckIcon className="size-4 shrink-0" />}
        >
          Security & Privacy
        </AccordionTrigger>
        <AccordionContent>
          Your data is protected with industry-standard encryption. We never
          share your personal information with third parties without your
          explicit consent.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### With Subtitle

Provides secondary descriptive text below the trigger label using the `subtitle` prop.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionWithSubtitle() {
  return (
    <Accordion multiple={false} className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger subtitle="Learn about our hassle-free return process">
          What is your refund policy?
        </AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee for all purchases. If
          you&apos;re not completely satisfied, contact our support team for a
          full refund. No questions asked.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger subtitle="Delivery times and shipping options">
          How long does shipping take?
        </AccordionTrigger>
        <AccordionContent>
          Standard shipping typically takes 3-5 business days, while express
          shipping arrives within 1-2 business days. Free shipping is available
          on orders over $50.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger subtitle="Get help from our expert team">
          Do you offer technical support?
        </AccordionTrigger>
        <AccordionContent>
          Yes! Our technical support team is available 24/7 via email and live
          chat. We also have comprehensive documentation and video tutorials.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Isolated Bordered

Bordered card items that dynamically separate and round their corners when opened.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionIsolatedBordered() {
  return (
    <Accordion variant="isolated-bordered" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          Manage your account preferences and personal information. Update your
          profile details, change your password, and configure your account
          settings here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Configure how and when you receive notifications. Customize email
          alerts, push notifications, and other communication preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Privacy & Security</AccordionTrigger>
        <AccordionContent>
          Control your privacy settings and security options. Adjust data
          sharing preferences, manage activity tracking, and review your
          security settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Billing & Payments</AccordionTrigger>
        <AccordionContent>
          View and manage your billing information, payment methods, and
          subscription details. Update your payment preferences and review your
          billing history.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Isolated Filled

Muted filled items that dynamically detach and round into distinct cards when expanded.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionIsolatedFilled() {
  return (
    <Accordion variant="isolated-filled" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          Manage your account preferences and personal information. Update your
          profile details, change your password, and configure your account
          settings here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Configure how and when you receive notifications. Customize email
          alerts, push notifications, and other communication preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Privacy & Security</AccordionTrigger>
        <AccordionContent>
          Control your privacy settings and security options. Adjust data
          sharing preferences, manage activity tracking, and review your
          security settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Billing & Payments</AccordionTrigger>
        <AccordionContent>
          View and manage your billing information, payment methods, and
          subscription details. Update your payment preferences and review your
          billing history.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Isolated Filled Bordered

Filled items with dividing borders that cleanly isolate into individual cards when opened.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionIsolatedFilledBordered() {
  return (
    <Accordion variant="isolated-filled-bordered" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          Manage your account preferences and personal information. Update your
          profile details, change your password, and configure your account
          settings here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Configure how and when you receive notifications. Customize email
          alerts, push notifications, and other communication preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Privacy & Security</AccordionTrigger>
        <AccordionContent>
          Control your privacy settings and security options. Adjust data
          sharing preferences, manage activity tracking, and review your
          security settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Billing & Payments</AccordionTrigger>
        <AccordionContent>
          View and manage your billing information, payment methods, and
          subscription details. Update your payment preferences and review your
          billing history.
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
