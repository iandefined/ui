export const formatCode = async (code: string) =>
  code
    .replace(/@\/registry\/[^/]+\//g, "@/components/ui/")
    .replaceAll("export default", "export")
    .trim();
