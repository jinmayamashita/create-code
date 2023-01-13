import { FormEvent } from "react";
import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
  const { login } = useAuth();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Login</button>
    </form>
  );
}
