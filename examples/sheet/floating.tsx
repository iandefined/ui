import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const directions = [
  { label: "Right", side: "right" },
  { label: "Left", side: "left" },
  { label: "Top", side: "top" },
  { label: "Bottom", side: "bottom" },
] as const;

export default function SheetFloatingDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {directions.map(({ label, side }) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>
            {label}
          </SheetTrigger>
          <SheetContent side={side} variant="floating">
            <SheetHeader>
              <SheetTitle>{label} floating sheet</SheetTitle>
              <SheetDescription>
                A floating sheet keeps a margin around the panel.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <p className="text-sm text-muted-foreground">
                Use the floating variant when the sheet should read as a card
                above the page instead of a viewport edge.
              </p>
            </SheetBody>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
