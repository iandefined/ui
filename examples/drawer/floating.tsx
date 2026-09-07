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
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export default function DrawerFloatingDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {positions.map(({ value, label }) => (
        <Drawer key={value} position={value}>
          <DrawerTrigger
            render={<Button className="w-full" variant="outline" />}
          >
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
