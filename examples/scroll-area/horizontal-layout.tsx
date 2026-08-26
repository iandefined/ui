import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

const projects = [
  ["Website refresh", "In review"],
  ["Mobile navigation", "In progress"],
  ["Design tokens", "Ready"],
  ["Analytics dashboard", "Planned"],
];

export default function ScrollAreaHorizontalLayoutDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-52 w-80" orientation="horizontal">
        <ScrollAreaContent className="flex h-full w-max gap-3 p-4">
          {projects.map(([name, status]) => (
            <div className="w-44 shrink-0 rounded-md border p-3" key={name}>
              <p className="font-medium text-sm">{name}</p>
              <p className="text-muted-foreground mt-1 text-xs">{status}</p>
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
