"use client";

import { useState } from "react";

import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupControlledDemo() {
  const [value, setValue] = useState("virat");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="text-sm font-medium">
          Choose your favorite cricket player
        </div>
        <Label>
          <Radio value="virat" /> Virat Kohli
        </Label>
        <Label>
          <Radio value="rohit" /> Rohit Sharma
        </Label>
        <Label>
          <Radio value="sachin" /> Sachin Tendulkar
        </Label>
        <Label>
          <Radio value="dhoni" /> MS Dhoni
        </Label>
      </RadioGroup>

      <span className="px-1 text-sm text-muted-foreground">
        Selected Value: {value}
      </span>
    </div>
  );
}
