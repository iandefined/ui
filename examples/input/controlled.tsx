"use client";

import { useState } from "react";

import { Input } from "@/registry/base/input";
import { TextMorph } from "@/registry/base/text-morph";

export default function InputControlledDemo() {
  const [value, setValue] = useState("base-ui.com");

  return (
    <div className="flex w-80 flex-col gap-2">
      <Input
        aria-label="Domain"
        onValueChange={setValue}
        placeholder="domain"
        value={value}
      />
      <span className="inline-flex w-fit px-1 text-sm text-muted-foreground">
        https://
        <TextMorph>{value || "your-domain"}</TextMorph>
      </span>
    </div>
  );
}
