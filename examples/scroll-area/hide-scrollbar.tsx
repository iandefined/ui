import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

const items = Array.from(
  { length: 24 },
  (_, index) => `Scrollbar item ${index + 1}`
);

export default function ScrollAreaHideScrollbarDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-64 w-80" hideScrollbar scrollShadow="vertical">
        <ScrollAreaContent className="p-4">
          <div className="space-y-3 pb-4">
            {items.map((item) => (
              <p className="text-sm" key={item}>
                {item}
              </p>
            ))}
          </div>
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
