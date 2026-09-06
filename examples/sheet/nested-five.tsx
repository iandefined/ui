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

const MAX_NESTED_LEVEL = 5;

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
            This is level {level} of five nested Sheets.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The fifth nested Sheet is now active. Each parent keeps its own
              focus scope and returns focus to its trigger when it closes.
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

export default function SheetNestedFiveDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open five nested sheets
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nested Sheets</SheetTitle>
          <SheetDescription>
            Open five Sheets in sequence to inspect the nested stack.
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
