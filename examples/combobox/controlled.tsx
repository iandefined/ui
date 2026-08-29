"use client";

import { useState } from "react";

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const users = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "u2", name: "Bob Lee", email: "bob@example.com" },
  { id: "u3", name: "Cathy Kim", email: "cathy@example.com" },
  { id: "u4", name: "David Smith", email: "david@example.com" },
];

type User = (typeof users)[number];

export default function ComboboxControlledDemo() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="grid w-full max-w-xs gap-4">
      <Combobox
        items={users}
        itemToStringLabel={(user: User) => user.name}
        onValueChange={setSelectedUser}
        value={selectedUser}
      >
        <ComboboxInput
          aria-label="Select a user"
          placeholder="Select a user..."
        />
        <ComboboxPopup>
          <ComboboxEmpty>No users found.</ComboboxEmpty>
          <ComboboxList>
            {(user: User) => (
              <ComboboxItem key={user.id} value={user}>
                <div className="font-medium">{user.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {user.email}
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      <p className="text-sm text-muted-foreground">
        Selected: {selectedUser?.name ?? "None"}
      </p>
    </div>
  );
}
