import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="date-input-size-sm">Small</Label>
        <DateInput id="date-input-size-sm" size="sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date-input-size-default">Default</Label>
        <DateInput id="date-input-size-default" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date-input-size-lg">Large</Label>
        <DateInput id="date-input-size-lg" size="lg" />
      </div>
    </div>
  );
}
