import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const users = [
  {
    value: 1,
    label: "Tony Reichert",
    email: "tony.reichert@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
  },
  {
    value: 2,
    label: "Zoey Lang",
    email: "zoey.lang@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
  },
  {
    value: 3,
    label: "Jane Fisher",
    email: "jane.fisher@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
  },
  {
    value: 4,
    label: "William Howard",
    email: "william.howard@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    value: 5,
    label: "Kristen Cooper",
    email: "kristen.cooper@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
  },
  {
    value: 6,
    label: "Brian Kim",
    email: "brian.kim@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
  },
  {
    value: 7,
    label: "Michael Hunt",
    email: "michael.hunt@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
  },
  {
    value: 8,
    label: "Samantha Brooks",
    email: "samantha.brooks@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
  },
];

export default function SelectAnimationScaleDemo() {
  return (
    <Select items={users}>
      <SelectTrigger className="min-w-66" aria-label="Select a user">
        <SelectValue placeholder="Select a user">
          {(value: number) => {
            const user = users.find((item) => item.value === value);

            if (!user) return null;

            return (
              <span className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt=""
                  className="size-5.5 rounded-full object-cover"
                />
                <span className="flex flex-col text-left">
                  <span className="text-sm">{user.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </span>
              </span>
            );
          }}
        </SelectValue>
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup animationPreset="scale">
        <SelectList>
          {users.map(({ label, value, avatar, email }) => (
            <SelectItem key={value} value={value} className="h-fit">
              <img
                src={avatar}
                alt=""
                className="size-5.5 rounded-full object-cover"
              />
              <span className="flex flex-col">
                <SelectItemText>{label}</SelectItemText>
                <span className="text-xs text-muted-foreground">{email}</span>
              </span>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
