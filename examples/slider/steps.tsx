"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderStepsDemo() {
  const [compactValue, setCompactValue] = useState(2);
  const [defaultValue, setDefaultValue] = useState(1);

  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider
        max={4}
        showSteps
        value={compactValue}
        variant="compact"
        onValueChange={(nextValue) => setCompactValue(nextValue as number)}
      >
        <SliderControl />
        <div className="mt-2 flex items-center gap-1">
          <SliderLabel>Rating:</SliderLabel>
          <SliderValue editable={false} />
          <span aria-hidden="true">/ 4</span>
        </div>
      </Slider>

      <Slider
        max={4}
        showSteps
        value={defaultValue}
        onValueChange={(nextValue) => setDefaultValue(nextValue as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>Roundness</SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>
    </div>
  );
}
