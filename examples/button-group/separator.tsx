import { Button } from "@/registry/base/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/base/button-group";

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="secondary">
        Copy
      </Button>
      <ButtonGroupSeparator orientation="vertical" />
      <Button size="sm" variant="secondary">
        Paste
      </Button>
    </ButtonGroup>
  );
}
