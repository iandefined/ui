"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" />}>
          {open ? "Drawer open" : "Open controlled drawer"}
        </DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>Controlled drawer</DrawerTitle>
            <DrawerDescription>
              The parent owns the open state through open and onOpenChange.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerCloseTrigger render={<Button variant="outline" />}>
              Close
            </DrawerCloseTrigger>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
      <p className="text-sm text-muted-foreground" role="status">
        {open ? "Open" : "Closed"}
      </p>
    </div>
  );
}
