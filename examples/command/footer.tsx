import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarDaysIcon,
  CornerDownLeftIcon,
  InboxIcon,
  NotebookPenIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/registry/base/command";
import { Kbd, KbdGroup } from "@/registry/base/kbd";

const views = [
  { label: "Inbox", icon: InboxIcon },
  { label: "Calendar", icon: CalendarDaysIcon },
  { label: "Notes", icon: NotebookPenIcon },
];

export default function CommandFooterDemo() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<string>();

  return (
    <div className="grid justify-items-center gap-2">
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogTrigger render={<Button variant="outline" />}>
          Switch view
        </CommandDialogTrigger>
        <CommandDialogPopup title="Switch view">
          <Command items={views}>
            <CommandContent>
              <CommandInput
                aria-label="Find a view"
                placeholder="Find a view…"
              />
              <CommandList>
                <CommandGroup>
                  <CommandGroupLabel>Views</CommandGroupLabel>
                  <CommandCollection>
                    {(item: (typeof views)[number]) => (
                      <CommandItem
                        key={item.label}
                        onClick={() => {
                          setView(item.label);
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
            <CommandFooter>
              <span className="inline-flex items-center gap-2">
                <KbdGroup aria-label="Up or down arrow">
                  <Kbd>
                    <ArrowUpIcon aria-hidden="true" />
                  </Kbd>
                  <Kbd>
                    <ArrowDownIcon aria-hidden="true" />
                  </Kbd>
                </KbdGroup>
                Navigate
              </span>
              <span className="inline-flex items-center gap-2">
                <Kbd aria-label="Enter">
                  <CornerDownLeftIcon aria-hidden="true" />
                </Kbd>
                Open
              </span>
              <span className="ms-auto inline-flex items-center gap-2">
                <CommandShortcut>Esc</CommandShortcut>
                Close
              </span>
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
      <output className="min-h-5 text-xs text-muted-foreground">
        {view && `Opened ${view}`}
      </output>
    </div>
  );
}
