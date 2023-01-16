import React from "react";
import { usePassword } from "../contexts/use-password";

export function PasswordGenerator() {
  const [password, setPassword] = usePassword();

  return (
    <>
      <div>
        <button onClick={setPassword}>Generate password</button>
      </div>
      <span>{password}</span>
    </>
  );
}
