import { Checkbox } from "@/registry/base/checkbox";
import { Label } from "@/registry/base/label";

export default function CheckboxDisabledDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Label
        className="flex items-center gap-2 text-sm text-muted-foreground"
        htmlFor="disabled"
      >
        <Checkbox disabled id="disabled" />
        Disabled
      </Label>
      <Label
        className="flex items-center gap-2 text-sm text-muted-foreground"
        htmlFor="disabled-checked"
      >
        <Checkbox defaultChecked disabled id="disabled-checked" />
        Disabled and checked
      </Label>
    </div>
  );
}
