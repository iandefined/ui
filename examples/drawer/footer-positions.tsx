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
  type DrawerPosition,
} from "@/registry/base/drawer";

const footerVariants: Array<{
  position: Exclude<DrawerPosition, "bottom">;
  sticky: boolean;
}> = [
  { position: "top", sticky: false },
  { position: "top", sticky: true },
  { position: "left", sticky: false },
  { position: "left", sticky: true },
  { position: "right", sticky: false },
  { position: "right", sticky: true },
];

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable drawer content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

export default function DrawerFooterPositionsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {footerVariants.map(({ position, sticky }) => {
        const positionLabel =
          position.charAt(0).toUpperCase() + position.slice(1);
        const behaviorLabel = sticky ? "Sticky" : "Following";

        return (
          <Drawer key={`${position}-${behaviorLabel}`} position={position}>
            <DrawerTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {positionLabel}, {behaviorLabel}
            </DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>{positionLabel} drawer</DrawerTitle>
                <DrawerDescription>
                  {sticky
                    ? "Viewport pinning is bottom-only, so this footer remains safely attached to the surface."
                    : `This footer follows the drawer toward the ${position} edge.`}
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
              <DrawerFooter sticky={sticky} className="border-t py-4">
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
