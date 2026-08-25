import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "@/shared/constants/site";
import { createPageHead } from "@/shared/lib/seo/metadata";

import { HomePage } from "./-home-page";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    createPageHead({
      description: SITE.DESCRIPTION.LONG,
      path: "/",
      title: SITE.NAME,
    }),
});
