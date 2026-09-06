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

const MAX_NESTED_LEVEL = 10;

function NestedDrawer({ level }: { level: number }) {
  const isLastLevel = level === MAX_NESTED_LEVEL;

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        {isLastLevel ? "Open final drawer" : `Open drawer ${level}`}
      </DrawerTrigger>
      <DrawerPopup className="max-w-2xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Nested drawer {level}</DrawerTitle>
          <DrawerDescription>
            This is level {level} of ten nested Drawers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          {isLastLevel ? (
            <p className="text-sm text-muted-foreground">
              The tenth nested Drawer is now active. Older surfaces fade after
              the three-layer visible stack.
            </p>
          ) : (
            <NestedDrawer level={level + 1} />
          )}
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close level {level}
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}

export default function DrawerMultipleNestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open multiple nested drawers
      </DrawerTrigger>
      <DrawerPopup className="max-w-2xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Multiple Nested Drawers</DrawerTitle>
          <DrawerDescription>
            Open ten Drawers in sequence to inspect the visible stack limit.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <NestedDrawer level={1} />
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Close
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
