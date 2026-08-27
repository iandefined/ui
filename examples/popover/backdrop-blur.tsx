import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverBackdropBlurDemo() {
  return (
    <Popover backdrop="blur" modal>
      <PopoverTrigger render={<Button variant="outline" />}>
        Blur backdrop
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverTitle>Blur backdrop</PopoverTitle>
        <PopoverDescription className="mt-2">
          The page is blurred while the popover is open.
        </PopoverDescription>
        <PopoverClose className="mt-4" render={<Button size="sm" />}>
          Close
        </PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
