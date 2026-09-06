"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base/dialog";

export default function DialogControlledDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <DialogTrigger render={<Button variant="outline" />}>
        Open controlled dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>
            The parent owns the open state and can close the dialog after an
            operation completes.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            Current state: {open ? "open" : "closed"}
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
