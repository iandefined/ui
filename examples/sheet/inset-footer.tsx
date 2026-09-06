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

export default function SheetInsetFooterDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit profile
      </SheetTrigger>
      <SheetContent footerVariant="inset">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            The inset footer separates actions from the form content.
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sheet-inset-name">Name</Label>
            <Input id="sheet-inset-name" defaultValue="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sheet-inset-handle">Username</Label>
            <Input id="sheet-inset-handle" defaultValue="@janedoe" />
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger
            render={<Button variant="outline">Cancel</Button>}
          />
          <SheetCloseTrigger render={<Button>Save changes</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
