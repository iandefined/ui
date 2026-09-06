"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";
import {
  Sheet,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

export default function SheetWithFormDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
      <SheetContent>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Update your profile details, then save when you are done.
            </SheetDescription>
          </SheetHeader>
          <SheetBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sheet-email">Email</Label>
              <Input
                id="sheet-email"
                type="email"
                defaultValue="jane@example.com"
              />
            </div>
          </SheetBody>
          <SheetFooter>
            <SheetCloseTrigger
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
