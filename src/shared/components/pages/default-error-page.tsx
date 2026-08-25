import { Link } from "@tanstack/react-router";
import { Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { AppLayout } from "@/app-layout";
import { Button } from "@/shared/components/ui/button";

const loggedErrorKeys = new Set<string>();

export const DefaultErrorPage = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  useEffect(() => {
    const errorKey = `${error.name}:${error.message}:${error.stack ?? ""}`;

    if (loggedErrorKeys.has(errorKey)) {
      return;
    }

    loggedErrorKeys.add(errorKey);
    console.error(error);
  }, [error]);

  return (
    <AppLayout>
      <section className="mx-auto flex min-h-[calc(100svh-var(--header-height)-var(--footer-height))] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-muted-foreground text-sm font-medium">500</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-balance">
          The app hit an unexpected error. You can retry the route or return
          home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button render={<Link to="/" />}>
            <Home />
            Go home
          </Button>
          <Button variant="outline" onClick={reset}>
            <RefreshCw />
            Try again
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};
