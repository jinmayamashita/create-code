import {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
  useContext,
} from "react";
import { nanoid } from "nanoid";

type Context = Readonly<[string, () => void]>;
export const PasswordContext = createContext<Context>(["", () => {}]);

export function PassWordProvider({ children }: PropsWithChildren) {
  const [password, setPassword] = useState("");
  const generate = () => setPassword(nanoid(10));

  const value = useMemo(() => [password, generate] as const, [password]);

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  );
}

export function usePassword() {
  return useContext(PasswordContext);
}
