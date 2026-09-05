import { DateInput } from "@/registry/base/date-input";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Label } from "@/registry/base/label";

export default function DateInputStates() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="date-input-disabled">Disabled</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15)]}
          disabled
          id="date-input-disabled"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date-input-readonly">Read only</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15)]}
          id="date-input-readonly"
          readOnly
        />
      </div>
      <Field invalid>
        <FieldLabel htmlFor="date-input-required">Required date</FieldLabel>
        <DateInput
          aria-describedby="invalid-date-message"
          id="date-input-required"
          invalid
          required
        />
        <FieldErrorSlot>
          <FieldError id="invalid-date-message" match>
            Enter a complete date.
          </FieldError>
        </FieldErrorSlot>
      </Field>
    </div>
  );
}
