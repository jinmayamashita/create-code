import { lazy } from "react";
import { Switch, Route, Redirect } from "wouter";
import { useAuth } from "./modules/auth";

const Home = lazy(() => import("./pages/home"));
const Toggle = lazy(() => import("./pages/toggle"));
const Password = lazy(() => import("./pages/password"));
const Login = lazy(() => import("./pages/login"));

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route component={() => <Redirect to="/login" />} />
  </Switch>
);

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path="/toggle" component={Toggle} />
    <Route path="/password" component={Password} />
    <Route path="/" component={Home} />
  </Switch>
);

const Routes = () => {
  const { user } = useAuth();
  return !user ? <UnauthenticatedRoutes /> : <AuthenticatedRoutes />;
};

export default Routes;
