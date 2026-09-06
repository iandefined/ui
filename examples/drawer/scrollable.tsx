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

const items = Array.from({ length: 24 }, (_, index) => index + 1);

export default function DrawerScrollableDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open scrollable drawer
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Recent activity</DrawerTitle>
          <DrawerDescription>
            Scroll the panel, then swipe from the top edge to dismiss it.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollFade>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item} className="rounded-lg border border-border p-3">
                <p className="font-medium">Activity {item}</p>
                <p className="text-sm text-muted-foreground">
                  A short description for this activity entry.
                </p>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
