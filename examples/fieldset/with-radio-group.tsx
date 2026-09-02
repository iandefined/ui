import { Field, FieldItem, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const plans = [
  {
    description: "For personal projects and experiments.",
    label: "Starter",
    value: "starter",
  },
  {
    description: "For growing products and small teams.",
    label: "Pro",
    value: "pro",
  },
  {
    description: "For organizations that need more control.",
    label: "Business",
    value: "business",
  },
];

export default function FieldsetWithRadioGroupDemo() {
  return (
    <Field className="w-full max-w-sm" name="plan">
      <Fieldset>
        <FieldsetLegend>Choose a plan</FieldsetLegend>
        <RadioGroup defaultValue="pro">
          {plans.map((plan) => (
            <FieldItem key={plan.value}>
              <FieldLabel className="cursor-pointer items-start">
                <Radio value={plan.value} />
                <span className="grid gap-1">
                  <span>{plan.label}</span>
                  <span className="text-xs/4 font-normal text-muted-foreground">
                    {plan.description}
                  </span>
                </span>
              </FieldLabel>
            </FieldItem>
          ))}
        </RadioGroup>
      </Fieldset>
    </Field>
  );
}
