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

const countries = [
  {
    label: "Argentina",
    value: "argentina",
    flag: "https://flagcdn.com/ar.svg",
  },
  {
    label: "Venezuela",
    value: "venezuela",
    flag: "https://flagcdn.com/ve.svg",
  },
  { label: "Brazil", value: "brazil", flag: "https://flagcdn.com/br.svg" },
  {
    label: "Switzerland",
    value: "switzerland",
    flag: "https://flagcdn.com/ch.svg",
  },
  { label: "Germany", value: "germany", flag: "https://flagcdn.com/de.svg" },
  { label: "Spain", value: "spain", flag: "https://flagcdn.com/es.svg" },
  { label: "France", value: "france", flag: "https://flagcdn.com/fr.svg" },
  { label: "Italy", value: "italy", flag: "https://flagcdn.com/it.svg" },
  { label: "Mexico", value: "mexico", flag: "https://flagcdn.com/mx.svg" },
];

export default function SelectCountryDemo() {
  return (
    <Select items={countries}>
      <SelectTrigger className="min-w-46" aria-label="Select a country">
        <SelectValue placeholder="Select a country" />
        <SelectIcon>
          <PlusIcon className="size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {countries.map(({ label, value, flag }) => (
            <SelectItem key={value} value={value} className="h-fit">
              <img
                src={flag}
                alt=""
                className="size-5.5 rounded-full object-cover"
              />
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
