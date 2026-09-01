"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderVariantsDemo() {
  const [compactValue, setCompactValue] = useState(36);
  const [defaultValue, setDefaultValue] = useState(2);

  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider
        formatValue={(nextValue) => `${nextValue}%`}
        value={compactValue}
        variant="compact"
        onValueChange={(nextValue) => setCompactValue(nextValue as number)}
      >
        <SliderControl />
        <div className="mt-2 flex items-center justify-between px-1.75">
          <SliderLabel>Compact</SliderLabel>
          <SliderValue />
        </div>
      </Slider>
      <Slider
        max={4}
        value={defaultValue}
        onValueChange={(nextValue) => setDefaultValue(nextValue as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>Default</SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>
    </div>
  );
}
