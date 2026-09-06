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

export default function DialogNestedDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open account dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account settings</DialogTitle>
          <DialogDescription>
            Open a second dialog for an action that needs separate focus.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            The nested dialog stacks above this one and restores focus when it
            closes.
          </p>
        </DialogBody>
        <DialogFooter className="justify-between">
          <Dialog>
            <DialogTrigger
              render={<Button variant="ghost" className="text-destructive" />}
            >
              Delete account
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p className="text-sm text-muted-foreground">
                  All of your projects and settings will be permanently removed.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogCloseTrigger
                  render={<Button variant="outline">Cancel</Button>}
                />
                <DialogCloseTrigger
                  render={<Button variant="destructive">Delete</Button>}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DialogCloseTrigger
            render={<Button variant="outline">Close</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
