import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
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

export default function SheetNonModalDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Sheet modal={false}>
        <SheetTrigger render={<Button variant="outline" />}>
          Open floating panel
        </SheetTrigger>
        <SheetContent className="sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Quick note</SheetTitle>
            <SheetDescription>
              The page remains interactive while this sheet is open.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <Input aria-label="Note" placeholder="Type a note..." />
          </SheetBody>
          <SheetFooter>
            <SheetCloseTrigger
              render={<Button variant="outline">Done</Button>}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Input aria-label="Page note" placeholder="Type here while open" />
    </div>
  );
}
