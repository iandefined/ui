import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverWithArrowDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverPopup showArrow sideOffset={8} className="w-72">
        <PopoverTitle>With arrow</PopoverTitle>
        <PopoverDescription className="mt-2">
          The arrow points toward the trigger.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
