import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getSnapshot = () =>
  typeof navigator !== "undefined" &&
  navigator.platform.toUpperCase().includes("MAC");
const getServerSnapshot = () => true;

export const useIsMac = () => {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
};
