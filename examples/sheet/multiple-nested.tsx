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

const MAX_NESTED_LEVEL = 10;

function NestedSheet({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final sheet" : `Open sheet ${level}`}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nested sheet {level}</SheetTitle>
          <SheetDescription>
            This is level {level} of ten nested Sheets.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The tenth nested Sheet is now active. Older surfaces fade after
              the three-layer visible stack.
            </p>
          ) : (
            <NestedSheet level={level + 1} />
          )}
        </SheetBody>
        <SheetFooter>
          <SheetCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </SheetCloseTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function SheetMultipleNestedDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open multiple nested sheets
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Multiple Nested Sheets</SheetTitle>
          <SheetDescription>
            Open ten Sheets in sequence to inspect the visible stack limit.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <NestedSheet level={1} />
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
