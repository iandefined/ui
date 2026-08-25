export const formatCode = async (code: string) => {
  return code
    .replace(/@\/registry\/[^/]+\//g, "@/components/ui/")
    .replaceAll("export default", "export")
    .trim();
};
