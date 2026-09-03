import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsDefaultDemo() {
  return (
    <Tabs defaultValue="docs">
      <TabsList>
        <TabsTrigger value="docs">Docs</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="blocks">Blocks</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
