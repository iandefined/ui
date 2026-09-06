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

export default function DialogNonDismissibleDemo() {
  return (
    <Dialog dismissible={false}>
      <DialogTrigger render={<Button variant="outline" />}>
        Important action
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This dialog cannot be dismissed by clicking outside or pressing
            Escape. Use one of the buttons below.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            Review the change before continuing. The dialog stays open until you
            choose an action.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <DialogCloseTrigger render={<Button>Confirm</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
