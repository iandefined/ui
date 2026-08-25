"use client";

import { useState } from "react";

import { Textarea } from "@/registry/base/textarea";

export default function TextareaControlledDemo() {
  const [value, setValue] = useState("Type your message here");

  return (
    <div className="flex w-80 flex-col gap-2">
      <Textarea
        aria-label="Message"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <span className="px-1 text-sm text-muted-foreground">Value: {value}</span>
    </div>
  );
}
