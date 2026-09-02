"use client";

import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
} from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const plans = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Business", value: "business" },
];

export default function FieldWithRadioGroupDemo() {
  const [value, setValue] = useState("pro");

  return (
    <Field className="w-full max-w-sm" name="plan">
      <Fieldset>
        <FieldsetLegend>Plan</FieldsetLegend>
        <RadioGroup value={value} onValueChange={setValue}>
          {plans.map((plan) => (
            <FieldItem key={plan.value}>
              <FieldLabel className="cursor-pointer">
                <Radio value={plan.value} />
                {plan.label}
              </FieldLabel>
            </FieldItem>
          ))}
        </RadioGroup>
      </Fieldset>
      <FieldDescription className="mt-4">
        You can change plans at any time.
      </FieldDescription>
    </Field>
  );
}
