"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchSizesDemo() {
  const [smallChecked, setSmallChecked] = useState(true);
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [largeChecked, setLargeChecked] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Switch
        aria-label="Small switch"
        checked={smallChecked}
        size="sm"
        onCheckedChange={setSmallChecked}
      />
      <Switch
        aria-label="Default switch"
        checked={defaultChecked}
        onCheckedChange={setDefaultChecked}
      />
      <Switch
        aria-label="Large switch"
        checked={largeChecked}
        size="lg"
        onCheckedChange={setLargeChecked}
      />
    </div>
  );
}
