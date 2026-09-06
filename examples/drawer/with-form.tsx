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
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function DrawerWithFormDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Edit profile</DrawerTrigger>
      <DrawerPopup className="max-w-xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Update your details, then save the changes.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drawer-name">Name</Label>
              <Input id="drawer-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drawer-username">Username</Label>
              <Input id="drawer-username" defaultValue="@peduarte" />
            </div>
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Cancel
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
