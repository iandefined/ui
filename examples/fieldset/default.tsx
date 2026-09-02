import { Field, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Input } from "@/registry/base/input";

const fields = [
  { id: "first-name", label: "First name", placeholder: "John" },
  { id: "last-name", label: "Last name", placeholder: "Doe" },
  { id: "street-address", label: "Street address", placeholder: "123 Main St" },
];

export default function FieldsetDefaultDemo() {
  return (
    <Fieldset className="w-full max-w-sm">
      <FieldsetLegend>Shipping address</FieldsetLegend>
      {fields.map((field) => (
        <Field key={field.id} name={field.id}>
          <FieldLabel>{field.label}</FieldLabel>
          <Input name={field.id} placeholder={field.placeholder} />
        </Field>
      ))}
    </Fieldset>
  );
}
