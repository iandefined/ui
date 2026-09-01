"use client";

import { useState } from "react";

import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderLayoutsDemo() {
  const [balance, setBalance] = useState(40);
  const [volume, setVolume] = useState(72);

  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider
        formatValue={(value) => `${value}%`}
        value={balance}
        onValueChange={(value) => setBalance(value as number)}
      >
        <SliderControl>
          <SliderContent>
            <SliderLabel>
              <span className="inline-flex items-center gap-2">
                <span>Balance</span>
                <span className="rounded bg-foreground/8 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                  L / R
                </span>
              </span>
            </SliderLabel>
            <SliderValue className="ms-auto" />
          </SliderContent>
        </SliderControl>
      </Slider>

      <Slider
        formatValue={(value) => `${value}%`}
        value={volume}
        variant="compact"
        onValueChange={(value) => setVolume(value as number)}
      >
        <div className="mb-2 grid grid-cols-[1fr_auto] items-end gap-x-4 px-1.75">
          <SliderLabel className="text-base text-foreground">
            Master volume
          </SliderLabel>
          <SliderValue className="row-span-2 text-base text-foreground" />
          <span className="text-xs text-muted-foreground">
            Applies to every output
          </span>
        </div>
        <SliderControl />
      </Slider>
    </div>
  );
}
