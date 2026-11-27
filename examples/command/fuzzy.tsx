import { useState } from "react";

import {
  Command,
  CommandCollection,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/base/command";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

const actions = [
  { label: "Invite member", keywords: "add person team" },
  { label: "Change theme", keywords: "dark light appearance" },
  { label: "View invoices", keywords: "payments receipts billing" },
  { label: "Update profile", keywords: "account name avatar" },
];

type CommandAction = (typeof actions)[number];

export default function CommandFuzzyDemo() {
  const { filterItem } = useFuzzyFilter<CommandAction>({
    keys: ["label", "keywords"],
  });
  const [action, setAction] = useState<string>();

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command filter={filterItem} items={actions}>
        <CommandInput
          aria-label="Find account actions"
          placeholder="Try “billing” or “thme”…"
        />
        <CommandList>
          <CommandGroup>
            <CommandCollection>
              {(item: CommandAction) => (
                <CommandItem
                  key={item.label}
                  onClick={() => setAction(item.label)}
                  value={item}
                >
                  {item.label}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        </CommandList>
      </Command>
      <output className="min-h-5 text-center text-xs text-muted-foreground">
        {action && `Selected ${action}`}
      </output>
    </div>
  );
}
