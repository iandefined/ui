const normalize = (path: string) =>
  path.replaceAll("\\", "/").replace(/\/+/g, "/").replace(/\/$/, "");

export const join = (...segments: string[]) => {
  const path = segments.filter(Boolean).join("/");
  return normalize(path);
};

export const posix = {
  join,
};

export default {
  join,
  posix,
};
