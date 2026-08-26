import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

const activity = [
  "Published the new component registry.",
  "Reviewed accessibility labels.",
  "Updated the color tokens.",
  "Added responsive navigation.",
  "Resolved the latest feedback.",
  "Prepared the release notes.",
  "Synced the design files.",
  "Scheduled the next review.",
];

export default function ScrollAreaVerticalShadowDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-64 w-80" scrollShadow="vertical">
        <ScrollAreaContent className="space-y-3 p-4">
          {activity.map((item, index) => (
            <div className="rounded-md border p-3 text-sm" key={item}>
              <p>{item}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {index + 1} hour{index === 0 ? "" : "s"} ago
              </p>
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
