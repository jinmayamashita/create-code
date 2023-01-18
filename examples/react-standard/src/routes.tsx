import { lazy } from "react";
import { Switch, Route } from "wouter";
import { useAuth } from "react-with-authentication";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Toggle = lazy(() => import("./pages/toggle"));
const UpdatePassword = lazy(() => import("./pages/update-password"));
const NotFound = lazy(() => import("./pages/not-found"));

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route>
      <NotFound isAuthenticationRequired />
    </Route>
  </Switch>
);

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path="/toggle">
      <Toggle />
    </Route>
    <Route path="/password">
      <UpdatePassword />
    </Route>
    <Route path="/">
      <Home />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

const Routes = () => {
  const { user } = useAuth();
  return user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};

export default Routes;
