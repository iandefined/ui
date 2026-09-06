import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerDefaultDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You are all caught up. Good job!
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
