import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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

const options = [
  { label: "Available", value: "available" },
  { label: "Temporarily unavailable", value: "unavailable", disabled: true },
  { label: "Coming soon", value: "soon", disabled: true },
];

export default function SelectDisabledDemo() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Select items={options} disabled>
        <SelectTrigger className="min-w-52" aria-label="Disabled select">
          <SelectValue placeholder="Disabled select" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-3.5" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {options.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <SelectItemText>{label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>

      <Select items={options} defaultValue="available">
        <SelectTrigger className="min-w-52" aria-label="Select availability">
          <SelectValue placeholder="Select availability" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-3.5" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {options.map(({ label, value, disabled }) => (
              <SelectItem key={value} value={value} disabled={disabled}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon className="size-3" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
    </div>
  );
}
