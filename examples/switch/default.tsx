"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      aria-label="Enable notifications"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
