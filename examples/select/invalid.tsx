"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Field } from "@/registry/base/field";
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

const frameworks = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

export default function SelectInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Field className="w-full" invalid={invalid}>
        <Select items={frameworks}>
          <SelectTrigger aria-label="Select a framework" className="w-full">
            <SelectValue placeholder="Select a framework" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPopup>
            <SelectList>
              {frameworks.map((framework) => (
                <SelectItem key={framework.value} value={framework.value}>
                  <SelectItemText>{framework.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </Select>
      </Field>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
