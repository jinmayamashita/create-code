import { PropsWithChildren } from "react";
import { AuthProvider } from "./modules/auth";
import { GeneratePassWordProvider } from "./modules/password-generator";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <>
    <AuthProvider>
      <GeneratePassWordProvider>{children}</GeneratePassWordProvider>
    </AuthProvider>
  </>
);
