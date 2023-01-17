import { lazy } from "react";
import { Switch, Route } from "wouter";

const Home = lazy(() => import("./pages/home"));

export default function Routes() {
  return (
    <Switch>
      <Route component={Home} />
    </Switch>
  );
}
