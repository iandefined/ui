"use client";

import { useState } from "react";

import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteRoot,
} from "@/registry/base/autocomplete";
import { Button } from "@/registry/base/button";
import { Field } from "@/registry/base/field";

const tags = ["feature", "fix", "bug", "docs"];

export default function AutocompleteInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Field className="w-full" invalid={invalid}>
        <AutocompleteRoot items={tags}>
          <AutocompleteInput
            aria-label="Search tags"
            placeholder="Search tags..."
          />
          <AutocompletePopup>
            <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
            <AutocompleteList>
              {(tag: string) => (
                <AutocompleteItem key={tag} value={tag}>
                  {tag}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompleteRoot>
      </Field>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
