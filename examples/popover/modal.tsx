import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

const modes = [
  {
    label: "Non-modal",
    value: false,
    description:
      "Focus and pointer interaction can move between the popover and the page.",
  },
  {
    label: "Trap keyboard focus",
    value: "trap-focus",
    description:
      "Keyboard focus stays here, but you can still interact with the page.",
  },
  {
    label: "Block page interaction",
    value: true,
    description:
      "Focus stays here and the rest of the page cannot be interacted with.",
  },
] as const;

export default function PopoverModalDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {modes.map((mode) => (
        <Popover key={mode.label} modal={mode.value}>
          <PopoverTrigger render={<Button variant="outline" />}>
            {mode.label}
          </PopoverTrigger>
          <PopoverPopup className="w-64">
            <PopoverTitle className="text-base">{mode.label}</PopoverTitle>
            <PopoverDescription className="mt-2">
              {mode.description}
            </PopoverDescription>
            <PopoverClose className="mt-4" render={<Button size="sm" />}>
              Close
            </PopoverClose>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
