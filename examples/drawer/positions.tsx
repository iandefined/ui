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
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export default function DrawerPositionsDemo() {
  return (
    <div className="mx-auto grid w-full max-w-xs grid-cols-2 justify-items-center gap-2 sm:flex sm:max-w-none sm:justify-center">
      {positions.map(({ value, label }) => (
        <Drawer key={value} position={value}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {label}
          </DrawerTrigger>
          <DrawerPopup showBar>
            <DrawerHeader>
              <DrawerTitle>{label} drawer</DrawerTitle>
              <DrawerDescription>
                Set position="{value}" on Drawer.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
