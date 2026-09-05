import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="date-of-birth">Date of birth</Label>
      <DateInput id="date-of-birth" locale="en-US" />
    </div>
  );
}
