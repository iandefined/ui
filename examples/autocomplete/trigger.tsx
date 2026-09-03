"use client";

import * as React from "react";

import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
} from "@/registry/base/autocomplete";
import { Label } from "@/registry/base/label";

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: "t1", value: "feature" },
  { id: "t2", value: "fix" },
  { id: "t3", value: "bug" },
  { id: "t4", value: "docs" },
  { id: "t5", value: "internal" },
  { id: "t6", value: "mobile" },
  { id: "c-accordion", value: "component: accordion" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-input", value: "component: input" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-select", value: "component: select" },
];

export default function AutocompleteTriggerExample() {
  const [value, setValue] = React.useState("");

  return (
    <AutocompleteRoot items={tags} onValueChange={setValue} value={value}>
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="trigger-tags">Search with trigger and clear</Label>
        <AutocompleteInput
          id="trigger-tags"
          placeholder="e.g. feature or component"
          showClear
          showTrigger
        />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>
              No tags found for &quot;{value}&quot;
            </AutocompleteEmpty>

            <AutocompleteList>
              {(tag: Tag) => (
                <AutocompleteItem key={tag.id} value={tag}>
                  {tag.value}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
