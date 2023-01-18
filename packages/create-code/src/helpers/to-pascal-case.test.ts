import { test, describe, expect } from "vitest";
import { toPascalCase } from "./to-pascal-case";

describe("toPascalCase", () => {
  test("should be able to replace PascalCase", () => {
    expect(toPascalCase("foo-bar")).toBe("FooBar");
    expect(toPascalCase("FooBar")).toBe("FooBar");
    expect(toPascalCase("foo_bar")).toBe("FooBar");
    expect(toPascalCase("foobar")).toBe("Foobar");
    expect(toPascalCase("-foo-bar")).toBe("FooBar");
  });
});
