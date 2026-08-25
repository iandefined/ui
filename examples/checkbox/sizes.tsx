import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxSizesDemo() {
  return (
    <div className="flex items-center gap-5">
      <Checkbox aria-label="Small checkbox" defaultChecked size="sm" />
      <Checkbox aria-label="Default checkbox" defaultChecked />
      <Checkbox aria-label="Large checkbox" defaultChecked size="lg" />
    </div>
  );
}
