"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderDemo() {
  const [value, setValue] = useState(2);

  return (
    <Slider
      className="w-full max-w-sm"
      max={4}
      min={0}
      value={value}
      onValueChange={(nextValue) => setValue(nextValue as number)}
    >
      <SliderControl>
        <SliderContent>
          <SliderLabel>Roundness</SliderLabel>
          <SliderValue className="ms-auto" />
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
