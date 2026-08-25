import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxDemo() {
  return (
    <label
      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
      htmlFor="terms"
    >
      <Checkbox id="terms" />
      Accept terms and conditions
    </label>
  );
}
