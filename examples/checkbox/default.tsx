import { Checkbox } from "@/registry/base/checkbox";
import { Label } from "@/registry/base/label";

export default function CheckboxDemo() {
  return (
    <Label
      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
      htmlFor="terms"
    >
      <Checkbox id="terms" />
      Accept terms and conditions
    </Label>
  );
}
