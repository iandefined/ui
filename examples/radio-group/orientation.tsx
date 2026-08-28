import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupOrientationDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm font-medium">
        How would you rate your experience?
      </div>
      <RadioGroup defaultValue={4} orientation="horizontal">
        {[1, 2, 3, 4, 5].map((item) => (
          <Label key={item}>
            <Radio value={item} /> {item}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
