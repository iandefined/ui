import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverBackdropDimDemo() {
  return (
    <Popover backdrop="dim" modal>
      <PopoverTrigger render={<Button variant="outline" />}>
        Dim backdrop
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Dim backdrop</PopoverTitle>
        <PopoverDescription className="mt-2">
          The page is dimmed while the popover is open.
        </PopoverDescription>
        <PopoverClose className="mt-4" render={<Button size="sm" />}>
          Close
        </PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
