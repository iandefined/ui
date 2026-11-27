import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandContent,
  CommandInput,
  CommandItem,
  CommandVirtualizedList,
  useCommandFilteredItems,
} from "@/registry/base/command";

type Action = {
  id: number;
  label: string;
  description: string;
};

const actions: Action[] = Array.from({ length: 2_000 }, (_, index) => {
  return {
    id: index + 1,
    label: `Open ${["project", "document", "report", "dashboard"][index % 4]} ${String(index + 1).padStart(4, "0")}`,
    description: `Workspace item ${index + 1}`,
  };
});

type ActionVirtualizer = ReturnType<
  typeof useVirtualizer<HTMLDivElement, Element>
>;

export default function CommandVirtualizedDemo() {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const virtualizerRef = useRef<ActionVirtualizer | null>(null);
  const setVirtualizer = useCallback(
    (virtualizer: ActionVirtualizer | null) => {
      virtualizerRef.current = virtualizer;
    },
    []
  );

  return (
    <div className="grid w-full max-w-lg gap-3">
      <Command
        className="h-96"
        itemToStringValue={(action) => action.label}
        items={actions}
        onItemHighlighted={(action, { index, reason }) => {
          if (
            !action ||
            index < 0 ||
            (reason !== "keyboard" && reason !== "none")
          ) {
            return;
          }

          queueMicrotask(() => {
            virtualizerRef.current?.scrollToIndex(index, { align: "auto" });
          });
        }}
        virtualized
      >
        <CommandContent>
          <CommandInput
            aria-label="Search workspace actions"
            placeholder="Search 2,000 workspace actions…"
          />
          <VirtualizedActions
            onSelect={setSelectedAction}
            setVirtualizer={setVirtualizer}
          />
        </CommandContent>
      </Command>
      <output
        aria-live="polite"
        className="min-h-5 text-center text-xs text-muted-foreground"
      >
        {selectedAction
          ? `Selected ${selectedAction.label}`
          : "Choose an action with the arrow keys or pointer."}
      </output>
    </div>
  );
}

function VirtualizedActions({
  onSelect,
  setVirtualizer,
}: {
  onSelect: (action: Action) => void;
  setVirtualizer: (virtualizer: ActionVirtualizer | null) => void;
}) {
  const actions = useCommandFilteredItems<Action>();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // TanStack Virtual's instance methods must stay live for scroll coordination.
  // eslint-disable-next-line react/incompatible-library, react-hooks-js/incompatible-library -- The virtualizer is consumed directly by this list.
  const virtualizer = useVirtualizer({
    count: actions.length,
    estimateSize: () => 56,
    getScrollElement: () => scrollRef.current,
    overscan: 6,
    paddingEnd: 8,
    paddingStart: 8,
    scrollPaddingEnd: 8,
    scrollPaddingStart: 8,
  });

  useEffect(() => {
    setVirtualizer(virtualizer);
    return () => setVirtualizer(null);
  }, [setVirtualizer, virtualizer]);

  return (
    <CommandVirtualizedList
      scrollRef={scrollRef}
      totalSize={virtualizer.getTotalSize()}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const action = actions[virtualItem.index];
        if (!action) {
          return null;
        }

        return (
          <CommandItem
            aria-posinset={virtualItem.index + 1}
            aria-setsize={actions.length}
            className="absolute top-0 left-0 flex h-14 w-full items-center justify-between gap-3 px-3"
            data-index={virtualItem.index}
            index={virtualItem.index}
            key={virtualItem.key}
            onClick={() => onSelect(action)}
            ref={virtualizer.measureElement}
            style={{
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            value={action}
          >
            <span className="grid min-w-0 text-start">
              <span className="truncate font-medium">{action.label}</span>
              <span className="truncate text-xs text-muted-foreground">
                {action.description}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              #{action.id}
            </span>
          </CommandItem>
        );
      })}
    </CommandVirtualizedList>
  );
}
