import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverHoverDemo() {
  return (
    <Popover>
      <PopoverTrigger
        delay={200}
        openOnHover
        render={<Button variant="outline" />}
      >
        Hover to open
      </PopoverTrigger>
      <PopoverPopup>
        <PopoverTitle className="text-base">Hover popover</PopoverTitle>
        <PopoverDescription className="mt-2">
          This popover opens after a short delay.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
