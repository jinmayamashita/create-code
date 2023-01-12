import { nanoid } from "nanoid";
import { useState } from "react";

export function useGeneratePassword() {
  const [password, setPassword] = useState("");
  return [password, () => setPassword(nanoid(10))] as const;
}
