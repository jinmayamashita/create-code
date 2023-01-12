import { useGeneratePassword } from "../hooks/use-generate-password";

export function PasswordGenerator() {
  const [password, setPassword] = useGeneratePassword();

  return (
    <>
      <div>
        <button onClick={setPassword}>Generate password</button>
      </div>
      <span>{password}</span>
    </>
  );
}
