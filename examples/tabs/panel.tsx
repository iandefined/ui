import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/registry/base/tabs";

export default function TabsPanelDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Tabs defaultValue="docs">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
        <div className="mt-2 rounded-lg bg-muted p-4">
          <TabsPanel value="docs">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Docs</h3>
              <p className="text-sm text-muted-foreground">
                Docs are a great way to learn about the product and how to use
                it.
              </p>
              <p className="text-sm text-muted-foreground">
                Follow guides, read API references, and explore live component
                examples.
              </p>
            </div>
          </TabsPanel>
          <TabsPanel value="components">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Components</h3>
              <p className="text-sm text-muted-foreground">
                Components are pre-built, accessible building blocks for your
                applications.
              </p>
            </div>
          </TabsPanel>
          <TabsPanel value="blocks">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Blocks</h3>
              <p className="text-sm text-muted-foreground">
                Ready-made application layouts and dashboard screens to
                accelerate delivery.
              </p>
            </div>
          </TabsPanel>
        </div>
      </Tabs>
    </div>
  );
}
