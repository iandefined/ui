/// <reference types="vite/client" />

declare module "*.css";
declare module "@fontsource-variable/*";

declare module "*.txt?raw" {
  const content: string;
  export default content;
}

interface ImportMeta {
  glob: <T = unknown>(
    pattern: string,
    options?: {
      eager?: boolean;
      import?: string;
      query?: string;
    }
  ) => Record<string, T>;
}
