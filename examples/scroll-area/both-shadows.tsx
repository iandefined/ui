import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

const shortcuts = [
  "Command palette",
  "Toggle sidebar",
  "Search docs",
  "Open settings",
  "New project",
  "Invite member",
  "Copy link",
  "Switch theme",
  "Open terminal",
  "View activity",
  "Send feedback",
  "Sign out",
];

export default function ScrollAreaBothShadowsDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-64 w-80" orientation="both" scrollShadow="both">
        <ScrollAreaContent className="grid w-max grid-cols-3 gap-3 p-4">
          {shortcuts.map((shortcut, index) => (
            <div
              className="flex h-24 w-40 flex-col justify-between rounded-md border p-3"
              key={shortcut}
            >
              <p className="font-medium text-sm">{shortcut}</p>
              <kbd className="text-muted-foreground text-xs">⌘ {index + 1}</kbd>
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
