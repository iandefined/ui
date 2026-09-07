import { Button } from "@/registry/base/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/base/sheet";

const positions = [
  { label: "Top", side: "top" },
  { label: "Bottom", side: "bottom" },
  { label: "Left", side: "left" },
  { label: "Right", side: "right" },
] as const;

export default function SheetPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {positions.map(({ label, side }) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {label}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{label} sheet</SheetTitle>
              <SheetDescription>
                Set <code>side="{side}"</code> to choose where it opens.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
