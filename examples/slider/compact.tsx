"use client";

import { useState } from "react";

import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderCompactDemo() {
  const [brightness, setBrightness] = useState(70);
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <Slider
      className="w-full max-w-sm"
      formatValue={formatPercentage}
      value={brightness}
      variant="compact"
      onValueChange={(nextValue) => setBrightness(nextValue as number)}
    >
      <SliderControl />
      <div className="mt-2 flex items-center justify-between">
        <SliderLabel>Brightness</SliderLabel>
        <SliderValue />
      </div>
    </Slider>
  );
}
