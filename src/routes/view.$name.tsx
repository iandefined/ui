import { createFileRoute } from "@tanstack/react-router";

import { getRegistryComponent } from "@/shared/lib/registry";
import { cn } from "@/shared/lib/utils";

export const Route = createFileRoute("/view/$name")({
  component: RegistryViewRoute,
});

function RegistryViewRoute() {
  const { name } = Route.useParams();
  const Component = getRegistryComponent(name);

  return (
    <main className="min-h-svh bg-background text-foreground">
      {Component ? (
        <div className="mx-auto flex min-h-svh w-full items-center justify-center p-6">
          <Component />
        </div>
      ) : (
        <div className="flex min-h-svh items-center justify-center p-6">
          <p className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
            Component{" "}
            <code
              className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem]",
                "font-mono text-sm"
              )}
            >
              {name}
            </code>{" "}
            not found in registry.
          </p>
        </div>
      )}
    </main>
  );
}
