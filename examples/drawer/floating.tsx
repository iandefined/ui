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
  type DrawerPosition,
} from "@/registry/base/drawer";

const positions: Array<{ value: DrawerPosition; label: string }> = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export default function DrawerFloatingDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {positions.map(({ value, label }) => (
        <Drawer key={value} position={value}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {label}
          </DrawerTrigger>
          <DrawerPopup showBar variant="floating">
            <DrawerHeader>
              <DrawerTitle>{label} floating drawer</DrawerTitle>
              <DrawerDescription>
                The floating variant adds an inset surface with rounded corners
                from every edge.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerCloseTrigger render={<Button variant="outline" />}>
                Close
              </DrawerCloseTrigger>
            </DrawerFooter>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
