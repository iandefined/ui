"use client";

import { useState } from "react";

import { Field, FieldDescription, FieldLabel } from "@/registry/base/field";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

export default function SegmentedControlWithFieldDemo() {
  const [value, setValue] = useState("m");

  return (
    <Field className="w-full max-w-sm" name="shirtSize">
      <FieldLabel>Shirt size</FieldLabel>
      <SegmentedControl
        aria-label="Shirt size"
        className="w-full"
        name="shirtSize"
        onValueChange={setValue}
        value={value}
      >
        <SegmentedControlItem className="flex-1" value="s">
          S
        </SegmentedControlItem>
        <SegmentedControlItem className="flex-1" value="m">
          M
        </SegmentedControlItem>
        <SegmentedControlItem className="flex-1" value="l">
          L
        </SegmentedControlItem>
      </SegmentedControl>
      <FieldDescription>Choose the size that fits you best.</FieldDescription>
    </Field>
  );
}
