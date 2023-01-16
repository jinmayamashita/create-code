import { describe, test, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useToggle } from "../use-toggle";

describe("useToggle", () => {
  test("should toggle state", () => {
    const { result } = renderHook(useToggle);
    expect(result.current[0]).toBe(false);

    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });
});
