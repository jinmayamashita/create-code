import { useToggle } from "../hooks/use-toggle";

export function ToggleButton() {
  const [state, toggle] = useToggle();

  return <button onClick={toggle}>{`${state}`}</button>;
}
