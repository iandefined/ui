import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

const months = ["January", "February", "March", "April", "May", "June"];

export default function ScrollAreaHorizontalShadowDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea
        className="h-48 w-80"
        orientation="horizontal"
        scrollShadow="horizontal"
      >
        <ScrollAreaContent className="flex h-full w-max gap-3 p-4">
          {months.map((month, index) => (
            <div className="w-40 shrink-0 rounded-md border p-3" key={month}>
              <p className="font-medium text-sm">{month}</p>
              <p className="text-muted-foreground mt-6 text-xs">
                {12 + index * 3} tasks planned
              </p>
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
