import { useToggle } from "../hooks/use-toggle";
import React from "react";

export function ToggleButton() {
  const [state, toggle] = useToggle();

  return <button onClick={toggle}>{`${state}`}</button>;
}
