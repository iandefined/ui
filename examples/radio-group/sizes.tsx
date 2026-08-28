import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupSizesDemo() {
  return (
    <div className="flex items-center gap-5">
      <RadioGroup className="contents" defaultValue="sm">
        <Radio aria-label="Small radio" size="sm" value="sm" />
      </RadioGroup>
      <RadioGroup className="contents" defaultValue="default">
        <Radio aria-label="Default radio" size="default" value="default" />
      </RadioGroup>
      <RadioGroup className="contents" defaultValue="lg">
        <Radio aria-label="Large radio" size="lg" value="lg" />
      </RadioGroup>
    </div>
  );
}
