import {
  Dispatch,
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
  useContext,
} from "react";
import { nanoid } from "nanoid";

type Context = Readonly<[string, () => void]>;
export const GeneratePasswordContext = createContext<Context>(["", () => {}]);

export function GeneratePassWordProvider({ children }: PropsWithChildren) {
  const [password, setPassword] = useState("");
  const generateRandomPassword = () => setPassword(nanoid(10));

  const value = useMemo(
    () => [password, generateRandomPassword] as const,
    [password]
  );

  return (
    <GeneratePasswordContext.Provider value={value}>
      {children}
    </GeneratePasswordContext.Provider>
  );
}

export function useGeneratePassword() {
  return useContext(GeneratePasswordContext);
}
