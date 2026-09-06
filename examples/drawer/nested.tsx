import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerNestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open nested drawers
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>
            Open another drawer without losing the parent context.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <p className="text-sm text-muted-foreground">
            Nested drawers scale the parent surface and keep a small peek of it
            visible while the child is open.
          </p>
        </DrawerPanel>
        <DrawerFooter>
          <Drawer>
            <DrawerMenuTrigger>View account details</DrawerMenuTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>Account details</DrawerTitle>
                <DrawerDescription>
                  This panel is nested inside the account drawer.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerCloseTrigger render={<Button variant="outline" />}>
                  Close details
                </DrawerCloseTrigger>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
