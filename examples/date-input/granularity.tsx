import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputGranularity() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="granularity-appointment">Appointment</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15, 14, 30)]}
          granularity="minute"
          hourCycle={12}
          id="granularity-appointment"
          locale="en-US"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="granularity-time">Time only</Label>
        <DateInput
          granularity="minute"
          hourCycle={24}
          id="granularity-time"
          timeOnly
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="granularity-timestamp">Precise timestamp</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15, 14, 30, 45)]}
          granularity="second"
          hourCycle={24}
          id="granularity-timestamp"
          locale="en-GB"
        />
      </div>
    </div>
  );
}
