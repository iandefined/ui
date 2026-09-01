import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Label } from "@/registry/base/label";
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
    <Fieldset className="w-full max-w-sm">
      <FieldsetLegend>Choose a plan</FieldsetLegend>
      <RadioGroup defaultValue="pro">
        {plans.map((plan) => (
          <Label
            className="cursor-pointer items-start gap-3"
            htmlFor={`plan-${plan.value}`}
            key={plan.value}
          >
            <Radio id={`plan-${plan.value}`} value={plan.value} />
            <span className="grid gap-1">
              <span className="font-medium">{plan.label}</span>
              <span className="text-xs/4 text-muted-foreground">
                {plan.description}
              </span>
            </span>
          </Label>
        ))}
      </RadioGroup>
    </Fieldset>
  );
}
