import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
  type DrawerPosition,
} from "@/registry/base/drawer";

const positions: Array<{ value: DrawerPosition; label: string }> = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export default function DrawerPositionsDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {positions.map(({ value, label }) => (
        <Drawer key={value} position={value}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {label}
          </DrawerTrigger>
          <DrawerPopup showBar>
            <DrawerHeader>
              <DrawerTitle>{label} drawer</DrawerTitle>
              <DrawerDescription>
                Set `position="{value}"` on `Drawer`.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
