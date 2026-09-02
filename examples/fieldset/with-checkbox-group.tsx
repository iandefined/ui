"use client";

import { useState } from "react";

import { Checkbox } from "@/registry/base/checkbox";
import { Field, FieldItem, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";

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
    <Field className="w-full max-w-sm" name="notifications">
      <Fieldset>
        <FieldsetLegend>Notifications</FieldsetLegend>
        {notifications.map((notification) => {
          const checked = value.includes(notification.value);

          return (
            <FieldItem key={notification.value}>
              <FieldLabel className="cursor-pointer items-start">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(nextChecked) => {
                    setValue((currentValue) =>
                      nextChecked
                        ? [...currentValue, notification.value]
                        : currentValue.filter(
                            (item) => item !== notification.value
                          )
                    );
                  }}
                />
                <span className="grid gap-1">
                  <span>{notification.label}</span>
                  <span className="text-xs/4 font-normal text-muted-foreground">
                    {notification.description}
                  </span>
                </span>
              </FieldLabel>
            </FieldItem>
          );
        })}
      </Fieldset>
    </Field>
  );
}
