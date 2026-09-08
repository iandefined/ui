"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Field } from "@/registry/base/field";
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderInvalidDemo() {
  const [invalid, setInvalid] = useState(false);
  const [value, setValue] = useState(50);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Field className="w-full" invalid={invalid}>
        <Slider
          value={value}
          onValueChange={(nextValue) => setValue(nextValue as number)}
        >
          <SliderControl>
            <SliderContent>
              <SliderLabel>Volume</SliderLabel>
              <SliderValue className="ms-auto" />
            </SliderContent>
          </SliderControl>
        </Slider>
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
