import { Button } from "@/registry/base/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@/registry/base/popover";

const offsets = [4, 16, -16] as const;

export default function PopoverOffsetDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {offsets.map((offset) => (
        <Popover key={offset}>
          <PopoverTrigger render={<Button size="sm" variant="outline" />}>
            {offset === 4 ? "Default offset (4)" : `${offset} offset`}
          </PopoverTrigger>
          <PopoverPopup sideOffset={offset}>Popover content</PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
