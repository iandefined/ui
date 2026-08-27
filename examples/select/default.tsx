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

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "PHP", value: "php" },
  { label: "C++", value: "cpp" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Swift", value: "swift" },
];

export default function SelectDefaultDemo() {
  return (
    <Select items={languages}>
      <SelectTrigger className="min-w-46" aria-label="Select a language">
        <SelectValue placeholder="Select a language" />
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {languages.map(({ label, value }) => (
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
