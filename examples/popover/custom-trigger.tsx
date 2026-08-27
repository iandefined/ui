import { BellIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

export default function PopoverCustomTriggerDemo() {
  return (
    <Popover>
      <PopoverTrigger
        delay={200}
        openOnHover
        render={
          <Button aria-label="Notifications" size="icon" variant="outline" />
        }
      >
        <BellIcon aria-hidden="true" />
      </PopoverTrigger>
      <PopoverPopup side="top" sideOffset={8} className="w-64">
        <PopoverTitle className="text-base">Notifications</PopoverTitle>
        <PopoverDescription className="mt-2">
          You are all caught up. Good job!
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
