import { Switch } from "@/registry/base/switch";

export default function SwitchDisabledDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Switch aria-label="Disabled" disabled />
      <Switch aria-label="Disabled and checked" defaultChecked disabled />
    </div>
  );
}
