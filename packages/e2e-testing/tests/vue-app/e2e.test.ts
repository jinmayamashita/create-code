import { test, expect } from "@playwright/test";

test.describe("Vue.js app", () => {
  test("Loads page with welcome", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("button");

    expect(await button.textContent()).toBe("Count is: 0");

    await button.click();
    expect(await button.textContent()).toBe("Count is: 1");
  });
});
