import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxDisabledDemo() {
  return (
    <div className="flex flex-col gap-3">
      <label
        className="flex items-center gap-2 text-sm text-muted-foreground"
        htmlFor="disabled"
      >
        <Checkbox disabled id="disabled" />
        Disabled
      </label>
      <label
        className="flex items-center gap-2 text-sm text-muted-foreground"
        htmlFor="disabled-checked"
      >
        <Checkbox defaultChecked disabled id="disabled-checked" />
        Disabled and checked
      </label>
    </div>
  );
}
