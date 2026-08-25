import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

import { AccountMenuItems } from "./menu-items";

const sides = [
  "top",
  "right",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

export default function DropdownMenuSidesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {sides.map((side) => (
        <DropdownMenu key={side}>
          <DropdownMenuTrigger
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            <span className="capitalize">{side}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent showArrow side={side} sideOffset={8}>
            <AccountMenuItems />
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}
