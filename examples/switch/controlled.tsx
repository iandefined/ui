"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchControlledDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Switch
        aria-label="Enable dark mode"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <p className="text-sm text-muted-foreground">
        Dark mode is {checked ? "enabled" : "disabled"}.
      </p>
    </div>
  );
}
