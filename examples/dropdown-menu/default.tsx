import {
  BellIcon,
  Building2Icon,
  LayoutGridIcon,
  LogOutIcon,
  SettingsIcon,
  TrashIcon,
  UserCircleIcon,
} from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

const menuItems = [
  { icon: UserCircleIcon, label: "Profile", shortcut: "⌘P" },
  { icon: LayoutGridIcon, label: "Applications", shortcut: "⌘A" },
  { icon: Building2Icon, label: "Teams", shortcut: "⌘T" },
  { icon: BellIcon, label: "Notifications", shortcut: "⌘N" },
];

export default function DropdownMenuDefaultDemo() {
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
      <DropdownMenuContent className="w-56">
        {menuItems.map(({ icon: Icon, label, shortcut }) => (
          <DropdownMenuItem key={label}>
            <div className="flex w-full items-center gap-3">
              <Icon />
              <span className="flex-1">{label}</span>
              <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
          <div className="flex w-full items-center gap-3">
            <LogOutIcon />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-400" variant="destructive">
          <div className="flex w-full items-center gap-3">
            <TrashIcon />
            <span>Delete account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
