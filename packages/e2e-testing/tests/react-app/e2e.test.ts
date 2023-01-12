import { test, expect } from "@playwright/test";

test.describe("React app", () => {
  test("Loads page with welcome", async ({ page }) => {
    await page.goto("/");

    expect(await page.waitForSelector("text=Welcome!")).toBeTruthy();
  });
});
