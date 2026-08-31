"use client";

import { useState } from "react";

import { Label } from "@/registry/base/label";
import { Switch } from "@/registry/base/switch";

export default function SwitchWithLabelDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Label
      className="flex items-center gap-3 cursor-pointer select-none"
      htmlFor="email-notifications"
    >
      <Switch
        checked={checked}
        id="email-notifications"
        onCheckedChange={setChecked}
      />
      Email notifications
    </Label>
  );
}
