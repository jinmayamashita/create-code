import { PropsWithChildren } from "react";
import { GeneratePassWordProvider } from "./modules/password-generator";

export function AppProviders({ children }: PropsWithChildren) {
  return <GeneratePassWordProvider>{children}</GeneratePassWordProvider>;
}
