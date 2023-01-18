import { PropsWithChildren } from "react";
import { AuthProvider } from "react-with-authentication";
import { PassWordProvider } from "react-with-context";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <>
    <AuthProvider>
      <PassWordProvider>{children}</PassWordProvider>
    </AuthProvider>
  </>
);
