"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";
import { Field } from "@/registry/base/field";

const fruits = ["Apple", "Banana", "Cherry", "Orange"];

export default function ComboboxInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Field className="w-full" invalid={invalid}>
        <Combobox items={fruits}>
          <ComboboxInput
            aria-label="Select a fruit"
            className="w-full"
            placeholder="Select a fruit..."
          />
          <ComboboxPopup>
            <ComboboxList>
              {(fruit: string) => (
                <ComboboxItem key={fruit} value={fruit}>
                  {fruit}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
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
