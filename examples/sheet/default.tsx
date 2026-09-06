import { Button } from "@/registry/base/button";
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

export default function SheetDefaultDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You are all caught up. Good job!</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm text-muted-foreground">
            New activity will appear here when it needs your attention.
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
