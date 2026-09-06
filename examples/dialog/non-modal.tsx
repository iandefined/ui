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

export default function DialogNonModalDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Dialog modal={false}>
        <DialogTrigger render={<Button variant="outline" />}>
          Open floating panel
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Quick note</DialogTitle>
            <DialogDescription>
              The page remains interactive while this panel is open.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Input aria-label="Note" placeholder="Type a note..." />
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              render={<Button variant="outline">Done</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Input aria-label="Page note" placeholder="Type here while open" />
    </div>
  );
}
