"use client";

import { ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
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
        <TableCell className="w-10 text-right">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Toggle details"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            <ChevronRightIcon
              className={cn(
                "size-4 shrink-0 transition-transform duration-200 ease-out",
                open && "rotate-90"
              )}
            />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className="[&:not(:has([data-slot=collapsible-content]:not([hidden])))]:hidden">
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
          <TableHead className="w-10" />
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
