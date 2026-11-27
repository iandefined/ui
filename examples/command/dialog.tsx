import { FileTextIcon, HistoryIcon, LayoutGridIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/registry/base/button";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/base/command";
import { Kbd } from "@/registry/base/kbd";

const actions = [
  { label: "Documents", icon: FileTextIcon },
  { label: "Projects", icon: LayoutGridIcon },
  { label: "Recent activity", icon: HistoryIcon },
];

export default function CommandDialogDemo() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<string>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useHotkeys("ctrl+l", () => setOpen(true), { preventDefault: true });

  return (
    <div className="grid justify-items-center gap-2">
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogTrigger
          ref={triggerRef}
          render={<Button variant="outline" />}
        >
          Open workspace commands
        </CommandDialogTrigger>
        <CommandDialogPopup
          description="Search for a workspace view to open."
          finalFocus={triggerRef}
          title="Workspace commands"
        >
          <Command items={actions}>
            <CommandContent>
              <CommandInput
                aria-label="Search workspace commands"
                placeholder="Search workspace…"
              />
              <CommandList>
                <CommandGroup>
                  <CommandCollection>
                    {(item: (typeof actions)[number]) => (
                      <CommandItem
                        key={item.label}
                        onClick={() => {
                          setAction(item.label);
                          setOpen(false);
                        }}
                        value={item}
                      >
                        <item.icon aria-hidden="true" />
                        {item.label}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              </CommandList>
            </CommandContent>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
      <span className="text-xs text-muted-foreground">
        Press <Kbd>Ctrl</Kbd> <Kbd>L</Kbd>
      </span>
      <output className="min-h-5 text-xs text-muted-foreground">
        {action && `Opened ${action}`}
      </output>
    </div>
  );
}
