import { Button } from "@/registry/base/button";
import {
  createDialogHandle,
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

const dialogHandle = createDialogHandle();

export default function DialogDetachedTriggerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <DialogTrigger
        handle={dialogHandle}
        render={<Button>Open settings</Button>}
      />
      <Dialog handle={dialogHandle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              The trigger and the dialog root do not need to share a parent.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-muted-foreground">
              This is useful when a table row or toolbar owns the trigger and a
              shared dialog renders elsewhere in the tree.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              render={<Button variant="outline">Close</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
