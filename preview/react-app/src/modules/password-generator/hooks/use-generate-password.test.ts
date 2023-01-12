import { describe, test, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useGeneratePassword } from "./use-generate-password";

describe("useGeneratePassword", () => {
  test("should generate password", () => {
    const { result } = renderHook(useGeneratePassword);
    expect(result.current[0]).toBe("");

    act(() => result.current[1]());
    const firstPassword = result.current[0];

    expect(firstPassword).toMatch(/[A-Za-z0-9_-]{10}/);

    act(() => result.current[1]());
    const secondPassword = result.current[0];

    expect(secondPassword).not.toBe(firstPassword);
  });
});
