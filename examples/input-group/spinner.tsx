import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/base/input-group";
import { Spinner } from "@/registry/base/spinner";

export default function InputGroupSpinnerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled>
        <InputGroupInput disabled placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <Spinner size="sm" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupAddon>
          <Spinner size="sm" />
        </InputGroupAddon>
        <InputGroupInput disabled placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
