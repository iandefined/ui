import { Label } from "@/registry/base/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/base/number-field";

export default function NumberFieldRangeDemo() {
  return (
    <div className="flex flex-col gap-5">
      <NumberField defaultValue={10} id="minimum" min={5}>
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="minimum">
            Minimum
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={10} id="maximum" max={25}>
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="maximum">
            Maximum
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={10} id="range" max={25} min={5}>
        <NumberFieldScrubArea>
          <Label className="cursor-ew-resize" htmlFor="range">
            Range
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
