import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type InstallationType = "cli" | "manual";

type Config = {
  installationType: InstallationType;
};

const configAtom = atomWithStorage<Config>("config", {
  installationType: "cli",
});

export const useConfig = () => useAtom(configAtom);
