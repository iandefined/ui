import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const frameworks = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

export default function SelectControlledDemo() {
  const [value, setValue] = useState<string | null>("next");

  return (
    <div className="flex flex-col gap-3">
      <Select
        items={frameworks}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue as string | null)}
      >
        <SelectTrigger className="min-w-46" aria-label="Select a framework">
          <SelectValue placeholder="Select a framework" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-3.5" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {frameworks.map(({ label, value: optionValue }) => (
              <SelectItem key={optionValue} value={optionValue}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon className="size-3" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
      <output className="text-sm text-muted-foreground" aria-live="polite">
        Current value: {value ?? "none"}
      </output>
    </div>
  );
}
