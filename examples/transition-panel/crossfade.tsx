"use client";

import * as React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/registry/base/transition-panel";

const VIEWS = ["overview", "details", "notes"] as const;
type View = (typeof VIEWS)[number];

const CONTENT: Record<View, { title: string; body: string }> = {
  overview: {
    title: "Overview",
    body: "The fade transition keeps the panel in place while the active view crossfades into the next one.",
  },
  details: {
    title: "Details",
    body: "The panel measures the active view and animates its real height, so content can grow or shrink without being scaled.",
  },
  notes: {
    title: "Notes",
    body: "Inactive views remain mounted, which keeps their local state when you move between views.",
  },
};

export default function TransitionPanelCrossfadeDemo() {
  const [view, setView] = React.useState<View>("overview");

  return (
    <div className="w-full max-w-sm space-y-3">
      <Tabs value={view} onValueChange={(value) => setView(value as View)}>
        <TabsList>
          {VIEWS.map((key) => (
            <TabsTrigger key={key} value={key}>
              {CONTENT[key].title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <TransitionPanel activeKey={view} transition="fade">
          {VIEWS.map((key) => (
            <TransitionPanelView key={key} viewKey={key}>
              <div className="space-y-1.5">
                <h3 className="font-semibold">{CONTENT[key].title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {CONTENT[key].body}
                </p>
              </div>
            </TransitionPanelView>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}
