import { PropsWithChildren } from "react";
import { GeneratePassWordProvider } from "./modules/password-generator";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <>
    <GeneratePassWordProvider>{children}</GeneratePassWordProvider>
  </>
);
