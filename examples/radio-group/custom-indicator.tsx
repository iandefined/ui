import { CircleIcon, HeartIcon, StarIcon } from "lucide-react";

import {
  RadioGroup,
  RadioIndicator,
  RadioRoot,
} from "@/registry/base/radio-group";

export default function RadioGroupCustomIndicatorDemo() {
  return (
    <RadioGroup defaultValue="star" orientation="horizontal">
      <RadioRoot aria-label="Circle radio" value="circle">
        <RadioIndicator>
          <CircleIcon className="size-3 fill-current" />
        </RadioIndicator>
      </RadioRoot>
      <RadioRoot aria-label="Star radio" value="star">
        <RadioIndicator>
          <StarIcon className="size-3 fill-current" />
        </RadioIndicator>
      </RadioRoot>
      <RadioRoot aria-label="Heart radio" value="heart">
        <RadioIndicator>
          <HeartIcon className="size-3 fill-current" />
        </RadioIndicator>
      </RadioRoot>
    </RadioGroup>
  );
}
