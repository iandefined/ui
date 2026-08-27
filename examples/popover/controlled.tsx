"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger render={<Button variant="outline" />}>
          {open ? "Close popover" : "Open popover"}
        </PopoverTrigger>
        <PopoverPopup>
          <PopoverTitle className="text-base">Controlled popover</PopoverTitle>
          <PopoverDescription className="mt-2">
            The open state is managed by the parent.
          </PopoverDescription>
        </PopoverPopup>
      </Popover>
      <p className="text-sm text-muted-foreground">
        State: {open ? "Open" : "Closed"}
      </p>
    </div>
  );
}
