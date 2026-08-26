import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

const colors = [
  "Sky",
  "Violet",
  "Rose",
  "Amber",
  "Emerald",
  "Cyan",
  "Indigo",
  "Orange",
  "Lime",
  "Fuchsia",
  "Teal",
  "Red",
];

export default function ScrollAreaBothScrollDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-64 w-80" orientation="both">
        <ScrollAreaContent className="grid w-max grid-cols-4 gap-3 p-4">
          {colors.map((color) => (
            <div
              className="flex h-24 w-36 items-end rounded-md border bg-muted/40 p-3 font-medium text-sm"
              key={color}
            >
              {color}
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
