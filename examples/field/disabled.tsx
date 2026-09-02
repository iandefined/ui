import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/base/field";

export default function FieldDisabledDemo() {
  return (
    <Field className="w-full max-w-sm" disabled name="username">
      <FieldLabel>Username</FieldLabel>
      <FieldControl defaultValue="ada" />
      <FieldDescription>
        Contact an administrator to change your username.
      </FieldDescription>
    </Field>
  );
}
