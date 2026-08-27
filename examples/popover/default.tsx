import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverDefaultDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription className="mt-2">
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
