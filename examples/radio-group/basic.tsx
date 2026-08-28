import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupBasicDemo() {
  return (
    <RadioGroup defaultValue="light">
      <Label>
        <Radio value="light" /> Light Theme
      </Label>
      <Label>
        <Radio value="dark" /> Dark Theme
      </Label>
      <Label>
        <Radio value="system" /> System Default
      </Label>
    </RadioGroup>
  );
}
