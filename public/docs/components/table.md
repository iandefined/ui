# Table

A responsive data table with sticky headers, scroll area containment, row dividers, and inset card elevation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Table` to present tabular data in rows and columns within a contained, elevated frame.

## Preview

```tsx
import { Badge } from "@/registry/base/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const invoices = [
  {
    invoice: "INV-001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    invoice: "INV-002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
  },
  {
    invoice: "INV-003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV-004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  {
    invoice: "INV-005",
    status: "Paid",
    method: "PayPal",
    amount: "$550.00",
  },
];

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium tabular-nums">
              {invoice.invoice}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === "Paid"
                    ? "success"
                    : invoice.status === "Pending"
                      ? "warning"
                      : "error"
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/table.json
```

## Usage

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableCaption>A list of recent transactions.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

## Composition

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead />
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell />
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell />
    </TableRow>
  </TableFooter>
  <TableCaption />
</Table>;
```

## Examples

### Bordered

Add cell dividing borders to column and row boundaries.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const tasks = [
  { id: "TASK-8782", title: "Add authentication flow", status: "Done" },
  { id: "TASK-7878", title: "Migrate database schema", status: "In Progress" },
  { id: "TASK-7839", title: "Refactor sidebar navigation", status: "Backlog" },
  { id: "TASK-5562", title: "Implement table pagination", status: "In Review" },
];

export default function TableBorderedDemo() {
  return (
    <Table bordered>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Task ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="tabular-nums text-xs font-medium">
              {task.id}
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell className="text-muted-foreground">
              {task.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Striped

Alternate row background colors to increase readability across wide data sets.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const metrics = [
  { metric: "Page Views", count: "124,892", change: "+12.3%" },
  { metric: "Unique Visitors", count: "48,201", change: "+8.1%" },
  { metric: "Bounce Rate", count: "32.4%", change: "-2.4%" },
  { metric: "Average Session", count: "3m 42s", change: "+14.0%" },
  { metric: "Conversions", count: "1,429", change: "+5.6%" },
];

export default function TableStripedDemo() {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-right">Count</TableHead>
          <TableHead className="text-right">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((item) => (
          <TableRow key={item.metric}>
            <TableCell className="font-medium">{item.metric}</TableCell>
            <TableCell className="text-right tabular-nums">
              {item.count}
            </TableCell>
            <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
              {item.change}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### With Footer

Display summary rows or column aggregations at the base of the table.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const items = [
  { description: "Pro Plan Subscription", quantity: 1, price: "$29.00" },
  { description: "Custom Domain Add-on", quantity: 2, price: "$20.00" },
  { description: "Dedicated IP Address", quantity: 1, price: "$15.00" },
];

export default function TableWithFooterDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.description}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell className="text-center tabular-nums">
              {item.quantity}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {item.price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right font-bold tabular-nums">
            $64.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### Expandable Rows

Compose `Collapsible` with table rows to reveal nested metadata, order items, or additional context on demand. Set `sticky="right"` on the matching `TableHead` and `TableCell` to keep an action column, such as the row toggle, visible while the table scrolls horizontally.

```tsx
"use client";

import { cn } from "cn";
import { ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { Badge } from "@/registry/base/badge";
import { Button } from "@/registry/base/button";
import { Collapsible, CollapsibleContent } from "@/registry/base/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

interface Order {
  id: string;
  customer: string;
  status: "Delivered" | "Shipped" | "Processing";
  amount: string;
  date: string;
  tracking: string;
  items: string[];
}

const orders: Order[] = [
  {
    id: "ORD-9481",
    customer: "Sophia Davis",
    status: "Delivered",
    amount: "$320.00",
    date: "Sep 4, 2026",
    tracking: "TRK-983021-US",
    items: ["Ergonomic Mechanical Keyboard", "USB-C Coiled Cable"],
  },
  {
    id: "ORD-9482",
    customer: "Liam Chen",
    status: "Shipped",
    amount: "$145.50",
    date: "Sep 5, 2026",
    tracking: "TRK-481920-US",
    items: ["Anodized Aluminum Wrist Rest"],
  },
  {
    id: "ORD-9483",
    customer: "Emma Watson",
    status: "Processing",
    amount: "$890.00",
    date: "Sep 6, 2026",
    tracking: "Pending Fulfillment",
    items: [
      "Custom Keycap Set",
      "Deskmat Pro - Obsidian",
      "Lubed Linear Switches (90x)",
    ],
  },
];

function ExpandableOrderRow({ order }: { order: Order }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        onClick={() => setOpen((prev) => !prev)}
        className="group/row cursor-pointer transition-colors hover:bg-muted/50"
      >
        <TableCell className="tabular-nums text-xs font-medium">
          {order.id}
        </TableCell>
        <TableCell>{order.customer}</TableCell>
        <TableCell>
          <Badge
            variant={
              order.status === "Delivered"
                ? "success"
                : order.status === "Shipped"
                  ? "info"
                  : "warning"
            }
          >
            {order.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right tabular-nums font-medium">
          {order.amount}
        </TableCell>
        <TableCell sticky="right" className="w-10 text-right">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Toggle details"
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className={cn(
                "size-4 shrink-0 transition-transform duration-200 ease-out",
                open && "rotate-90"
              )}
            />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className="[&:not(:has([data-slot=collapsible-content]:not([hidden]))):not(:has([data-slot=collapsible-content][data-ending-style]))]:hidden">
        <TableCell colSpan={5} className="p-0 whitespace-normal">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleContent>
              <div className="bg-muted/40 p-4 text-xs">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block font-medium">
                      Order Placed
                    </span>
                    <span className="mt-0.5 block">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block font-medium">
                      Tracking Number
                    </span>
                    <span className="font-mono mt-0.5 block">
                      {order.tracking}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block font-medium">
                      Line Items
                    </span>
                    <ul className="mt-1 list-inside list-disc space-y-0.5">
                      {order.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TableExpandableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[110px]">Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead sticky="right" className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <ExpandableOrderRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}
```

### Sticky Rows

Set `sticky="top"` or `sticky="bottom"` on `TableRow` to keep an important row visible while the table scrolls vertically. This example pins the total row at the bottom of the scroll area.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const invoices = [
  ["INV-1001", "Design subscription", "$120.00"],
  ["INV-1002", "API usage", "$84.50"],
  ["INV-1003", "Team seats", "$240.00"],
  ["INV-1004", "Priority support", "$75.00"],
  ["INV-1005", "Storage overage", "$32.40"],
  ["INV-1006", "Design subscription", "$120.00"],
  ["INV-1007", "API usage", "$91.20"],
  ["INV-1008", "Team seats", "$240.00"],
  ["INV-1009", "Priority support", "$75.00"],
  ["INV-1010", "Storage overage", "$28.80"],
];

export default function TableStickyRowsDemo() {
  return (
    <Table viewportClassName="max-h-64">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(([invoice, description, amount]) => (
          <TableRow key={invoice}>
            <TableCell className="font-medium tabular-nums">
              {invoice}
            </TableCell>
            <TableCell>{description}</TableCell>
            <TableCell className="text-right tabular-nums">{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow sticky="bottom">
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right font-bold tabular-nums">
            $1,106.90
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### Resizable Columns

Enable column resizing by setting `resizable` on `Table`. An expanded interactive hitbox lets users drag column borders, highlighting the separator line on hover with a two-arrow resize cursor. On touch devices, swipe the table horizontally to reach off-screen columns, then drag a column separator to resize it. Cell and header text truncates instead of overlapping adjacent columns. Tables use a compact horizontal edge fade whenever content overflows.

```tsx
import { Badge } from "@/registry/base/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const invoices = [
  {
    invoice: "INV-001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    invoice: "INV-002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
  },
  {
    invoice: "INV-003",
    status: "Unpaid",
    method: "International Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV-004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  {
    invoice: "INV-005",
    status: "Paid",
    method: "PayPal",
    amount: "$550.00",
  },
];

export default function TableResizableDemo() {
  return (
    <Table resizable>
      <TableCaption>Drag the column separators to resize columns.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Invoice</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="w-[160px]">Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium tabular-nums">
              {invoice.invoice}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === "Paid"
                    ? "success"
                    : invoice.status === "Pending"
                      ? "warning"
                      : "error"
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Wrapping Content

Table cells keep content on one line by default so column values remain easy to scan. Add `whitespace-normal` to a cell when long-form content needs to wrap.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

export default function TableWrappingDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Default</TableCell>
          <TableCell>
            This value stays on one line and scrolls horizontally when space is
            limited.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Wrapped</TableCell>
          <TableCell className="whitespace-normal">
            This value wraps because the cell explicitly opts in with
            whitespace-normal.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## API Reference

`Table` parts compose standard HTML table elements through Base UI `useRender` and `mergeProps`. Standard HTML attributes and event handlers pass through to the underlying elements.

### Props

#### Table

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `bordered` | `boolean` | `false` | Renders outer and column borders between table cells. |
| `striped` | `boolean` | `false` | Alternates background shading on even rows to increase readability across wide data sets. |
| `hoverable` | `boolean` | `true` | Highlights rows on pointer hover, matching hover styles across striped and non-striped cells. |
| `rowDividers` | `boolean` | `true` | Renders horizontal dividing borders between body rows. |
| `resizable` | `boolean` | `false` | Enables draggable column resizing with interactive hitboxes and animated separators. |
| `hideScrollbar` | `boolean` | `false` | Hides the scrollbar track and thumb while retaining horizontal scroll capability. |
| `scrollShadow` | `"vertical" \| "horizontal" \| "both" \| "none"` | `horizontal` | Renders gradient shadow fades at the scroll container boundaries. |
| `fadeColor` | `string` | `-` | Sets the custom CSS color used for edge shadow fades. |

#### TableHead

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sticky` | `"left" \| "right"` | `-` | Pins this header cell to the corresponding inline edge while the table scrolls horizontally. Set the same value on the matching `TableCell` components. |
| `resizable` | `boolean` | `-` | Overrides column resizing behavior for this specific column header. |
| `resizer` | `React.ReactNode` | `-` | Custom resizer element rendered on the column boundary. |

#### TableCell

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sticky` | `"left" \| "right"` | `-` | Pins this cell to the corresponding inline edge while the table scrolls horizontally. Apply it to every cell in the column, including its header. |

#### TableRow

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sticky` | `"top" \| "bottom"` | `-` | Pins every cell in this row to the corresponding block edge while the table scrolls vertically. |
| `selected` | `boolean` | `-` | Applies the selected background color and state attribute to the row. |
