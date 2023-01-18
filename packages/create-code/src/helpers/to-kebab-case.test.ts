import { test, describe, expect } from "vitest";
import { toKebabCase } from "./to-kebab-case";

describe("toKebabCase", () => {
  test("should be able to replace kebab-case", () => {
    expect(toKebabCase("foo-bar")).toBe("foo-bar");
    expect(toKebabCase("FooBar")).toBe("foo-bar");
    expect(toKebabCase("foo_bar")).toBe("foo-bar");
    expect(toKebabCase("foobar")).toBe("foobar");
    expect(toKebabCase("-foo-bar")).toBe("-foo-bar");
  });
});
