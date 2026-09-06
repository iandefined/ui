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

export default function DialogInsetFooterDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent variant="inset" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            The inset footer separates actions from the form content.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dialog-inset-name">Name</Label>
            <Input id="dialog-inset-name" defaultValue="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialog-inset-handle">Username</Label>
            <Input id="dialog-inset-handle" defaultValue="@janedoe" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <DialogCloseTrigger render={<Button>Save changes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
