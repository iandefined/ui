import {
  BellIcon,
  Building2Icon,
  LayoutGridIcon,
  LogOutIcon,
  TrashIcon,
  UserCircleIcon,
} from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/registry/base/dropdown-menu";

const menuItems = [
  { icon: UserCircleIcon, label: "Profile", shortcut: "⌘P" },
  { icon: LayoutGridIcon, label: "Applications", shortcut: "⌘A" },
  { icon: Building2Icon, label: "Teams", shortcut: "⌘T" },
  { icon: BellIcon, label: "Notifications", shortcut: "⌘N" },
];

export function AccountMenuItems() {
  return (
    <>
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
    </>
  );
}
