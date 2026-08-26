import { Checkbox } from "@/registry/base/checkbox";
import { Label } from "@/registry/base/label";

export default function LabelWithCheckboxDemo() {
  return (
    <Label className="cursor-pointer">
      <Checkbox />
      Accept terms and conditions
    </Label>
  );
}
