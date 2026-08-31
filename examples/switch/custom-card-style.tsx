"use client";

import { useState } from "react";

import { Switch } from "@/registry/base/switch";

export default function SwitchCustomCardStyleDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-lg border p-3">
      <div className="space-y-1">
        <p className="text-sm font-medium">Weekly summary</p>
        <p className="text-sm text-muted-foreground">
          Receive a recap of your workspace activity.
        </p>
      </div>
      <Switch
        aria-label="Enable weekly summary"
        checked={checked}
        className="shrink-0"
        onCheckedChange={setChecked}
      />
    </div>
  );
}
