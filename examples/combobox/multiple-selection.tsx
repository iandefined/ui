"use client";

import { useState } from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/registry/base/combobox";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Swift", value: "swift" },
];

type Language = (typeof languages)[number];

export default function ComboboxMultipleSelectionDemo() {
  const [selected, setSelected] = useState<Language[]>([
    languages[0],
    languages[1],
    languages[2],
    languages[3],
  ]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Combobox
        items={languages}
        multiple
        onValueChange={setSelected}
        value={selected}
      >
        <ComboboxChips>
          <ComboboxValue>
            {(value: Language[]) => (
              <>
                {value.map((language) => (
                  <ComboboxChip key={language.value}>
                    {language.label}
                  </ComboboxChip>
                ))}
                <ComboboxInput
                  aria-label="Select programming languages"
                  placeholder={value.length === 0 ? "Select languages..." : ""}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxPopup>
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList>
            {(language: Language) => (
              <ComboboxItem key={language.value} value={language}>
                {language.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      <p className="text-sm text-muted-foreground">
        {selected.length === 0
          ? "No languages selected"
          : `${selected.length} selected`}
      </p>
    </div>
  );
}
