"use client";

import { Fragment, useState } from "react";

import {
  Combobox,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
} from "@/registry/base/combobox";

type ColorFamily =
  | "Gray"
  | "Red"
  | "Blue"
  | "Green"
  | "Purple"
  | "Amber"
  | "Pink"
  | "Teal";

type ColorShade = {
  family: ColorFamily;
  hex: string;
  id: string;
  name: string;
  rgb: string;
  shade: string;
};

type ColorGroup = {
  items: ColorShade[];
  value: ColorFamily;
};

const colorsData: ColorShade[] = [
  {
    family: "Gray",
    id: "gray-100",
    name: "Gray 100",
    shade: "100",
    hex: "#f4f4f5",
    rgb: "244, 244, 245",
  },
  {
    family: "Gray",
    id: "gray-500",
    name: "Gray 500",
    shade: "500",
    hex: "#71717a",
    rgb: "113, 113, 122",
  },
  {
    family: "Gray",
    id: "gray-900",
    name: "Gray 900",
    shade: "900",
    hex: "#18181b",
    rgb: "24, 24, 27",
  },
  {
    family: "Red",
    id: "red-100",
    name: "Red 100",
    shade: "100",
    hex: "#fee2e2",
    rgb: "254, 226, 226",
  },
  {
    family: "Red",
    id: "red-500",
    name: "Red 500",
    shade: "500",
    hex: "#ef4444",
    rgb: "239, 68, 68",
  },
  {
    family: "Red",
    id: "red-900",
    name: "Red 900",
    shade: "900",
    hex: "#7f1d1d",
    rgb: "127, 29, 29",
  },
  {
    family: "Blue",
    id: "blue-100",
    name: "Blue 100",
    shade: "100",
    hex: "#dbeafe",
    rgb: "219, 234, 254",
  },
  {
    family: "Blue",
    id: "blue-500",
    name: "Blue 500",
    shade: "500",
    hex: "#3b82f6",
    rgb: "59, 130, 246",
  },
  {
    family: "Blue",
    id: "blue-900",
    name: "Blue 900",
    shade: "900",
    hex: "#1e3a8a",
    rgb: "30, 58, 138",
  },
  {
    family: "Green",
    id: "green-100",
    name: "Green 100",
    shade: "100",
    hex: "#dcfce7",
    rgb: "220, 252, 231",
  },
  {
    family: "Green",
    id: "green-500",
    name: "Green 500",
    shade: "500",
    hex: "#22c55e",
    rgb: "34, 197, 94",
  },
  {
    family: "Green",
    id: "green-900",
    name: "Green 900",
    shade: "900",
    hex: "#14532d",
    rgb: "20, 83, 45",
  },
  {
    family: "Purple",
    id: "purple-100",
    name: "Purple 100",
    shade: "100",
    hex: "#f3e8ff",
    rgb: "243, 232, 255",
  },
  {
    family: "Purple",
    id: "purple-500",
    name: "Purple 500",
    shade: "500",
    hex: "#a855f7",
    rgb: "168, 85, 247",
  },
  {
    family: "Purple",
    id: "purple-900",
    name: "Purple 900",
    shade: "900",
    hex: "#581c87",
    rgb: "88, 28, 135",
  },
  {
    family: "Amber",
    id: "amber-100",
    name: "Amber 100",
    shade: "100",
    hex: "#fef3c7",
    rgb: "254, 243, 199",
  },
  {
    family: "Amber",
    id: "amber-500",
    name: "Amber 500",
    shade: "500",
    hex: "#f59e0b",
    rgb: "245, 158, 11",
  },
  {
    family: "Amber",
    id: "amber-900",
    name: "Amber 900",
    shade: "900",
    hex: "#78350f",
    rgb: "120, 53, 15",
  },
  {
    family: "Pink",
    id: "pink-100",
    name: "Pink 100",
    shade: "100",
    hex: "#fce7f3",
    rgb: "252, 231, 243",
  },
  {
    family: "Pink",
    id: "pink-500",
    name: "Pink 500",
    shade: "500",
    hex: "#ec4899",
    rgb: "236, 72, 153",
  },
  {
    family: "Pink",
    id: "pink-900",
    name: "Pink 900",
    shade: "900",
    hex: "#831843",
    rgb: "131, 24, 67",
  },
  {
    family: "Teal",
    id: "teal-100",
    name: "Teal 100",
    shade: "100",
    hex: "#ccfbf1",
    rgb: "204, 251, 241",
  },
  {
    family: "Teal",
    id: "teal-500",
    name: "Teal 500",
    shade: "500",
    hex: "#14b8a6",
    rgb: "20, 184, 166",
  },
  {
    family: "Teal",
    id: "teal-900",
    name: "Teal 900",
    shade: "900",
    hex: "#134e4a",
    rgb: "19, 78, 74",
  },
];

const familyOrder: ColorFamily[] = [
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Purple",
  "Amber",
  "Pink",
  "Teal",
];

const groupedColors: ColorGroup[] = familyOrder.map((value) => ({
  items: colorsData.filter((color) => color.family === value),
  value,
}));

export default function ComboboxGroupsDemo() {
  const [selectedColor, setSelectedColor] = useState<ColorShade | null>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Combobox
        itemToStringLabel={(color: ColorShade) => color.name}
        items={groupedColors}
        onValueChange={(color: ColorShade | null) => setSelectedColor(color)}
        value={selectedColor}
      >
        <ComboboxInput
          aria-label="Search colors"
          className="w-full"
          placeholder="Search color palette..."
        />
        <ComboboxPopup>
          <ComboboxEmpty>No colors found.</ComboboxEmpty>
          <ComboboxList>
            {(group: ColorGroup) => (
              <Fragment key={group.value}>
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(color: ColorShade) => (
                      <ComboboxItem key={color.id} value={color}>
                        <div className="flex w-full items-center justify-between gap-3">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div
                              aria-hidden="true"
                              className="size-6 shrink-0 rounded border shadow-sm"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate font-medium">
                                {color.name}
                              </span>
                              <span className="truncate font-mono text-xs opacity-60">
                                {color.hex}
                              </span>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-medium opacity-50">
                            {color.shade}
                          </span>
                        </div>
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
                {group.value !== "Teal" && <ComboboxSeparator />}
              </Fragment>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>

      {selectedColor && (
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="size-12 shrink-0 rounded-lg border shadow-sm"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div className="flex min-w-0 flex-col">
              <p className="text-sm font-semibold">{selectedColor.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedColor.family} family
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <p className="text-muted-foreground">HEX</p>
              <p className="font-mono font-medium">{selectedColor.hex}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">RGB</p>
              <p className="font-mono font-medium">{selectedColor.rgb}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
