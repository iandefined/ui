import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldFormattingDemo() {
  return (
    <NumberField
      defaultValue={0}
      format={{ currency: "USD", style: "currency" }}
      id="price"
      min={0}
    >
      <NumberFieldScrubArea>
        <Label className="cursor-ew-resize" htmlFor="price">
          Price
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
