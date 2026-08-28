import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupWithDescriptionDemo() {
  return (
    <RadioGroup className="max-w-sm" defaultValue="all">
      <Label className="items-start">
        <Radio value="all" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">All Notifications</span>
          <span className="text-xs text-muted-foreground">
            Receive all notifications including system, marketing, and activity
            alerts.
          </span>
        </span>
      </Label>
      <Label className="items-start">
        <Radio value="mentions" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">Only Mentions</span>
          <span className="text-xs text-muted-foreground">
            Get notified only when someone mentions you or replies to your
            posts.
          </span>
        </span>
      </Label>
      <Label className="items-start">
        <Radio value="direct" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">Direct Messages</span>
          <span className="text-xs text-muted-foreground">
            Only receive notifications for direct messages.
          </span>
        </span>
      </Label>
      <Label className="items-start">
        <Radio value="none" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">None</span>
          <span className="text-xs text-muted-foreground">
            Do not receive any notifications.
          </span>
        </span>
      </Label>
    </RadioGroup>
  );
}
