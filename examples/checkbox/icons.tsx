import { CircleIcon, HeartIcon, StarIcon } from "lucide-react";

import { CheckboxIndicator, CheckboxRoot } from "@/registry/base/checkbox";

export default function CheckboxIconsDemo() {
  return (
    <div className="flex items-center gap-5">
      <CheckboxRoot aria-label="Circle checkbox" defaultChecked>
        <CheckboxIndicator>
          <CircleIcon className="fill-current" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <CheckboxRoot aria-label="Star checkbox" defaultChecked>
        <CheckboxIndicator>
          <StarIcon className="fill-current" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <CheckboxRoot aria-label="Heart checkbox" defaultChecked>
        <CheckboxIndicator>
          <HeartIcon className="fill-current" />
        </CheckboxIndicator>
      </CheckboxRoot>
    </div>
  );
}
