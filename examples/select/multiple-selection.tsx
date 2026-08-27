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

const languages = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  csharp: "C#",
  php: "PHP",
  cpp: "C++",
  rust: "Rust",
  go: "Go",
  swift: "Swift",
};

type Language = keyof typeof languages;

const values = Object.keys(languages) as Language[];

function renderValue(value: Language[]) {
  if (value.length === 0) {
    return "Select languages...";
  }

  const firstLanguage = languages[value[0]];
  const additionalLanguages =
    value.length > 1 ? ` (+${value.length - 1} more)` : "";
  return firstLanguage + additionalLanguages;
}

export default function SelectMultipleSelectionDemo() {
  return (
    <Select multiple defaultValue={["javascript", "typescript"]}>
      <SelectTrigger
        className="h-fit min-w-66"
        aria-label="Select programming languages"
      >
        <SelectValue>{renderValue}</SelectValue>
        <SelectIcon className="flex items-center self-center">
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              <SelectItemIndicator className="self-start">
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
              <SelectItemText className="flex flex-col items-start gap-0.5">
                <span className="text-sm leading-6">{languages[value]}</span>
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
