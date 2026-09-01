import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

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
        <div className="grid gap-2" key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </Fieldset>
  );
}
