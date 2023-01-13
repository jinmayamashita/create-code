import { PropsWithChildren } from "react";
import { AuthProvider } from "./modules/auth";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <>{children}</>
    </AuthProvider>
  );
}
