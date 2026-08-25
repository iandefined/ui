import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export const DefaultNotFoundPage = () => (
  <section className="mx-auto flex min-h-[calc(100svh-var(--header-height)-var(--footer-height))] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
    <p className="text-muted-foreground text-sm font-medium">404</p>
    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
      Page not found
    </h1>
    <p className="text-muted-foreground mt-4 max-w-md text-balance">
      The page you are looking for does not exist or has moved.
    </p>
    <Button render={<Link to="/" />} className="mt-8">
      <Home />
      Go home
    </Button>
  </section>
);
