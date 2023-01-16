import { describe, test, expect } from "vitest";
import { act, render } from "@testing-library/react";
import { ToggleButton } from "../toggle-button";

describe("ToggleButton", () => {
  test("should toggle state", () => {
    const { getByRole } = render(<ToggleButton />);
    const button = getByRole("button");

    expect(button.textContent).toBe("false");

    act(() => button.click());
    expect(button.textContent).toBe("true");
  });
});
