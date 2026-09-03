import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanelsWrapper,
  TabsTrigger,
} from "@/registry/base/tabs";

export default function TabsAutoHeightDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Tabs defaultValue="docs">
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
        <div className="mt-2 rounded-lg bg-card p-4">
          <TabsPanelsWrapper>
            <TabsPanel value="docs">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Docs</h3>
                <p className="text-sm text-muted-foreground">
                  Docs are a great way to learn about the product and how to use
                  it.
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
                <p className="text-sm text-muted-foreground">
                  They provide accessible markup, keyboard navigation, and
                  consistent styling out of the box.
                </p>
                <p className="text-sm text-muted-foreground">
                  Easily customize colors, layout variants, and animation
                  behaviors.
                </p>
              </div>
            </TabsPanel>
            <TabsPanel value="blocks">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Blocks</h3>
                <p className="text-sm text-muted-foreground">
                  Blocks are complex layouts combining multiple components
                  together.
                </p>
                <p className="text-sm text-muted-foreground">
                  Explore sidebar navigations, authentication screens, and
                  complex dashboards.
                </p>
                <p className="text-sm text-muted-foreground">
                  Copy and paste responsive compositions directly into your
                  application.
                </p>
                <p className="text-sm text-muted-foreground">
                  Each block is built with native CSS tokens and project
                  primitives.
                </p>
                <p className="text-sm text-muted-foreground">
                  Save hours of design and prototyping time.
                </p>
              </div>
            </TabsPanel>
          </TabsPanelsWrapper>
        </div>
      </Tabs>
    </div>
  );
}
