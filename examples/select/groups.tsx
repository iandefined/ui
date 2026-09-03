import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Fragment } from "react";

import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const groupedItems = [
  {
    value: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "mango", label: "Mango" },
      { value: "kiwi", label: "Kiwi" },
    ],
  },
  {
    value: "Vegetables",
    items: [
      { value: "broccoli", label: "Broccoli" },
      { value: "carrot", label: "Carrot" },
      { value: "cucumber", label: "Cucumber" },
      { value: "spinach", label: "Spinach" },
    ],
  },
];

export default function SelectGroupsDemo() {
  return (
    <Select items={groupedItems}>
      <SelectTrigger className="min-w-46" aria-label="Select produce">
        <SelectValue placeholder="Select produce" />
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {groupedItems.map((group, index) => (
            <Fragment key={group.value}>
              <SelectGroup>
                <SelectGroupLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                  {group.value}
                </SelectGroupLabel>
                {group.items.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <SelectItemText>{label}</SelectItemText>
                    <SelectItemIndicator>
                      <CheckIcon className="size-3" />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectGroup>
              {index < groupedItems.length - 1 && <SelectSeparator />}
            </Fragment>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
