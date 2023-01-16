import { describe, test, expect } from "vitest";
import { PropsWithChildren } from "react";
import { act, renderHook } from "@testing-library/react";
import { usePassword, PassWordProvider } from "../use-password";

describe("usePassword", () => {
  test("should generate password", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <PassWordProvider>{children}</PassWordProvider>
    );
    const { result } = renderHook(() => usePassword(), { wrapper });

    expect(result.current[0]).toBe("");

    // generate password
    act(() => result.current[1]());
    const firstPassword = result.current[0];

    expect(firstPassword).toMatch(/[A-Za-z0-9_-]{10}/);

    act(() => result.current[1]());
    const secondPassword = result.current[0];

    expect(secondPassword).not.toBe(firstPassword);
  });
});
