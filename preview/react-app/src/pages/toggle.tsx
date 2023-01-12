import { useToggle } from "../modules/toggle";

export default function Toggle() {
  const [state, toggle] = useToggle();

  return <button onClick={toggle}>{`${state}`}</button>;
}
