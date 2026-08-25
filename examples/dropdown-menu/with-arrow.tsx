import { SettingsIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

import { AccountMenuItems } from "./menu-items";

export default function DropdownMenuWithArrowDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="flex items-center gap-2 active:scale-100"
            size="sm"
            variant="ghost"
          />
        }
      >
        <SettingsIcon />
        <span>Account settings</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" showArrow sideOffset={8}>
        <AccountMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
