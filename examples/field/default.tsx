import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/base/field";

export default function FieldDefaultDemo() {
  return (
    <Field className="w-full max-w-sm" name="username">
      <FieldLabel>Username</FieldLabel>
      <FieldControl placeholder="Enter a username" />
      <FieldDescription>
        Use 3–20 letters, numbers, or underscores.
      </FieldDescription>
    </Field>
  );
}
