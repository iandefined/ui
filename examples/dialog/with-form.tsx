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
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function DialogWithFormDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update your profile details, then save when you are done.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" defaultValue="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dialog-email">Email</Label>
              <Input
                id="dialog-email"
                type="email"
                defaultValue="jane@example.com"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
