import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxRadiusDemo() {
  return (
    <div className="flex items-center gap-5">
      <Checkbox aria-label="No radius checkbox" defaultChecked radius="none" />
      <Checkbox aria-label="Small radius checkbox" defaultChecked radius="sm" />
      <Checkbox aria-label="Default radius checkbox" defaultChecked />
      <Checkbox aria-label="Large radius checkbox" defaultChecked radius="lg" />
      <Checkbox
        aria-label="Full radius checkbox"
        defaultChecked
        radius="full"
      />
    </div>
  );
}
