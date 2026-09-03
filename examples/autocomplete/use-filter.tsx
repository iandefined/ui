import { useState } from "react";

import { cn } from "@/lib/utils";
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
        <div className="inline-flex rounded-lg border border-border bg-muted/30 p-0.5">
          {(["startsWith", "contains", "endsWith"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setStrategy(mode)}
              className={cn(
                "flex-1 cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors",
                strategy === mode
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
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
