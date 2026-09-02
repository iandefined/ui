"use client";

import { useState } from "react";

import { Checkbox } from "@/registry/base/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/registry/base/field";
import { Switch } from "@/registry/base/switch";

export default function FieldWithCheckboxAndSwitchDemo() {
  const [accepted, setAccepted] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field name="terms">
        <FieldLabel className="items-start">
          <Checkbox checked={accepted} onCheckedChange={setAccepted} />
          <span>I accept the terms and privacy policy.</span>
        </FieldLabel>
      </Field>

      <Field name="notifications">
        <FieldLabel className="justify-between">
          Product notifications
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </FieldLabel>
        <FieldDescription>
          Receive occasional updates about new features.
        </FieldDescription>
      </Field>
    </div>
  );
}
