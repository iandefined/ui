import { useState } from "react";

import {
  Command,
  CommandCollection,
  CommandGroup,
  CommandHighlight,
  CommandInput,
  CommandItem,
  CommandList,
  useCommandFilter,
} from "@/registry/base/command";

const actions = [
  "Create project",
  "Find project",
  "Archive project",
  "Duplicate project",
  "Export project",
  "Rename project",
  "Share project",
  "Create workspace",
  "Find workspace",
  "Rename workspace",
];

export default function CommandManualFilterDemo() {
  const [query, setQuery] = useState("project");
  const [action, setAction] = useState<string>();
  const { endsWith } = useCommandFilter();
  const filteredItems = actions.filter((item) => endsWith(item, query.trim()));

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command
        className="max-h-56"
        filter={null}
        filteredItems={filteredItems}
        items={actions}
        onValueChange={setQuery}
        value={query}
      >
        <CommandInput
          aria-label="Find actions by suffix"
          placeholder="Search by suffix…"
        />
        <CommandList
          emptyMessage="No actions end with that text."
          hideScrollbar={false}
          nativeScroll
          scrollbarGutter
        >
          <CommandGroup>
            <CommandCollection>
              {(item: string) => (
                <CommandItem
                  key={item}
                  onClick={() => setAction(item)}
                  value={item}
                >
                  <CommandHighlight query={query} text={item} />
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        </CommandList>
      </Command>
      <output className="min-h-5 text-xs text-muted-foreground">
        {action && `Selected ${action}`}
      </output>
    </div>
  );
}
