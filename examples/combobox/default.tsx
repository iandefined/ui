import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const users = [
  { id: "u1", label: "Alice Johnson", email: "alice@example.com" },
  { id: "u2", label: "Bob Lee", email: "bob@example.com" },
  { id: "u3", label: "Cathy Kim", email: "cathy@example.com" },
  { id: "u4", label: "David Smith", email: "david@example.com" },
  { id: "u5", label: "Emily Davis", email: "emily@example.com" },
  { id: "u6", label: "Frank Miller", email: "frank@example.com" },
  { id: "u7", label: "Grace Lee", email: "grace@example.com" },
  { id: "u8", label: "Henry Walker", email: "henry@example.com" },
];

type User = (typeof users)[number];

export default function ComboboxDefaultDemo() {
  return (
    <Combobox items={users}>
      <div className="w-full max-w-xs">
        <ComboboxInput
          aria-label="Select a user"
          placeholder="Select a user..."
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No users found.</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user}>
              <div className="font-medium">{user.label}</div>
              <div className="truncate text-xs text-muted-foreground">
                {user.email}
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
