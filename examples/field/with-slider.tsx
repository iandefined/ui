"use client";

import { useState } from "react";

import { Field, FieldDescription } from "@/registry/base/field";
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function FieldWithSliderDemo() {
  const [value, setValue] = useState(65);

  return (
    <Field className="w-full max-w-sm" name="volume">
      <Slider
        formatValue={(currentValue) => `${currentValue}%`}
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
      <FieldDescription>Adjust the output volume level.</FieldDescription>
    </Field>
  );
}
