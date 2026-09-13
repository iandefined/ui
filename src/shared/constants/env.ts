import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const ENV_APP_ISOMORPHIC = createEnv({
  client: {
    VITE_UMAMI_SCRIPT_URL: z.url().optional(),
    VITE_UMAMI_WEBSITE_ID: z.string().min(1).optional(),
  },
  clientPrefix: "VITE_",
  emptyStringAsUndefined: true,
  runtimeEnv: import.meta.env ?? process.env,
});
