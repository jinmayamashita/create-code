import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// FIXME: `getUser` - Temporarily implemented for the testing
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
const getUser = () =>
  sleep(500)
    // TODO: Switching logins programmatically now
    .then(() => ({ username: "John Doe" }));
// .then(() => null);

const AuthContext = createContext<{
  user: { username: string } | null;
  login: () => void;
  logout: () => void;
} | null>(null);

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getUser()
  //     .then((user) => setUser(user))
  //     .then(() => setIsLoading(false));
  // }, []);

  const login = useCallback(() => {
    setIsLoading(true);
    getUser()
      .then((user) => setUser(user))
      .then(() => setIsLoading(false))
      .then(() => history.pushState({}, "", "/"));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    history.pushState({}, "", "/");
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [login, logout, user]);
  if (isLoading) return <>Loading...</>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null)
    throw new Error(`useAuth must be used within a AuthProvider`);

  return context;
}

export { AuthProvider, useAuth };
