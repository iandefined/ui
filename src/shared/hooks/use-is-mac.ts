import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getSnapshot = () =>
  typeof navigator !== "undefined" &&
  navigator.platform.toUpperCase().includes("MAC");
const getServerSnapshot = () => true;

export const useIsMac = () =>
  useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
