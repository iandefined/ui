# Autocomplete

A filterable text input that suggests matching options while accepting free-form text.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Autocomplete` when users benefit from suggestions but may enter any text.

## Preview

```tsx
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
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-context-menu", value: "component: context menu" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-fieldset", value: "component: fieldset" },
  { id: "c-filterable-menu", value: "component: filterable menu" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-menubar", value: "component: menubar" },
  { id: "c-meter", value: "component: meter" },
  { id: "c-navigation-menu", value: "component: navigation menu" },
  { id: "c-number-field", value: "component: number field" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-preview-card", value: "component: preview card" },
  { id: "c-progress", value: "component: progress" },
  { id: "c-radio", value: "component: radio" },
  { id: "c-scroll-area", value: "component: scroll area" },
  { id: "c-select", value: "component: select" },
  { id: "c-separator", value: "component: separator" },
  { id: "c-slider", value: "component: slider" },
  { id: "c-switch", value: "component: switch" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-toast", value: "component: toast" },
  { id: "c-toggle", value: "component: toggle" },
  { id: "c-toggle-group", value: "component: toggle group" },
  { id: "c-toolbar", value: "component: toolbar" },
  { id: "c-tooltip", value: "component: tooltip" },
];

export default function AutocompleteDefault() {
  return (
    <AutocompleteRoot items={tags}>
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="search-tags">Search tags</Label>
        <AutocompleteInput id="search-tags" placeholder="e.g. feature" />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
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
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/autocomplete.json
```

## Usage

```tsx
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete";

const tags = ["feature", "fix", "bug", "docs"];

<Autocomplete items={tags}>
  <AutocompleteInput placeholder="Search tags..." />
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
</Autocomplete>;
```

## Composition

Place the input and popup inside `Autocomplete`; use groups, collections, and separators to organize suggestions.

```tsx
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteSeparator,
} from "@/components/ui/autocomplete";

<Autocomplete>
  <AutocompleteInput />
  <AutocompletePopup>
    <AutocompleteEmpty />
    <AutocompleteList>
      <AutocompleteGroup>
        <AutocompleteGroupLabel />
        <AutocompleteCollection>
          <AutocompleteItem value="option" />
        </AutocompleteCollection>
      </AutocompleteGroup>
      <AutocompleteSeparator />
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>;
```

## Examples

### Auto Highlight

Highlight the first matching suggestion while typing.

```tsx
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
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-context-menu", value: "component: context menu" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-fieldset", value: "component: fieldset" },
  { id: "c-filterable-menu", value: "component: filterable menu" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-menubar", value: "component: menubar" },
  { id: "c-meter", value: "component: meter" },
  { id: "c-navigation-menu", value: "component: navigation menu" },
  { id: "c-number-field", value: "component: number field" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-preview-card", value: "component: preview card" },
  { id: "c-progress", value: "component: progress" },
  { id: "c-radio", value: "component: radio" },
  { id: "c-scroll-area", value: "component: scroll area" },
  { id: "c-select", value: "component: select" },
  { id: "c-separator", value: "component: separator" },
  { id: "c-slider", value: "component: slider" },
  { id: "c-switch", value: "component: switch" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-toast", value: "component: toast" },
  { id: "c-toggle", value: "component: toggle" },
  { id: "c-toggle-group", value: "component: toggle group" },
  { id: "c-toolbar", value: "component: toolbar" },
  { id: "c-tooltip", value: "component: tooltip" },
];

export default function AutocompleteAutoHighlight() {
  return (
    <AutocompleteRoot autoHighlight items={tags}>
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="auto-highlight-tags">Auto highlight on type</Label>
        <AutocompleteInput
          id="auto-highlight-tags"
          placeholder="e.g. feature"
        />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>No tags found.</AutocompleteEmpty>

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
```

### Clearable Input

Show an inline clear action after text is entered.

```tsx
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
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-context-menu", value: "component: context menu" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-fieldset", value: "component: fieldset" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-select", value: "component: select" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-toast", value: "component: toast" },
  { id: "c-tooltip", value: "component: tooltip" },
];

export default function AutocompleteClearExample() {
  const [value, setValue] = React.useState("");

  return (
    <AutocompleteRoot items={tags} onValueChange={setValue} value={value}>
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="clearable-tags">Search with clear button</Label>
        <AutocompleteInput
          id="clearable-tags"
          placeholder="e.g. feature or component"
          showClear
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
```

### Trigger and Clear

Show both the popup trigger and clear action.

```tsx
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
```

### Grouped Options

Organize related suggestions into groups.

```tsx
import {
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
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
  label: string;
  group: "Type" | "Component";
}

interface TagGroup {
  value: string;
  items: Tag[];
}

const tagsData: Tag[] = [
  { id: "t1", label: "feature", group: "Type" },
  { id: "t2", label: "fix", group: "Type" },
  { id: "t3", label: "bug", group: "Type" },
  { id: "t4", label: "docs", group: "Type" },
  { id: "t5", label: "internal", group: "Type" },
  { id: "t6", label: "mobile", group: "Type" },
  { id: "c-accordion", label: "component: accordion", group: "Component" },
  {
    id: "c-alert-dialog",
    label: "component: alert dialog",
    group: "Component",
  },
  {
    id: "c-autocomplete",
    label: "component: autocomplete",
    group: "Component",
  },
  { id: "c-avatar", label: "component: avatar", group: "Component" },
  { id: "c-checkbox", label: "component: checkbox", group: "Component" },
  {
    id: "c-checkbox-group",
    label: "component: checkbox group",
    group: "Component",
  },
  { id: "c-collapsible", label: "component: collapsible", group: "Component" },
  { id: "c-combobox", label: "component: combobox", group: "Component" },
  {
    id: "c-context-menu",
    label: "component: context menu",
    group: "Component",
  },
  { id: "c-dialog", label: "component: dialog", group: "Component" },
  { id: "c-field", label: "component: field", group: "Component" },
  { id: "c-fieldset", label: "component: fieldset", group: "Component" },
  {
    id: "c-filterable-menu",
    label: "component: filterable menu",
    group: "Component",
  },
  { id: "c-form", label: "component: form", group: "Component" },
  { id: "c-input", label: "component: input", group: "Component" },
  { id: "c-menu", label: "component: menu", group: "Component" },
  { id: "c-menubar", label: "component: menubar", group: "Component" },
  { id: "c-meter", label: "component: meter", group: "Component" },
  {
    id: "c-navigation-menu",
    label: "component: navigation menu",
    group: "Component",
  },
  {
    id: "c-number-field",
    label: "component: number field",
    group: "Component",
  },
  { id: "c-popover", label: "component: popover", group: "Component" },
  {
    id: "c-preview-card",
    label: "component: preview card",
    group: "Component",
  },
  { id: "c-progress", label: "component: progress", group: "Component" },
  { id: "c-radio", label: "component: radio", group: "Component" },
  { id: "c-scroll-area", label: "component: scroll area", group: "Component" },
  { id: "c-select", label: "component: select", group: "Component" },
  { id: "c-separator", label: "component: separator", group: "Component" },
  { id: "c-slider", label: "component: slider", group: "Component" },
  { id: "c-switch", label: "component: switch", group: "Component" },
  { id: "c-tabs", label: "component: tabs", group: "Component" },
  { id: "c-toast", label: "component: toast", group: "Component" },
  { id: "c-toggle", label: "component: toggle", group: "Component" },
  {
    id: "c-toggle-group",
    label: "component: toggle group",
    group: "Component",
  },
  { id: "c-toolbar", label: "component: toolbar", group: "Component" },
  { id: "c-tooltip", label: "component: tooltip", group: "Component" },
];

function groupTags(tags: Tag[]): TagGroup[] {
  const groups: { [key: string]: Tag[] } = {};
  for (const t of tags) {
    (groups[t.group] ??= []).push(t);
  }
  const order = ["Type", "Component"];
  return order.map((value) => ({ value, items: groups[value] ?? [] }));
}

const groupedTags: TagGroup[] = groupTags(tagsData);

export default function AutocompleteGrouped() {
  return (
    <AutocompleteRoot items={groupedTags}>
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="grouped-tags">Select a tag</Label>
        <AutocompleteInput id="grouped-tags" placeholder="e.g. feature" />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
            <AutocompleteList>
              {(group: TagGroup) => (
                <AutocompleteGroup key={group.value} items={group.items}>
                  <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(tag: Tag) => (
                      <AutocompleteItem key={tag.id} value={tag}>
                        {tag.label}
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
```

### Inline Suggestions

Complete with the first matching suggestion.

```tsx
import {
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
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-context-menu", value: "component: context menu" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-fieldset", value: "component: fieldset" },
  { id: "c-filterable-menu", value: "component: filterable menu" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-menubar", value: "component: menubar" },
  { id: "c-meter", value: "component: meter" },
  { id: "c-navigation-menu", value: "component: navigation menu" },
  { id: "c-number-field", value: "component: number field" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-preview-card", value: "component: preview card" },
  { id: "c-progress", value: "component: progress" },
  { id: "c-radio", value: "component: radio" },
  { id: "c-scroll-area", value: "component: scroll area" },
  { id: "c-select", value: "component: select" },
  { id: "c-separator", value: "component: separator" },
  { id: "c-slider", value: "component: slider" },
  { id: "c-switch", value: "component: switch" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-toast", value: "component: toast" },
  { id: "c-toggle", value: "component: toggle" },
  { id: "c-toggle-group", value: "component: toggle group" },
  { id: "c-toolbar", value: "component: toolbar" },
  { id: "c-tooltip", value: "component: tooltip" },
];

export default function AutocompleteInline() {
  return (
    <AutocompleteRoot items={tags} mode="both">
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="inline-tags">
          Search tags (with inline completion)
        </Label>
        <AutocompleteInput id="inline-tags" placeholder="e.g. feature" />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner className="data-empty:hidden">
          <AutocompletePopup>
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
```

### Limited Results

Constrain the number of rendered suggestions.

```tsx
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
  AutocompleteStatus,
  useAutocompleteFilter,
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
  { id: "t7", value: "frontend" },
  { id: "t8", value: "backend" },
  { id: "t9", value: "performance" },
  { id: "t10", value: "accessibility" },
  { id: "t11", value: "design" },
  { id: "t12", value: "research" },
  { id: "t13", value: "testing" },
  { id: "t14", value: "infrastructure" },
  { id: "t15", value: "documentation" },
  { id: "c-accordion", value: "component: accordion" },
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-context-menu", value: "component: context menu" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-fieldset", value: "component: fieldset" },
  { id: "c-filterable-menu", value: "component: filterable menu" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-menu", value: "component: menu" },
  { id: "c-menubar", value: "component: menubar" },
  { id: "c-meter", value: "component: meter" },
  { id: "c-navigation-menu", value: "component: navigation menu" },
  { id: "c-number-field", value: "component: number field" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-preview-card", value: "component: preview card" },
  { id: "c-progress", value: "component: progress" },
  { id: "c-radio", value: "component: radio" },
  { id: "c-scroll-area", value: "component: scroll area" },
  { id: "c-select", value: "component: select" },
  { id: "c-separator", value: "component: separator" },
  { id: "c-slider", value: "component: slider" },
  { id: "c-switch", value: "component: switch" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-toast", value: "component: toast" },
  { id: "c-toggle", value: "component: toggle" },
  { id: "c-toggle-group", value: "component: toggle group" },
  { id: "c-toolbar", value: "component: toolbar" },
  { id: "c-tooltip", value: "component: tooltip" },
];

const limit = 8;

export default function AutocompleteLimit() {
  const [value, setValue] = React.useState("");

  const { contains } = useAutocompleteFilter({ sensitivity: "base" });

  const totalMatches = React.useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      return tags.length;
    }
    return tags.filter((t) => contains(t.value, trimmed)).length;
  }, [value, contains]);

  const moreCount = Math.max(0, totalMatches - limit);

  return (
    <AutocompleteRoot
      items={tags}
      limit={limit}
      onValueChange={setValue}
      value={value}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="limit-tags">Limit results to 8</Label>
        <AutocompleteInput id="limit-tags" placeholder="e.g. component" />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>
              No results found for &quot;{value}&quot;
            </AutocompleteEmpty>

            <AutocompleteList>
              {(tag: Tag) => (
                <AutocompleteItem key={tag.id} value={tag}>
                  {tag.value}
                </AutocompleteItem>
              )}
            </AutocompleteList>

            {moreCount > 0 && (
              <AutocompleteStatus>
                Hiding {moreCount} results (type a more specific query)
              </AutocompleteStatus>
            )}
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
```

### Async Loading

Filter asynchronous results with status feedback.

```tsx
"use client";

import * as React from "react";

import {
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
  AutocompleteStatus,
  useAutocompleteFilter,
} from "@/registry/base/autocomplete";
import { Label } from "@/registry/base/label";
import { Spinner } from "@/registry/base/spinner";

interface Movie {
  id: string;
  title: string;
  year: number;
}

const top30Movies: Movie[] = [
  { id: "1", title: "The Shawshank Redemption", year: 1994 },
  { id: "2", title: "The Godfather", year: 1972 },
  { id: "3", title: "The Dark Knight", year: 2008 },
  { id: "4", title: "The Godfather Part II", year: 1974 },
  { id: "5", title: "12 Angry Men", year: 1957 },
  {
    id: "6",
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { id: "7", title: "Schindler's List", year: 1993 },
  { id: "8", title: "Pulp Fiction", year: 1994 },
  {
    id: "9",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  { id: "10", title: "The Good, the Bad and the Ugly", year: 1966 },
  { id: "11", title: "Forrest Gump", year: 1994 },
  { id: "12", title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { id: "13", title: "Fight Club", year: 1999 },
  { id: "14", title: "Inception", year: 2010 },
  {
    id: "15",
    title: "Star Wars: Episode V – The Empire Strikes Back",
    year: 1980,
  },
  { id: "16", title: "The Matrix", year: 1999 },
  { id: "17", title: "Goodfellas", year: 1990 },
  { id: "18", title: "Interstellar", year: 2014 },
  { id: "19", title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { id: "20", title: "Se7en", year: 1995 },
  { id: "21", title: "It's a Wonderful Life", year: 1946 },
  { id: "22", title: "The Silence of the Lambs", year: 1991 },
  { id: "23", title: "Seven Samurai", year: 1954 },
  { id: "24", title: "Saving Private Ryan", year: 1998 },
  { id: "25", title: "City of God", year: 2002 },
  { id: "26", title: "Life Is Beautiful", year: 1997 },
  { id: "27", title: "The Green Mile", year: 1999 },
  { id: "28", title: "Star Wars: Episode IV – A New Hope", year: 1977 },
  { id: "29", title: "Terminator 2: Judgment Day", year: 1991 },
  { id: "30", title: "Back to the Future", year: 1985 },
];

async function searchMovies(
  query: string,
  filter: (item: string, query: string) => boolean
): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return top30Movies.filter(
    (movie) =>
      filter(movie.title, query) || filter(movie.year.toString(), query)
  );
}

export default function AutocompleteAsync() {
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);

  const { contains } = useAutocompleteFilter({ sensitivity: "base" });

  const displayedResults = searchValue ? searchResults : [];
  const effectiveLoading = searchValue ? isLoading : false;

  React.useEffect(() => {
    if (!searchValue) {
      return undefined;
    }

    let ignore = false;

    async function fetchMovies() {
      try {
        const results = await searchMovies(searchValue, contains);
        if (!ignore) {
          setSearchResults(results);
        }
      } catch {
        if (!ignore) {
          setSearchResults([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      void fetchMovies();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      ignore = true;
    };
  }, [searchValue, contains]);

  let status: React.ReactNode = `${displayedResults.length} result${displayedResults.length === 1 ? "" : "s"} found`;
  if (effectiveLoading) {
    status = (
      <>
        <Spinner size="sm" />
        Searching...
      </>
    );
  } else if (displayedResults.length === 0 && searchValue) {
    status = `No results found for "${searchValue}"`;
  }

  const shouldRenderPopup = searchValue !== "";

  return (
    <AutocompleteRoot
      filter={null}
      items={displayedResults}
      itemToStringValue={(item) => item.title}
      onValueChange={setSearchValue}
      value={searchValue}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="async-movies">Search movies by title or year</Label>
        <AutocompleteInput
          id="async-movies"
          placeholder="e.g. Pulp Fiction or 1994"
        />
      </div>

      {shouldRenderPopup && (
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup aria-busy={effectiveLoading || undefined}>
              <AutocompleteStatus className="flex items-center gap-2">
                {status}
              </AutocompleteStatus>
              <AutocompleteList>
                {(movie: Movie) => (
                  <AutocompleteItem key={movie.id} value={movie}>
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="font-medium leading-5">{movie.title}</div>
                      <div className="text-muted-foreground text-xs leading-4">
                        {movie.year}
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      )}
    </AutocompleteRoot>
  );
}
```

### Fuzzy Search

Use loose matching across option fields.

```tsx
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
  AutocompleteValue,
} from "@/registry/base/autocomplete";
import { Label } from "@/registry/base/label";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

interface Documentation {
  title: string;
  description: string;
  category: string;
}

const documentationItems: Documentation[] = [
  {
    title: "React Hooks Guide",
    description:
      "Learn how to use React Hooks like useState, useEffect, and custom hooks",
    category: "React",
  },
  {
    title: "JavaScript Array Methods",
    description:
      "Master array methods like map, filter, reduce, and forEach in JavaScript",
    category: "JavaScript",
  },
  {
    title: "CSS Flexbox Layout",
    description: "Complete guide to CSS Flexbox for responsive web design",
    category: "CSS",
  },
  {
    title: "TypeScript Interfaces",
    description: "Understanding TypeScript interfaces and type definitions",
    category: "TypeScript",
  },
  {
    title: "React Performance Optimization",
    description:
      "Tips and techniques for optimizing React application performance",
    category: "React",
  },
  {
    title: "HTML Semantic Elements",
    description:
      "Using semantic HTML elements for better accessibility and SEO",
    category: "HTML",
  },
  {
    title: "Node.js Express Server",
    description: "Building RESTful APIs with Node.js and Express framework",
    category: "Node.js",
  },
  {
    title: "Vue Composition API",
    description: "Modern Vue.js development using the Composition API",
    category: "Vue.js",
  },
  {
    title: "Angular Components",
    description: "Creating reusable Angular components with TypeScript",
    category: "Angular",
  },
  {
    title: "Python Django Framework",
    description: "Web development with Python Django framework",
    category: "Python",
  },
  {
    title: "CSS Grid Layout",
    description: "Advanced CSS Grid techniques for complex layouts",
    category: "CSS",
  },
  {
    title: "React Testing Library",
    description: "Testing React components with React Testing Library",
    category: "React",
  },
  {
    title: "MongoDB Queries",
    description: "Advanced MongoDB queries and aggregation pipelines",
    category: "Database",
  },
  {
    title: "Webpack Configuration",
    description: "Optimizing Webpack configuration for production builds",
    category: "Build Tools",
  },
  {
    title: "SASS/SCSS Guide",
    description: "Writing maintainable CSS with SASS and SCSS",
    category: "CSS",
  },
];

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const escaped = query.replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\<ComponentPreview name="autocomplete/fuzzy" />");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        className="bg-primary/20 text-foreground font-semibold rounded-xs px-0.5"
        key={i}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function AutocompleteFuzzy() {
  const { filterItem } = useFuzzyFilter<Documentation>({
    keys: [
      { key: "title", threshold: "contains" },
      { key: "description", threshold: "word-starts-with" },
      "category",
    ],
  });

  return (
    <AutocompleteRoot
      filter={filterItem}
      items={documentationItems}
      itemToStringValue={(item) => item.title}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="fuzzy-docs">Fuzzy search documentation</Label>
        <AutocompleteInput
          id="fuzzy-docs"
          placeholder="e.g. React, hooks, css grid"
        />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>
              No results found for &quot;
              <AutocompleteValue />
              &quot;
            </AutocompleteEmpty>

            <AutocompleteList>
              {(item: Documentation) => (
                <AutocompleteItem key={item.title} value={item}>
                  <AutocompleteValue>
                    {(value) => (
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 font-medium leading-5">
                            {highlightMatch(item.title, value)}
                          </div>
                          <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-muted-foreground text-xs leading-4">
                          {highlightMatch(item.description, value)}
                        </div>
                      </div>
                    )}
                  </AutocompleteValue>
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
```

### Custom Matching Strategy

Choose a string-matching strategy.

```tsx
import { useState } from "react";

import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
  useAutocompleteFilter,
} from "@/registry/base/autocomplete";
import { Label } from "@/registry/base/label";
import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

interface Framework {
  id: string;
  name: string;
  category: string;
}

const frameworks: Framework[] = [
  { id: "react", name: "React", category: "Frontend" },
  { id: "vue", name: "Vue", category: "Frontend" },
  { id: "angular", name: "Angular", category: "Frontend" },
  { id: "svelte", name: "Svelte", category: "Frontend" },
  { id: "next", name: "Next.js", category: "Fullstack" },
  { id: "nuxt", name: "Nuxt", category: "Fullstack" },
  { id: "astro", name: "Astro", category: "Static" },
  { id: "remix", name: "Remix", category: "Fullstack" },
  { id: "solid", name: "SolidJS", category: "Frontend" },
  { id: "express", name: "Express", category: "Backend" },
  { id: "fastify", name: "Fastify", category: "Backend" },
  { id: "nest", name: "NestJS", category: "Backend" },
];

type MatchStrategy = "contains" | "startsWith" | "endsWith";

export default function AutocompleteUseFilterDemo() {
  const [strategy, setStrategy] = useState<MatchStrategy>("startsWith");
  const filter = useAutocompleteFilter({ sensitivity: "base" });

  const activeFilter = (item: Framework, query: string) => {
    return filter[strategy](item.name, query);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm">Matcher Strategy</span>
        <Tabs
          value={strategy}
          onValueChange={(val) => setStrategy(val as MatchStrategy)}
        >
          <TabsList className="w-full">
            <TabsTrigger className="flex-1 text-xs" value="startsWith">
              startsWith
            </TabsTrigger>
            <TabsTrigger className="flex-1 text-xs" value="contains">
              contains
            </TabsTrigger>
            <TabsTrigger className="flex-1 text-xs" value="endsWith">
              endsWith
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AutocompleteRoot
        items={frameworks}
        filter={activeFilter}
        itemToStringValue={(item: Framework) => item.name}
      >
        <div className="grid w-full gap-2">
          <Label htmlFor="search-frameworks">Search frameworks</Label>
          <AutocompleteInput
            id="search-frameworks"
            placeholder={`Type query (${strategy})...`}
            showTrigger
            showClear
          />
        </div>

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>
                No frameworks match with {strategy}.
              </AutocompleteEmpty>
              <AutocompleteList>
                {(framework: Framework) => (
                  <AutocompleteItem key={framework.id} value={framework}>
                    <div className="flex w-full items-center justify-between">
                      <span>{framework.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {framework.category}
                      </span>
                    </div>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </AutocompleteRoot>
    </div>
  );
}
```

### Invalid

Trigger the invalid-state shake on the autocomplete input.

```tsx
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
```

### Result Counter and Stats

Read the filtered item list for contextual summaries.

```tsx
import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
  useAutocompleteFilteredItems,
} from "@/registry/base/autocomplete";
import { Kbd } from "@/registry/base/kbd";
import { Label } from "@/registry/base/label";

interface Command {
  id: string;
  name: string;
  shortcut?: string;
  section: string;
}

const commands: Command[] = [
  { id: "c1", name: "Create new file", shortcut: "Ctrl+N", section: "File" },
  {
    id: "c2",
    name: "Open existing project",
    shortcut: "Ctrl+O",
    section: "File",
  },
  { id: "c3", name: "Save all changes", shortcut: "Ctrl+S", section: "File" },
  {
    id: "c4",
    name: "Find in workspace",
    shortcut: "Ctrl+Shift+F",
    section: "Search",
  },
  {
    id: "c5",
    name: "Replace in files",
    shortcut: "Ctrl+Shift+H",
    section: "Search",
  },
  {
    id: "c6",
    name: "Format document",
    shortcut: "Shift+Alt+F",
    section: "Editor",
  },
  {
    id: "c7",
    name: "Toggle terminal panel",
    shortcut: "Ctrl+`",
    section: "View",
  },
  {
    id: "c8",
    name: "Open settings",
    shortcut: "Ctrl+,",
    section: "Preferences",
  },
  {
    id: "c9",
    name: "Keyboard shortcuts",
    shortcut: "Ctrl+K Ctrl+S",
    section: "Preferences",
  },
  { id: "c10", name: "Run test suite", shortcut: "Ctrl+T", section: "Debug" },
  {
    id: "c11",
    name: "Start debugging session",
    shortcut: "F5",
    section: "Debug",
  },
  {
    id: "c12",
    name: "Git commit staged changes",
    shortcut: "Ctrl+Enter",
    section: "Source Control",
  },
];

function FilteredCountSummary({ total }: { total: number }) {
  const filteredItems = useAutocompleteFilteredItems<Command>();

  return (
    <div className="flex items-center justify-between border-t border-border/50 px-3 py-2 text-xs text-muted-foreground">
      <span>
        {filteredItems.length === 0
          ? "No commands found"
          : `Showing ${filteredItems.length} of ${total} commands`}
      </span>
      <span className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
        {filteredItems.length}
      </span>
    </div>
  );
}

export default function AutocompleteUseFilteredItemsDemo() {
  return (
    <AutocompleteRoot
      items={commands}
      itemToStringValue={(item: Command) => item.name}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="quick-commands">Quick commands</Label>
        <AutocompleteInput
          id="quick-commands"
          placeholder="Type to search actions..."
          showClear
          showTrigger
        />
      </div>

      <AutocompletePortal>
        <AutocompletePositioner>
          <AutocompletePopup>
            <AutocompleteEmpty>No matching actions.</AutocompleteEmpty>
            <AutocompleteList>
              {(command: Command) => (
                <AutocompleteItem key={command.id} value={command}>
                  <div className="flex w-full items-center justify-between">
                    <span>{command.name}</span>
                    {command.shortcut && <Kbd>{command.shortcut}</Kbd>}
                  </div>
                </AutocompleteItem>
              )}
            </AutocompleteList>
            <FilteredCountSummary total={commands.length} />
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}
```

## API Reference

`Autocomplete` wraps [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete). Supported Base UI props pass through.

### AutocompleteInput Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showTrigger` | `boolean` | `false` | Shows a popup toggle button. |
| `showClear` | `boolean` | `false` | Shows a clear action after text is entered. |
| `isClearable` | `boolean` | `false` | Alias for `showClear`. |

### AutocompletePopup Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `side` | `"top" \| "bottom"` | `bottom` | Sets the preferred side of the input. |
| `sideOffset` | `number` | `0` | Sets the distance from the input in pixels. |
| `align` | `"start" \| "center" \| "end"` | `center` | Sets alignment relative to the input. |
| `alignOffset` | `number` | `0` | Offsets the popup along the alignment axis. |

### AutocompleteList Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `scrollShadow` | `"vertical" \| "horizontal" \| "both" \| "none"` | `vertical` | Shows gradients for hidden scrollable content. |
| `hideScrollbar` | `boolean` | `false` | Hides the scrollbar while preserving scrolling. |
