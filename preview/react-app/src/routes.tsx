import { lazy } from "react";
import { Switch, Route } from "wouter";

const Home = lazy(() => import("./pages/home"));
const Toggle = lazy(() => import("./pages/toggle"));
const Password = lazy(() => import("./pages/password"));

export function Routes() {
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
