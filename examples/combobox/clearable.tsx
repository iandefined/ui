import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const users = [
  { id: "u1", label: "Alice Johnson", value: "alice@example.com" },
  { id: "u2", label: "Bob Lee", value: "bob@example.com" },
  { id: "u3", label: "Cathy Kim", value: "cathy@example.com" },
  { id: "u4", label: "David Smith", value: "david@example.com" },
  { id: "u5", label: "Emily Davis", value: "emily@example.com" },
  { id: "u6", label: "Frank Miller", value: "frank@example.com" },
  { id: "u7", label: "Grace Lee", value: "grace@example.com" },
  { id: "u8", label: "Henry Walker", value: "henry@example.com" },
];

type User = (typeof users)[number];

export default function ComboboxClearableDemo() {
  return (
    <Combobox items={users}>
      <div className="w-full max-w-xs">
        <ComboboxInput
          aria-label="Select a user"
          isClearable
          placeholder="Select a user..."
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No users found.</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user}>
              <div>
                <div className="font-medium">{user.label}</div>
                <div className="text-xs text-muted-foreground">
                  {user.value}
                </div>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
