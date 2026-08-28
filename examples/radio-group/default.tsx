import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="virat">
      <div className="text-sm font-medium">
        Choose your favorite cricket player
      </div>
      <Label>
        <Radio value="virat" /> Virat Kohli
      </Label>
      <Label>
        <Radio value="rohit" /> Rohit Sharma
      </Label>
      <Label>
        <Radio value="sachin" /> Sachin Tendulkar
      </Label>
      <Label>
        <Radio value="dhoni" /> MS Dhoni
      </Label>
    </RadioGroup>
  );
}
