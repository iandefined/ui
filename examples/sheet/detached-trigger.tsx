import { Button } from "@/registry/base/button";
import {
  createSheetHandle,
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

const sheetHandle = createSheetHandle();

export default function SheetDetachedTriggerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <SheetTrigger
        handle={sheetHandle}
        render={<Button>Open settings</Button>}
      />
      <Sheet handle={sheetHandle}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              The trigger and sheet root can live in different parts of the
              tree.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <p className="text-sm text-muted-foreground">
              This is useful when a toolbar owns the trigger and a shared sheet
              renders elsewhere in the tree.
            </p>
          </SheetBody>
          <SheetFooter>
            <SheetCloseTrigger
              render={<Button variant="outline">Close</Button>}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
