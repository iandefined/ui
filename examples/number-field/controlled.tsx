import { useState } from "react";

import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldControlledDemo() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <NumberField
        id="controlled"
        onValueChange={(nextValue) => setValue(nextValue ?? 0)}
        value={value}
      >
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="controlled">
            Controlled
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <span className="px-1 text-sm text-muted-foreground">Value: {value}</span>
    </div>
  );
}
