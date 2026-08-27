"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { TextMorph } from "@/registry/base/text-morph";

export default function TextMorphVariantsDemo() {
  const [count, setCount] = useState(128);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-baseline gap-6 text-2xl font-medium tabular-nums">
        <TextMorph variant="number">{count}</TextMorph>
        <TextMorph variant="slots">{count}</TextMorph>
      </div>
      <Button onClick={() => setCount((value) => value + 37)} variant="outline">
        Add 37
      </Button>
    </div>
  );
}
