import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverBackdropTransparentDemo() {
  return (
    <Popover backdrop="transparent" modal>
      <PopoverTrigger render={<Button variant="outline" />}>
        Transparent backdrop
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Transparent backdrop</PopoverTitle>
        <PopoverDescription className="mt-2">
          The page stays visible while outside interaction remains blocked.
        </PopoverDescription>
        <PopoverClose className="mt-4" render={<Button size="sm" />}>
          Close
        </PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
