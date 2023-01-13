import { describe, test, expect } from "vitest";
import { PropsWithChildren } from "react";
import { act, renderHook } from "@testing-library/react";
import {
  useGeneratePassword,
  GeneratePassWordProvider,
} from "./use-generate-password";

describe("useGeneratePassword", () => {
  test("should generate password", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <GeneratePassWordProvider>{children}</GeneratePassWordProvider>
    );
    const { result } = renderHook(() => useGeneratePassword(), { wrapper });

    expect(result.current[0]).toBe("");

    act(() => result.current[1]());
    const firstPassword = result.current[0];

    expect(firstPassword).toMatch(/[A-Za-z0-9_-]{10}/);

    act(() => result.current[1]());
    const secondPassword = result.current[0];

    expect(secondPassword).not.toBe(firstPassword);
  });
});
