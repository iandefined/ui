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
  { label: "Top", side: "top" },
  { label: "Bottom", side: "bottom" },
  { label: "Left", side: "left" },
  { label: "Right", side: "right" },
] as const;

export default function SheetFloatingDemo() {
  return (
    <div className="mx-auto grid w-full max-w-xs grid-cols-2 justify-items-center gap-2 sm:flex sm:max-w-none sm:justify-center">
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
