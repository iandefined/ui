import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

const sides = [
  "top",
  "right",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

export default function PopoverSidesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            <span>{side}</span>
          </PopoverTrigger>
          <PopoverPopup showArrow side={side} sideOffset={8} className="w-56">
            <PopoverTitle className="text-base">{side}</PopoverTitle>
            <PopoverDescription className="mt-2">
              This popover is positioned on the {side} side.
            </PopoverDescription>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
