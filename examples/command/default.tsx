import {
  FilePlusIcon,
  FolderOpenIcon,
  HistoryIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Command,
  CommandCollection,
  CommandContent,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/base/command";

const groups = [
  {
    label: "Files",
    items: [
      { label: "New file", icon: FilePlusIcon },
      { label: "Open project", icon: FolderOpenIcon },
      { label: "Recent files", icon: HistoryIcon },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Team members", icon: UsersIcon },
      { label: "Project settings", icon: SettingsIcon },
    ],
  },
];

type CommandGroupData = (typeof groups)[number];
type CommandAction = CommandGroupData["items"][number];

export default function CommandDemo() {
  const [action, setAction] = useState<string>();

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command items={groups}>
        <CommandContent>
          <CommandInput
            aria-label="Search actions"
            placeholder="Search actions…"
          />
          <CommandList>
            {(group: CommandGroupData) => (
              <CommandGroup
                className="group/command-group"
                key={group.label}
                items={group.items}
              >
                <CommandSeparator className="group-first/command-group:hidden" />
                <CommandGroupLabel>{group.label}</CommandGroupLabel>
                <CommandCollection>
                  {(item: CommandAction) => (
                    <CommandItem
                      key={item.label}
                      onClick={() => setAction(item.label)}
                      value={item}
                    >
                      <item.icon aria-hidden="true" />
                      {item.label}
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
            )}
          </CommandList>
        </CommandContent>
      </Command>
      <output className="min-h-5 text-center text-xs text-muted-foreground">
        {action && `Selected ${action}`}
      </output>
    </div>
  );
}
