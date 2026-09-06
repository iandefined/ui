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

export default function DrawerNonDismissibleDemo() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Important action
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Confirm action</DrawerTitle>
          <DrawerDescription>
            This drawer cannot be dismissed by clicking outside, pressing
            Escape, or dragging. Use one of the buttons below.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <p className="text-sm">
            Review the change before continuing. The drawer stays open until you
            choose an action.
          </p>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Cancel
          </DrawerCloseTrigger>
          <DrawerCloseTrigger render={<Button />}>Confirm</DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
