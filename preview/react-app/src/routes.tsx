import { lazy } from "react";
import { Switch, Route } from "wouter";

const Home = lazy(() => import("./pages/home"));
const Toggle = lazy(() => import("./pages/toggle"));
const Password = lazy(() => import("./pages/password"));

export const Routes = () => (
  <Switch>
    <Route path="/toggle" component={Toggle} />
    <Route path="/password" component={Password} />
    <Route path="/" component={Home} />
  </Switch>
);
