import type { ErrorRouteComponent } from "@tanstack/react-router";
import { createRouter, useLocation } from "@tanstack/react-router";

import { AppLayout } from "@/app-layout";
import { DefaultNotFoundPage } from "@/shared/components/pages/default-not-found-page";
import { ROUTES } from "@/shared/constants/routes";

import { routeTree } from "./routeTree.gen";

const DefaultNotFoundBoundary = () => {
  const pathname = useLocation({ select: (location) => location.pathname });
  const isDocsPage =
    pathname === ROUTES.DOCS || pathname.startsWith(`${ROUTES.DOCS}/`);
  const page = <DefaultNotFoundPage />;

  return isDocsPage ? page : <AppLayout>{page}</AppLayout>;
};

export const getRouter = () =>
  createRouter({
    defaultErrorComponent: (({ error }) => {
      throw error;
    }) satisfies ErrorRouteComponent,
    defaultNotFoundComponent: DefaultNotFoundBoundary,
    defaultPreload: "intent",
    defaultStructuralSharing: true,
    routeTree,
    scrollRestoration: true,
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
