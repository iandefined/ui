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

export default function SheetNonDismissibleDemo() {
  return (
    <Sheet dismissible={false}>
      <SheetTrigger render={<Button variant="outline" />}>
        Important action
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Confirm action</SheetTitle>
          <SheetDescription>
            This sheet cannot be dismissed by clicking outside or pressing
            Escape.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm text-muted-foreground">
            Use the button below to complete or cancel this action.
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Cancel
          </SheetCloseTrigger>
          <SheetCloseTrigger render={<Button />}>Continue</SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
