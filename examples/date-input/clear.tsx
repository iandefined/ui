import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputClear() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="optional-deadline">Optional deadline</Label>
      <DateInput
        clearable
        defaultValue={[new Date(2026, 8, 15)]}
        id="optional-deadline"
      />
    </div>
  );
}
