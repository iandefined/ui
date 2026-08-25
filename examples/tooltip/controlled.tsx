"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/base/tooltip";

export default function TooltipControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover me
          </TooltipTrigger>
          <TooltipPopup>Tooltip content</TooltipPopup>
        </Tooltip>
        <p className="text-sm text-muted-foreground">
          State: {open ? "Open" : "Closed"}
        </p>
      </div>
    </TooltipProvider>
  );
}
