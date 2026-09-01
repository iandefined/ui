"use client";

import { useState } from "react";

import { Checkbox } from "@/registry/base/checkbox";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Label } from "@/registry/base/label";

const notifications = [
  {
    description: "A summary of activity and account changes.",
    label: "Email",
    value: "email",
  },
  {
    description: "Time-sensitive alerts sent to your phone.",
    label: "Text messages",
    value: "sms",
  },
  {
    description: "Updates shown while you are using the app.",
    label: "In-app",
    value: "in-app",
  },
];

export default function FieldsetWithCheckboxGroupDemo() {
  const [value, setValue] = useState(["email", "in-app"]);

  return (
    <Fieldset className="w-full max-w-sm">
      <FieldsetLegend>Notifications</FieldsetLegend>
      {notifications.map((notification) => {
        const checked = value.includes(notification.value);

        return (
          <Label
            className="cursor-pointer items-start gap-3"
            htmlFor={`notification-${notification.value}`}
            key={notification.value}
          >
            <Checkbox
              checked={checked}
              id={`notification-${notification.value}`}
              onCheckedChange={(nextChecked) => {
                setValue((currentValue) =>
                  nextChecked
                    ? [...currentValue, notification.value]
                    : currentValue.filter((item) => item !== notification.value)
                );
              }}
            />
            <span className="grid gap-1">
              <span className="font-medium">{notification.label}</span>
              <span className="text-xs/4 text-muted-foreground">
                {notification.description}
              </span>
            </span>
          </Label>
        );
      })}
    </Fieldset>
  );
}
