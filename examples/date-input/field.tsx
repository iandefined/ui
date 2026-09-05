import { DateInput } from "@/registry/base/date-input";
import { Field, FieldDescription, FieldLabel } from "@/registry/base/field";

export default function DateInputField() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="passport-expiry">Passport expiry</FieldLabel>
      <DateInput
        aria-describedby="passport-date-description"
        id="passport-expiry"
        name="passportExpiry"
        required
      />
      <FieldDescription id="passport-date-description">
        Use the expiry date printed on your passport.
      </FieldDescription>
    </Field>
  );
}
