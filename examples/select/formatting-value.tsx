import { CheckIcon, PlusIcon } from "lucide-react";

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

const themes = [
  { value: "system", label: "System default" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function ThemeSelect({ useItems }: { useItems: boolean }) {
  return (
    <Select {...(useItems ? { items: themes } : {})}>
      <SelectTrigger className="min-w-46" aria-label="Select a theme">
        <SelectValue placeholder="Select a theme" />
        <SelectIcon>
          <PlusIcon className="size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {themes.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}

export default function SelectFormattingValueDemo() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-col gap-2">
        <p className="text-sm">Raw value</p>
        <ThemeSelect useItems={false} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Formatted value</p>
        <ThemeSelect useItems />
      </div>
    </div>
  );
}
