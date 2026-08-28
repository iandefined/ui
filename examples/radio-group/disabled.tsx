import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupDisabledDemo() {
  return (
    <RadioGroup defaultValue="dhoni">
      <div className="text-sm font-medium">
        Choose your favorite cricket player
      </div>
      <Label>
        <Radio value="virat" /> Virat Kohli
      </Label>
      <Label className="text-muted-foreground">
        <Radio disabled value="rohit" /> Rohit Sharma
      </Label>
      <Label className="text-muted-foreground">
        <Radio disabled value="sachin" /> Sachin Tendulkar
      </Label>
      <Label>
        <Radio value="dhoni" /> MS Dhoni
      </Label>
    </RadioGroup>
  );
}
