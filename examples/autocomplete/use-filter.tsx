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
        <span className="text-xs font-medium text-muted-foreground">
          Matcher Strategy
        </span>
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
