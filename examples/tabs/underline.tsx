import {
  CircleDotIcon,
  Code2Icon,
  GitPullRequestIcon,
  PlayCircleIcon,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsUnderlineDemo() {
  return (
    <div className="flex flex-col gap-10">
      <Tabs defaultValue="source-code" variant="underline">
        <div className="border-b border-border">
          <TabsList>
            <TabsTrigger value="source-code">
              <Code2Icon />
              Code
            </TabsTrigger>
            <TabsTrigger value="issues">
              <CircleDotIcon />
              Issues
              <span className="rounded-full bg-secondary px-1.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                10
              </span>
            </TabsTrigger>
            <TabsTrigger value="pull-requests">
              <GitPullRequestIcon />
              Pull Requests
            </TabsTrigger>
            <TabsTrigger value="actions">
              <PlayCircleIcon />
              Actions
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
