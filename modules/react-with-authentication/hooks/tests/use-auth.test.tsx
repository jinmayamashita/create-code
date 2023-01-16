import React from "react";
import { describe, test, expect } from "vitest";
import { PropsWithChildren } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuth, AuthProvider } from "../use-auth";

describe("useAuth", () => {
  test("should be able to login and logout", async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });
    // initial state
    expect(result.current.user).toBe(null);

    // login
    act(() => result.current.login());
    await waitFor(() =>
      expect(result.current.user).toStrictEqual({ username: "John Doe" })
    );

    // logout
    act(() => result.current.logout());
    expect(result.current.user).toBe(null);
  });
});
