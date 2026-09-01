"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

const qualityLabels = ["Low", "Medium", "High"];

export default function SliderFormattingDemo() {
  const [value, setValue] = useState(1);

  return (
    <Slider
      className="w-full max-w-sm"
      formatValue={(nextValue) => qualityLabels[nextValue] ?? String(nextValue)}
      max={2}
      value={value}
      onValueChange={(nextValue) => setValue(nextValue as number)}
    >
      <SliderControl>
        <SliderContent>
          <SliderLabel>Quality</SliderLabel>
          <SliderValue className="ms-auto" editable={false}>
            {(formattedValues) => (
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-current opacity-40" />
                {formattedValues[0]}
              </span>
            )}
          </SliderValue>
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
