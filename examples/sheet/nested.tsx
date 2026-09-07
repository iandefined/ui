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

const nestedDirections = [
  { label: "Top", side: "top", variant: "default" },
  { label: "Bottom", side: "bottom", variant: "default" },
  { label: "Left", side: "left", variant: "default" },
  { label: "Right", side: "right", variant: "default" },
  { label: "Top", side: "top", variant: "floating" },
  { label: "Bottom", side: "bottom", variant: "floating" },
  { label: "Left", side: "left", variant: "floating" },
  { label: "Right", side: "right", variant: "floating" },
] as const;

export default function SheetNestedDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {nestedDirections.map(({ label, side, variant }) => (
        <Sheet key={`${variant}-${side}`}>
          <SheetTrigger
            render={<Button className="w-full" variant="outline" />}
          >
            {variant === "floating" ? `${label} floating` : `${label} nested`}
          </SheetTrigger>
          <SheetContent side={side} variant={variant}>
            <SheetHeader>
              <SheetTitle>
                {variant === "floating"
                  ? `${label} floating sheet`
                  : `${label} sheet`}
              </SheetTitle>
              <SheetDescription>
                Open a secondary sheet from the same edge for a separate focus
                scope.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <Sheet>
                <SheetTrigger render={<Button className="w-36" />}>
                  Open nested sheet
                </SheetTrigger>
                <SheetContent variant={variant}>
                  <SheetHeader>
                    <SheetTitle>
                      {variant === "floating"
                        ? `${label} floating nested sheet`
                        : `${label} nested sheet`}
                    </SheetTitle>
                    <SheetDescription>
                      This sheet inherits the direction of its parent.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetBody>
                    <p className="text-sm text-muted-foreground">
                      The parent is rounded and shifts behind this sheet.
                    </p>
                  </SheetBody>
                  <SheetFooter>
                    <SheetCloseTrigger
                      render={<Button variant="outline">Close</Button>}
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </SheetBody>
            <SheetFooter>
              <SheetCloseTrigger
                render={<Button variant="outline">Close</Button>}
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
