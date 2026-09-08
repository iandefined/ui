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
  type SheetFooterVariant,
  type SheetSide,
} from "@/registry/base/sheet";

const footerVariants: Array<{
  side: SheetSide;
  footerVariant: SheetFooterVariant;
}> = [
  { side: "top", footerVariant: "default" },
  { side: "top", footerVariant: "inset" },
  { side: "bottom", footerVariant: "default" },
  { side: "bottom", footerVariant: "inset" },
  { side: "left", footerVariant: "default" },
  { side: "left", footerVariant: "inset" },
  { side: "right", footerVariant: "default" },
  { side: "right", footerVariant: "inset" },
];

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable sheet content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function SheetFooterPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {footerVariants.map(({ side, footerVariant }) => {
        const sideLabel = capitalize(side);
        const footerLabel = capitalize(footerVariant);

        return (
          <Sheet key={`${side}-${footerVariant}`}>
            <SheetTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {sideLabel}, {footerLabel}
            </SheetTrigger>
            <SheetContent side={side} footerVariant={footerVariant}>
              <SheetHeader>
                <SheetTitle>{sideLabel} sheet</SheetTitle>
                <SheetDescription>
                  The body scrolls independently while the{" "}
                  {footerLabel.toLowerCase()} footer remains attached to the
                  sheet.
                </SheetDescription>
              </SheetHeader>
              <SheetBody fadeEdges="y">
                <div className="grid gap-3">
                  {cards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-lg border bg-muted/40 p-4"
                    >
                      <div className="text-sm font-medium">{card.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </SheetBody>
              <SheetFooter>
                <SheetCloseTrigger
                  render={<Button size="sm" variant="outline" />}
                >
                  Close
                </SheetCloseTrigger>
                <Button size="sm">{footerLabel} action</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
}
