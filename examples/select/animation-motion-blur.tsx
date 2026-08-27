import { CheckCheck } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];

const sides = [
  "right",
  "top",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

const alignments = ["start", "center", "end"] as const;

export default function SelectAnimationMotionBlurDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {sides.map((side) => (
        <div
          className="flex flex-col gap-1 border-border/40 border-b pb-5 last:border-b-0 last:pb-0"
          key={side}
        >
          <p>
            Side:{" "}
            <span className="text-muted-foreground capitalize">{side}</span>
          </p>
          <div className="flex flex-wrap gap-4">
            {alignments.map((alignment) => (
              <Select key={`${side}-${alignment}`} items={fonts}>
                <SelectTrigger
                  className="h-7 w-fit"
                  aria-label={`${side} ${alignment} select`}
                >
                  <SelectIcon>
                    <CheckCheck className="size-3.5 text-secondary-foreground" />
                  </SelectIcon>
                  <SelectValue placeholder={alignment} className="capitalize" />
                </SelectTrigger>
                <SelectPopup
                  side={side}
                  align={alignment}
                  animationPreset="motionBlur"
                  className="min-w-45"
                >
                  <SelectList>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <SelectItemText>{font.label}</SelectItemText>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
