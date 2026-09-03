import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/base/number-field";

export default function NumberFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <NumberField defaultValue={10} size="sm">
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Small number field" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={20}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Default number field" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={30} size="lg">
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Large number field" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
