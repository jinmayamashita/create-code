import { lazy } from "react";
import { Switch, Route, Redirect } from "wouter";
import { useAuth } from "./modules/auth";

const Home = lazy(() => import("./pages/home"));
const Toggle = lazy(() => import("./pages/toggle"));
const Password = lazy(() => import("./pages/password"));
const Login = lazy(() => import("./pages/login"));

function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route component={() => <Redirect to="/login" />} />
    </Switch>
  );
}

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/toggle">
        <Toggle />
      </Route>
      <Route path="/password">
        <Password />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export function Routes() {
  const { user } = useAuth();
  return !user ? <UnauthenticatedRoutes /> : <AuthenticatedRoutes />;
}
