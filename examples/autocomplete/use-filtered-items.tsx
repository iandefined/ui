import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
  useAutocompleteFilteredItems,
} from "@/registry/base/autocomplete";
import { Kbd } from "@/registry/base/kbd";
import { Label } from "@/registry/base/label";

interface Command {
  id: string;
  name: string;
  shortcut?: string;
  section: string;
}

const commands: Command[] = [
  { id: "c1", name: "Create new file", shortcut: "Ctrl+N", section: "File" },
  {
    id: "c2",
    name: "Open existing project",
    shortcut: "Ctrl+O",
    section: "File",
  },
  { id: "c3", name: "Save all changes", shortcut: "Ctrl+S", section: "File" },
  {
    id: "c4",
    name: "Find in workspace",
    shortcut: "Ctrl+Shift+F",
    section: "Search",
  },
  {
    id: "c5",
    name: "Replace in files",
    shortcut: "Ctrl+Shift+H",
    section: "Search",
  },
  {
    id: "c6",
    name: "Format document",
    shortcut: "Shift+Alt+F",
    section: "Editor",
  },
  {
    id: "c7",
    name: "Toggle terminal panel",
    shortcut: "Ctrl+`",
    section: "View",
  },
  {
    id: "c8",
    name: "Open settings",
    shortcut: "Ctrl+,",
    section: "Preferences",
  },
  {
    id: "c9",
    name: "Keyboard shortcuts",
    shortcut: "Ctrl+K Ctrl+S",
    section: "Preferences",
  },
  { id: "c10", name: "Run test suite", shortcut: "Ctrl+T", section: "Debug" },
  {
    id: "c11",
    name: "Start debugging session",
    shortcut: "F5",
    section: "Debug",
  },
  {
    id: "c12",
    name: "Git commit staged changes",
    shortcut: "Ctrl+Enter",
    section: "Source Control",
  },
];

function FilteredCountSummary({ total }: { total: number }) {
  const filteredItems = useAutocompleteFilteredItems<Command>();

  return (
    <div className="flex items-center justify-between border-t border-border/50 px-3 py-2 text-xs text-muted-foreground">
      <span>
        {filteredItems.length === 0
          ? "No commands found"
          : `Showing ${filteredItems.length} of ${total} commands`}
      </span>
      <span className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
        {filteredItems.length}
      </span>
    </div>
  );
}

export default function AutocompleteUseFilteredItemsDemo() {
  return (
    <AutocompleteRoot
      items={commands}
      itemToStringValue={(item: Command) => item.name}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="quick-commands">Quick commands</Label>
        <AutocompleteInput
          id="quick-commands"
          placeholder="Type to search actions..."
          showClear
          showTrigger
        />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>No matching actions.</AutocompleteEmpty>
            <AutocompleteList>
              {(command: Command) => (
                <AutocompleteItem key={command.id} value={command}>
                  <div className="flex w-full items-center justify-between">
                    <span>{command.name}</span>
                    {command.shortcut && <Kbd>{command.shortcut}</Kbd>}
                  </div>
                </AutocompleteItem>
              )}
            </AutocompleteList>
            <FilteredCountSummary total={commands.length} />
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
