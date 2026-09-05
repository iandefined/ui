import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputRange() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="travel-dates">Travel dates</Label>
      <DateInput
        defaultValue={[new Date(2026, 8, 10), new Date(2026, 8, 17)]}
        id="travel-dates"
        selectionMode="range"
      />
    </div>
  );
}
