import { createContext, useContext, type ReactNode } from "react";

const MdxPreviewContext = createContext(false);

export const useMdxPreview = () => useContext(MdxPreviewContext);

export function MdxPreviewProvider({ children }: { children: ReactNode }) {
  return (
    <MdxPreviewContext.Provider value>{children}</MdxPreviewContext.Provider>
  );
}
