import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";

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

const food = [
  { value: "pizza", label: "Pizza 🍕" },
  { value: "burger", label: "Burger 🍔" },
  { value: "ramen", label: "Ramen 🍜" },
];

const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];

export default function SelectBasicDemo() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Select items={food}>
        <SelectTrigger aria-label="Select a food">
          <SelectValue placeholder="Select a food" />
          <SelectIcon>
            <ChevronDownIcon className="size-4" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger>
          <SelectList>
            {food.map(({ label, value }) => (
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

      <Select items={fonts}>
        <SelectTrigger aria-label="Select a font">
          <SelectValue placeholder="Select a font" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-4" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {fonts.map(({ label, value }) => (
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
    </div>
  );
}
