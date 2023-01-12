import { lazy } from "react";
import { Switch, Route } from "wouter";

const Home = lazy(() => import("./pages/home"));

export function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
