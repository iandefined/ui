"use client";

import { useState } from "react";

import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderValue,
  type SliderValueType,
} from "@/registry/base/slider";

export default function SliderRangeDemo() {
  const [value, setValue] = useState<[number, number]>([5, 10]);

  return (
    <Slider
      className="w-full max-w-sm"
      formatValue={(nextValue) => `${nextValue}%`}
      value={value}
      variant="compact"
      onValueChange={(nextValue: SliderValueType) =>
        setValue(nextValue as [number, number])
      }
    >
      <div className="mb-2 flex items-center justify-between gap-4 px-1.75">
        <SliderLabel>Price range</SliderLabel>
        <SliderValue editable={false}>
          {(formattedValues) => `Range: ${formattedValues.join(" - ")}`}
        </SliderValue>
      </div>
      <SliderControl />
    </Slider>
  );
}
