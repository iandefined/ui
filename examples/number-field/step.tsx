import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldStepDemo() {
  return (
    <NumberField defaultValue={0} id="step-20" step={20}>
      <NumberFieldScrubArea>
        <Label className="cursor-ew-resize" htmlFor="step-20">
          Step 20
        </Label>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
