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

const MAX_NESTED_LEVEL = 5;

function NestedDialog({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final dialog" : `Open dialog ${level}`}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nested dialog {level}</DialogTitle>
          <DialogDescription>
            This is level {level} of five nested Dialogs.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The fifth nested Dialog is now active. Focus returns to each
              trigger as its dialog closes.
            </p>
          ) : (
            <NestedDialog level={level + 1} />
          )}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DialogNestedFiveDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open five nested dialogs
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nested Dialogs</DialogTitle>
          <DialogDescription>
            Open five Dialogs in sequence to inspect the nested stack.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <NestedDialog level={1} />
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger render={<Button variant="outline" />}>
            Close
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
