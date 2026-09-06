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

export default function DialogDefaultDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Share project</Button>} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share project</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this project.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1 space-y-2">
              <Label htmlFor="dialog-share-link">Project link</Label>
              <Input
                id="dialog-share-link"
                defaultValue="https://example.com/projects/abc123"
                readOnly
              />
            </div>
            <Button type="button">Copy</Button>
          </div>
        </DialogBody>
        <DialogFooter className="sm:justify-start">
          <DialogCloseTrigger
            render={<Button variant="outline">Close</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
