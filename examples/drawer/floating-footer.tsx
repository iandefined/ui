import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

const footerVariants = [
  { footerVariant: "default", sticky: false },
  { footerVariant: "default", sticky: true },
  { footerVariant: "inset", sticky: false },
  { footerVariant: "inset", sticky: true },
] as const;

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable floating drawer content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function DrawerFloatingFooterDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {footerVariants.map(({ footerVariant, sticky }) => {
        const behaviorLabel = sticky ? "Sticky" : "Following";
        const footerLabel = capitalize(footerVariant);

        return (
          <Drawer
            key={`${behaviorLabel}-${footerVariant}`}
            defaultSnapPoint={0.4}
            snapPoints={[0.4, 1]}
            snapToSequentialPoints
          >
            <DrawerTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {behaviorLabel}, {footerLabel}
            </DrawerTrigger>
            <DrawerPopup showBar variant="floating">
              <DrawerHeader>
                <DrawerTitle>Floating drawer</DrawerTitle>
                <DrawerDescription>
                  Compare the footer while scrolling, swiping, and moving
                  between snap points.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerPanel scrollFade>
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
              </DrawerPanel>
              <DrawerFooter
                className="border-t py-4"
                sticky={sticky}
                variant={footerVariant}
              >
                <DrawerCloseTrigger
                  render={<Button size="sm" variant="outline" />}
                >
                  Close
                </DrawerCloseTrigger>
                <Button size="sm">{behaviorLabel} action</Button>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        );
      })}
    </div>
  );
}
